import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
const inventory = Object.entries(lock.packages).filter(([path]) => path).map(([path, pkg]) => ({
  path, version: pkg.version, license: pkg.license ?? 'UNKNOWN', developmentOnly: !!pkg.dev,
})).sort((a, b) => a.path.localeCompare(b.path, 'en'));
const notices = ['Cozy Garden Simulator — third-party runtime notices', '',
  'Original application code: MIT; see LICENSE. Dependencies retain their own terms.',
  'Generated from package-lock.json and installed package license files.', ''];
for (const pkg of inventory.filter(pkg => !pkg.developmentOnly)) {
  const licenseFiles = readdirSync(pkg.path).filter(name => /^licen[cs]e(?:\..*)?$/i.test(name)).sort();
  if (!licenseFiles.length || pkg.license === 'UNKNOWN') throw Error(`Missing license evidence for ${pkg.path}`);
  notices.push(`## ${pkg.path.replace(/^node_modules\//, '')}@${pkg.version} (${pkg.license})`, '');
  for (const name of licenseFiles) notices.push(readFileSync(join(pkg.path, name), 'utf8').trim(), '');
}
const outputs = {
  'docs/DEPENDENCY_LICENSES.json': JSON.stringify(inventory, null, 2) + '\n',
  'THIRD_PARTY_NOTICES.txt': notices.join('\n').trimEnd() + '\n',
};
for (const [path, content] of Object.entries(outputs)) {
  if (process.argv.includes('--check')) {
    if (readFileSync(path, 'utf8') !== content) throw Error(`${path} is stale; run npm run audit:licenses`);
  } else writeFileSync(path, content);
}
console.log(`${inventory.length} locked dependency records; ${inventory.filter(p => !p.developmentOnly).length} runtime notices verified.`);
