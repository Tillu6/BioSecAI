// backend/src/policyEngine.js
const { readFileSync } = require('fs');
const { newEngine } = require('@open-policy-agent/opa-wasm');

async function evaluatePolicy(input) {
  // Ensure you've compiled your Rego into `policy.wasm` at project root
  const policyWasm = readFileSync('policy.wasm');
  const engine = await newEngine(policyWasm);
  const result = await engine.evaluate({ input });
  return result[0].expressions[0].value;
}

module.exports = { evaluatePolicy };
