#!/usr/bin/env node
// scripts/export-catalog-csv.js
//
// Exports the full album catalog (js/data.js) to a CSV file, one row per
// album, with columns: id, name, band, genre, releaseDate, price,
// imageUrl, description. The description is auto-generated, e.g.:
//   "Mantras album was released on November 6th 2025 by metalcore band ASAVA."
//
// Usage:
//   node scripts/export-catalog-csv.js
//   node scripts/export-catalog-csv.js --out ./my-catalog.csv
//   node scripts/export-catalog-csv.js --base-url https://example.com/site/
//
// Flags:
//   --out       Output file path (default: catalog.csv in the repo root)
//   --base-url  Base URL to prepend to each album's cover path for the
//               imageUrl column (default: the site's live GitHub Pages URL)
//   --help      Show this help and exit

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_JS = path.join(ROOT, 'js', 'data.js');
const DEFAULT_BASE_URL = 'https://fmenmish.github.io/black-vinyl-site/';
const DEFAULT_OUT = path.join(ROOT, 'catalog.csv');

function printHelp() {
  console.log(`Export the album catalog to CSV.

Usage:
  node scripts/export-catalog-csv.js
  node scripts/export-catalog-csv.js --out ./my-catalog.csv
  node scripts/export-catalog-csv.js --base-url https://example.com/site/

Flags:
  --out       Output file path (default: ${DEFAULT_OUT})
  --base-url  Base URL prepended to each cover path for the imageUrl column
              (default: ${DEFAULT_BASE_URL})
  --help      Show this help and exit
`);
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    let a = argv[i];
    if (!a.startsWith('--')) continue;
    a = a.slice(2);
    const next = argv[i + 1];
    if (next !== undefined && !next.startsWith('--')) { out[a] = next; i++; } else { out[a] = true; }
  }
  return out;
}

const CATEGORY_LABELS = { metal: 'Metal', metalcore: 'Metalcore', punk: 'Punk', rock: 'Rock' };

const ORDINALS = (n) => {
  const rem100 = n % 100;
  if (rem100 >= 11 && rem100 <= 13) return n + 'th';
  switch (n % 10) {
    case 1: return n + 'st';
    case 2: return n + 'nd';
    case 3: return n + 'rd';
    default: return n + 'th';
  }
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

function formatLongDate(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number);
  return `${MONTHS[m - 1]} ${ORDINALS(d)} ${y}`;
}

function buildDescription(album) {
  const genreLower = (CATEGORY_LABELS[album.category] || album.category).toLowerCase();
  return `${album.name} album was released on ${formatLongDate(album.releaseDate)} by ${genreLower} band ${album.band}.`;
}

// Minimal RFC 4180-ish CSV field escaping: quote any field containing a
// comma, quote, or newline, doubling embedded quotes.
function csvField(value) {
  const str = String(value == null ? '' : value);
  if (/[",\n\r]/.test(str)) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function loadAlbums() {
  const src = fs.readFileSync(DATA_JS, 'utf8');
  const m = src.match(/const ALBUMS = (\[[\s\S]*?\n\]);/);
  if (!m) throw new Error('Could not find the ALBUMS array in ' + DATA_JS);
  return eval(m[1]); // eslint-disable-line no-eval -- trusted local file, plain JSON-shaped data
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) { printHelp(); return; }

  const baseUrl = (args['base-url'] || DEFAULT_BASE_URL).replace(/\/?$/, '/');
  const outPath = path.resolve(process.cwd(), args.out || DEFAULT_OUT);

  const albums = loadAlbums();

  const columns = ['id', 'name', 'band', 'genre', 'releaseDate', 'price', 'imageUrl', 'description'];
  const rows = albums.map(a => [
    a.id,
    a.name,
    a.band,
    CATEGORY_LABELS[a.category] || a.category,
    a.releaseDate,
    a.price,
    baseUrl + a.cover,
    buildDescription(a)
  ]);

  const lines = [columns.join(',')];
  rows.forEach(row => lines.push(row.map(csvField).join(',')));
  const csv = lines.join('\r\n') + '\r\n';

  fs.writeFileSync(outPath, csv, 'utf8');
  console.log(`Wrote ${albums.length} albums to ${outPath}`);
}

main();
