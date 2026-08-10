import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'API_CONTRACTS.md',
  'EVENT_CONTRACTS.md',
  'schemas/api/openapi.yaml',
  'schemas/api/api-coverage-manifest.json',
  'schemas/events/event-registry.json',
  'schemas/events/event-coverage-manifest.json',
  'schemas/events/envelope.schema.json',
  'schemas/database/migration-manifest.json'
];

function fail(message) {
  console.error(`READINESS ERROR: ${message}`);
  process.exit(1);
}

const missing = required.filter(file => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  fail(`missing required specification artifacts\n${missing.map(file => `- ${file}`).join('\n')}`);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
  } catch (error) {
    fail(`invalid JSON ${file}: ${error.message}`);
  }
}

function assertUnique(values, label) {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
  if (duplicates.length) fail(`${label} contains duplicates: ${[...new Set(duplicates)].join(', ')}`);
}

const api = readJson('schemas/api/api-coverage-manifest.json');
const events = readJson('schemas/events/event-coverage-manifest.json');
const registry = readJson('schemas/events/event-registry.json');

if (!Array.isArray(api.operations) || api.operations.length === 0) fail('API coverage manifest is empty');
if (!Array.isArray(events.events) || events.events.length !== 26) fail(`expected 26 authoritative events, found ${events.events?.length ?? 0}`);
if (registry.version !== 1 || !Array.isArray(registry.events)) fail('event registry must be version 1 data with an events array');
if (registry.events.length !== events.events.length) fail(`event registry/coverage count mismatch: ${registry.events.length} vs ${events.events.length}`);

const manifestKeys = events.events.map(event => `${event.event_type}@${event.version}`);
const registryKeys = registry.events.map(event => `${event.event_type}@${event.version}`);
assertUnique(manifestKeys, 'event coverage manifest');
assertUnique(registryKeys, 'event registry');

const manifestSet = new Set(manifestKeys);
for (const event of registry.events) {
  const key = `${event.event_type}@${event.version}`;
  if (!manifestSet.has(key)) fail(`event registry entry missing from coverage manifest: ${key}`);
  if (!event.schema || !event.fixture || !event.owner || !event.producer) fail(`incomplete registry entry: ${key}`);
  if (!fs.existsSync(path.join(root, event.schema))) fail(`missing event schema referenced by registry: ${event.schema}`);
  if (!fs.existsSync(path.join(root, event.fixture))) fail(`missing event fixture referenced by registry: ${event.fixture}`);
}

for (const key of manifestSet) {
  if (!registryKeys.includes(key)) fail(`coverage manifest entry missing from event registry: ${key}`);
}

console.log(`Specification readiness baseline passed: ${api.operations.length} API operations and ${events.events.length} events indexed.`);
console.log('All registry references resolve to files. Runtime implementation gates remain intentionally blocked until executable services and tests exist.');
