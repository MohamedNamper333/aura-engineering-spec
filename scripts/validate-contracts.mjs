import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readJson(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) fail(`Missing JSON contract: ${relativePath}`);
  try {
    return JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
  } catch (error) {
    fail(`Invalid JSON: ${relativePath}: ${error.message}`);
  }
}

function fail(message) {
  console.error(`CONTRACT ERROR: ${message}`);
  process.exitCode = 1;
}

function assert(condition, message) {
  if (!condition) fail(message);
}

const manifest = readJson('schemas/api/api-coverage-manifest.json');
const registry = readJson('schemas/events/event-registry.json');

assert(manifest.version === 1, 'Unsupported API coverage manifest version');
assert(registry.version === 1, 'Unsupported event registry version');

const openApiPath = path.join(root, 'schemas/api/openapi.yaml');
assert(fs.existsSync(openApiPath), 'Missing OpenAPI contract');
const openApi = fs.readFileSync(openApiPath, 'utf8');

for (const operation of manifest.operations) {
  const method = operation.method.toLowerCase();
  const openApiPathKey = operation.path.replace(/^\/api\/v1/, '') || '/';
  const escapedPath = openApiPathKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pathBlock = new RegExp(`^\\s{2}${escapedPath}:\\s*$`, 'm');
  assert(pathBlock.test(openApi), `API path missing from OpenAPI: ${operation.method} ${operation.path}`);

  const pathIndex = openApi.search(pathBlock);
  const nextPath = openApi.slice(pathIndex + 1).search(/^  \/\S.*:$/m);
  const block = openApi.slice(pathIndex, nextPath >= 0 ? pathIndex + 1 + nextPath : undefined);
  assert(new RegExp(`^\\s{4}${method}:\\s*$`, 'm').test(block), `API method missing from OpenAPI: ${operation.method} ${operation.path}`);
  assert(block.includes(`operationId: ${operation.operation_id}`), `operationId mismatch/missing: ${operation.operation_id}`);
}

for (const event of registry.events) {
  const schemaPath = event.schema;
  assert(fs.existsSync(path.join(root, schemaPath)), `Event schema missing: ${schemaPath}`);

  const schema = readJson(schemaPath);
  assert(schema.properties?.event_type?.const === event.event_type, `Event type mismatch: ${event.event_type}`);
  assert(schema.properties?.event_version?.const === event.version, `Event version mismatch: ${event.event_type}`);
  assert(schema.properties?.aggregate_type, `Missing aggregate_type in schema: ${event.event_type}`);
  assert(event.delivery === 'at-least-once', `Unsupported delivery semantics: ${event.event_type}`);
}

const fixtureRoot = path.join(root, 'schemas/events/fixtures');
assert(fs.existsSync(fixtureRoot), 'Missing event fixture directory');

const fixtureFiles = fs.readdirSync(fixtureRoot).filter(file => file.endsWith('.json'));
assert(fixtureFiles.length > 0, 'No event fixtures found');

console.log(`Contract validation passed: ${manifest.operations.length} API operations, ${registry.events.length} registered events, ${fixtureFiles.length} fixtures.`);
