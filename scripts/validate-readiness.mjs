import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function fail(message) {
  console.error(`READINESS ERROR: ${message}`);
  process.exit(1);
}

function filePath(file) {
  return path.join(root, file);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(filePath(file), 'utf8'));
  } catch (error) {
    fail(`invalid JSON ${file}: ${error.message}`);
  }
}

function assertUnique(values, label) {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
  if (duplicates.length) fail(`${label} contains duplicates: ${[...new Set(duplicates)].join(', ')}`);
}

const required = [
  'API_CONTRACTS.md',
  'EVENT_CONTRACTS.md',
  'schemas/api/openapi.yaml',
  'schemas/api/api-coverage-manifest.json',
  'schemas/events/event-registry.json',
  'schemas/events/event-coverage-manifest.json',
  'schemas/events/envelope.schema.json',
  'schemas/events/event-catalog.schema.json',
  'schemas/events/event-payload-rules.json',
  'schemas/events/fixtures/event-fixtures.json',
  'schemas/database/migration-manifest.json'
];

const missing = required.filter(file => !fs.existsSync(filePath(file)));
if (missing.length) fail(`missing required specification artifacts\n${missing.map(file => `- ${file}`).join('\n')}`);

const api = readJson('schemas/api/api-coverage-manifest.json');
const events = readJson('schemas/events/event-coverage-manifest.json');
const registry = readJson('schemas/events/event-registry.json');
const rules = readJson('schemas/events/event-payload-rules.json');
const fixtures = readJson('schemas/events/fixtures/event-fixtures.json');
const migrations = readJson('schemas/database/migration-manifest.json');

if (!Array.isArray(api.operations) || api.operations.length === 0) fail('API coverage manifest is empty');
if (!Array.isArray(events.events) || events.events.length !== 26) fail(`expected 26 authoritative events, found ${events.events?.length ?? 0}`);
if (registry.version !== 1 || !Array.isArray(registry.events)) fail('event registry must be version 1 data with an events array');
if (registry.events.length !== events.events.length) fail(`event registry/coverage count mismatch: ${registry.events.length} vs ${events.events.length}`);
if (rules.version !== 1 || typeof rules.events !== 'object') fail('event payload rules are invalid');
if (fixtures.version !== 1 || !Array.isArray(fixtures.fixtures)) fail('event fixture catalog is invalid');
if (fixtures.fixtures.length !== events.events.length) fail(`event fixture count mismatch: ${fixtures.fixtures.length} vs ${events.events.length}`);
if (migrations.version !== 1 || migrations.engine !== 'postgresql' || !Array.isArray(migrations.migrations)) fail('database migration manifest is invalid');

const manifestKeys = events.events.map(event => `${event.event_type}@${event.version}`);
const registryKeys = registry.events.map(event => `${event.event_type}@${event.version}`);
const fixtureKeys = fixtures.fixtures.map(event => `${event.event_type}@${event.event_version}`);
assertUnique(manifestKeys, 'event coverage manifest');
assertUnique(registryKeys, 'event registry');
assertUnique(fixtureKeys, 'event fixture catalog');

const manifestSet = new Set(manifestKeys);
for (const event of registry.events) {
  const key = `${event.event_type}@${event.version}`;
  if (!manifestSet.has(key)) fail(`event registry entry missing from coverage manifest: ${key}`);
  if (!event.schema || !event.fixture || !event.owner || !event.producer) fail(`incomplete registry entry: ${key}`);
  if (!fs.existsSync(filePath(event.schema))) fail(`missing event schema referenced by registry: ${event.schema}`);
  if (!fs.existsSync(filePath(event.fixture))) fail(`missing event fixture referenced by registry: ${event.fixture}`);
  if (!rules.events[event.event_type]) fail(`missing payload rules: ${event.event_type}`);
}

for (const key of manifestSet) {
  if (!registryKeys.includes(key)) fail(`coverage manifest entry missing from event registry: ${key}`);
  if (!fixtureKeys.includes(key)) fail(`coverage manifest entry missing from fixture catalog: ${key}`);
}

for (const fixture of fixtures.fixtures) {
  const requiredPayload = rules.events[fixture.event_type]?.required ?? [];
  if (fixture.event_version !== 1) fail(`unsupported fixture version: ${fixture.event_type}`);
  for (const field of requiredPayload) {
    if (!(field in (fixture.payload ?? {}))) fail(`fixture ${fixture.event_type} is missing required payload field: ${field}`);
  }
}

const migrationIds = migrations.migrations.map(migration => migration.id);
assertUnique(migrationIds, 'migration manifest');
for (const migration of migrations.migrations) {
  if (!fs.existsSync(filePath(migration.path))) fail(`missing migration referenced by manifest: ${migration.path}`);
}

console.log(`Programming readiness passed: ${api.operations.length} API operations, ${events.events.length} events, ${migrations.migrations.length} migrations.`);
console.log('No runtime implementation claim is made by this gate.');
