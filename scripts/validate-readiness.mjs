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

const missing = required.filter(file => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('READINESS ERROR: missing required specification artifacts');
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
  } catch (error) {
    console.error(`READINESS ERROR: invalid JSON ${file}: ${error.message}`);
    process.exit(1);
  }
}

const api = readJson('schemas/api/api-coverage-manifest.json');
const events = readJson('schemas/events/event-coverage-manifest.json');
const registry = readJson('schemas/events/event-registry.json');

if (!Array.isArray(api.operations) || api.operations.length === 0) {
  console.error('READINESS ERROR: API coverage manifest is empty');
  process.exit(1);
}

if (events.events.length !== 26) {
  console.error(`READINESS ERROR: expected 26 authoritative events, found ${events.events.length}`);
  process.exit(1);
}

if (registry.version !== 1) {
  console.error('READINESS ERROR: unsupported event registry version');
  process.exit(1);
}

console.log(`Specification readiness baseline passed: ${api.operations.length} API operations and ${events.events.length} events indexed.`);
console.log('Runtime implementation gates remain intentionally blocked until executable services and tests exist.');
