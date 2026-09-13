#!/usr/bin/env node
// scripts/add-album.js
//
// Maintenance CLI for adding a new album to the BlackVinyl catalog: it slugifies
// the album name into a cover-image filename, copies the cover into
// assets/images/, appends the album to js/data.js, then commits (and by
// default pushes) the change to the repo.
//
// Usage:
//   node scripts/add-album.js
//     (prompts for every field interactively)
//
//   node scripts/add-album.js --name "Album Name" --band "Band Name" \
//     --release 2024-05-01 --category metal --price 19.99 --cover ./cover.jpg
//     (non-interactive; prompts only for anything missing/invalid)
//
// Flags:
//   --name         Album name
//   --band         Band name
//   --release      Release date, YYYY-MM-DD
//   --category     One of: metal, metalcore, punk, rock
//   --price        Price, e.g. 19.99
//   --cover        Path to a local cover image file (.jpg/.jpeg/.png/.webp/.gif)
//   --id           Override the auto-generated album id
//   --slug         Override the auto-generated image filename (without extension)
//   --force        Overwrite an existing cover file with the same generated name,
//                  and skip the duplicate-album (same name+band) warning
//   --yes          Skip the confirmation prompt
//   --dry-run      Show what would happen; don't touch any files or git
//   --no-commit    Write the files but don't run git add/commit
//   --no-push      Commit locally but don't git push
//   --help         Show this help and exit

'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const DATA_JS = path.join(ROOT, 'js', 'data.js');
const IMAGES_DIR = path.join(ROOT, 'assets', 'images');
const CATEGORIES = ['metal', 'metalcore', 'punk', 'rock'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

function printHelp() {
  console.log(`Add a new album to the BlackVinyl catalog.

Usage:
  node scripts/add-album.js
  node scripts/add-album.js --name "Album Name" --band "Band Name" \\
    --release 2024-05-01 --category metal --price 19.99 --cover ./cover.jpg

Flags:
  --name         Album name
  --band         Band name
  --release      Release date, YYYY-MM-DD
  --category     One of: ${CATEGORIES.join(', ')}
  --price        Price, e.g. 19.99
  --cover        Path to a local cover image file (${ALLOWED_EXTENSIONS.join(', ')})
  --id           Override the auto-generated album id
  --slug         Override the auto-generated image filename (without extension)
  --force        Overwrite a same-named cover file / skip the duplicate-album warning
  --yes          Skip the confirmation prompt
  --dry-run      Show what would happen; don't touch any files or git
  --no-commit    Write the files but don't run git add/commit
  --no-push      Commit locally but don't git push
  --help         Show this help and exit
`);
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    let a = argv[i];
    if (!a.startsWith('--')) continue;
    a = a.slice(2);
    if (a.startsWith('no-')) {
      out[a.slice(3)] = false;
      continue;
    }
    if (a.includes('=')) {
      const eq = a.indexOf('=');
      out[a.slice(0, eq)] = a.slice(eq + 1);
      continue;
    }
    const next = argv[i + 1];
    if (next !== undefined && !next.startsWith('--')) {
      out[a] = next;
      i++;
    } else {
      out[a] = true;
    }
  }
  return out;
}

// Turns an album name into the underscore_lowercase style used by every
// existing cover filename in assets/images/.
function slugify(name) {
  return String(name)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip accents (e.g. e-acute -> e)
    .toLowerCase()
    .replace(/[''’]/g, '') // drop apostrophes rather than turning them into _
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .replace(/_+/g, '_');
}

function fail(message) {
  console.error('\nError: ' + message);
  process.exit(1);
}

function readDataJs() {
  return fs.readFileSync(DATA_JS, 'utf8');
}

// Pulls the live ALBUMS array out of data.js without needing a require() of a
// non-module script.
function loadAlbums(src) {
  const m = src.match(/const ALBUMS = (\[[\s\S]*?\n\]);/);
  if (!m) fail('Could not find the ALBUMS array in ' + DATA_JS);
  return eval(m[1]); // eslint-disable-line no-eval -- trusted local file, plain JSON-shaped data
}

function nextId(albums) {
  const max = albums.reduce((m, a) => Math.max(m, parseInt(a.id, 10) || 0), 0);
  return String(max + 1);
}

function isValidDate(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(s + 'T00:00:00');
  return !isNaN(d.getTime());
}

async function prompt(rl, question, opts) {
  opts = opts || {};
  for (;;) {
    const answer = (await rl.question(question)).trim();
    if (!answer && opts.default !== undefined) return opts.default;
    if (!answer) {
      console.log('  This field is required.');
      continue;
    }
    if (opts.validate && !opts.validate(answer)) {
      console.log('  ' + (opts.invalidMessage || 'Invalid value, try again.'));
      continue;
    }
    return answer;
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const src = readDataJs();
  const albums = loadAlbums(src);

  const useReadline = args.name === undefined || args.band === undefined ||
    args.release === undefined || args.category === undefined ||
    args.price === undefined || args.cover === undefined;

  let rl = null;
  if (useReadline) {
    rl = require('readline/promises').createInterface({ input: process.stdin, output: process.stdout });
  }

  try {
    const name = args.name !== undefined
      ? String(args.name)
      : await prompt(rl, 'Album name: ');

    const band = args.band !== undefined
      ? String(args.band)
      : await prompt(rl, 'Band name: ');

    let releaseDate = args.release !== undefined ? String(args.release) : null;
    if (releaseDate !== null && !isValidDate(releaseDate)) {
      fail(`--release "${releaseDate}" is not a valid YYYY-MM-DD date.`);
    }
    if (releaseDate === null) {
      releaseDate = await prompt(rl, 'Release date (YYYY-MM-DD): ', {
        validate: isValidDate,
        invalidMessage: 'Please use YYYY-MM-DD, e.g. 2024-05-01.'
      });
    }

    let category = args.category !== undefined ? String(args.category).toLowerCase() : null;
    if (category !== null && !CATEGORIES.includes(category)) {
      fail(`--category "${category}" must be one of: ${CATEGORIES.join(', ')}`);
    }
    if (category === null) {
      category = (await prompt(rl, `Genre (${CATEGORIES.join('/')}): `, {
        validate: (v) => CATEGORIES.includes(v.toLowerCase()),
        invalidMessage: `Must be one of: ${CATEGORIES.join(', ')}`
      })).toLowerCase();
    }

    let priceRaw = args.price !== undefined ? String(args.price) : null;
    if (priceRaw !== null && (isNaN(Number(priceRaw)) || Number(priceRaw) <= 0)) {
      fail(`--price "${priceRaw}" must be a positive number.`);
    }
    if (priceRaw === null) {
      priceRaw = await prompt(rl, 'Price (e.g. 19.99): ', {
        validate: (v) => !isNaN(Number(v)) && Number(v) > 0,
        invalidMessage: 'Must be a positive number.'
      });
    }
    const price = Number(priceRaw).toFixed(2);

    let coverPath = args.cover !== undefined ? String(args.cover) : null;
    if (coverPath !== null) {
      coverPath = path.resolve(process.cwd(), coverPath);
      if (!fs.existsSync(coverPath) || !fs.statSync(coverPath).isFile()) {
        fail(`--cover "${coverPath}" does not exist.`);
      }
      if (!ALLOWED_EXTENSIONS.includes(path.extname(coverPath).toLowerCase())) {
        fail(`Cover file must be one of: ${ALLOWED_EXTENSIONS.join(', ')}`);
      }
    }
    if (coverPath === null) {
      coverPath = await prompt(rl, 'Path to local cover image file: ', {
        validate: (v) => {
          const p = path.resolve(process.cwd(), v);
          return fs.existsSync(p) && fs.statSync(p).isFile() &&
            ALLOWED_EXTENSIONS.includes(path.extname(p).toLowerCase());
        },
        invalidMessage: `File must exist and be one of: ${ALLOWED_EXTENSIONS.join(', ')}`
      });
      coverPath = path.resolve(process.cwd(), coverPath);
    }

    if (rl) rl.close();

    // Duplicate check
    const dup = albums.find(a =>
      a.name.toLowerCase() === name.toLowerCase() && a.band.toLowerCase() === band.toLowerCase());
    if (dup && !args.force) {
      fail(`"${name}" by ${band} already exists (id ${dup.id}). Pass --force to add it anyway.`);
    }

    // Slug / filename
    const slugBase = args.slug ? String(args.slug) : slugify(name);
    if (!slugBase) fail('Could not generate a filename from that album name; pass --slug explicitly.');
    const ext = path.extname(coverPath).toLowerCase();
    let filename = slugBase + ext;
    let destPath = path.join(IMAGES_DIR, filename);
    if (fs.existsSync(destPath) && !args.force) {
      let n = 2;
      while (fs.existsSync(path.join(IMAGES_DIR, `${slugBase}_${n}${ext}`))) n++;
      filename = `${slugBase}_${n}${ext}`;
      destPath = path.join(IMAGES_DIR, filename);
      console.log(`Note: assets/images/${slugBase}${ext} already exists, using "${filename}" instead ` +
        '(pass --force to overwrite the existing file instead).');
    }

    const id = args.id ? String(args.id) : nextId(albums);
    const coverRelPath = 'assets/images/' + filename;

    const newAlbum = { id, name, band, releaseDate, category, cover: coverRelPath, price };

    console.log('\nAbout to add:');
    console.log(JSON.stringify(newAlbum, null, 2));

    if (args['dry-run']) {
      console.log('\n(dry run — no files changed, nothing committed)');
      return;
    }

    if (!args.yes) {
      const confirmRl = require('readline/promises').createInterface({ input: process.stdin, output: process.stdout });
      const answer = (await confirmRl.question('\nProceed? (y/N) ')).trim().toLowerCase();
      confirmRl.close();
      if (answer !== 'y' && answer !== 'yes') {
        console.log('Aborted, nothing changed.');
        return;
      }
    }

    // --- write data.js (validate a temp copy first so we never leave a broken file on disk) ---
    const marker = '\n];\n\nconst CATEGORIES';
    const idx = src.indexOf(marker);
    if (idx === -1) fail('Could not find the end of the ALBUMS array in data.js — has its format changed?');

    const objText = JSON.stringify(newAlbum, null, 2).split('\n').map(l => '  ' + l).join('\n');
    const newSrc = src.slice(0, idx) + ',\n' + objText + src.slice(idx);

    const tmpFile = path.join(path.dirname(DATA_JS), 'data.tmp-check.js');
    fs.writeFileSync(tmpFile, newSrc, 'utf8');
    try {
      execFileSync(process.execPath, ['--check', tmpFile], { stdio: 'pipe' });
    } catch (e) {
      fs.unlinkSync(tmpFile);
      fail('Generated data.js failed a syntax check — aborting without changing anything:\n' + e.stderr);
    }
    fs.renameSync(tmpFile, DATA_JS);

    fs.copyFileSync(coverPath, destPath);

    console.log(`\nWrote js/data.js and assets/images/${filename}.`);

    if (args.commit === false) {
      console.log('--no-commit passed, leaving changes unstaged.');
      return;
    }

    const relCover = path.relative(ROOT, destPath).split(path.sep).join('/');
    try {
      execFileSync('git', ['add', 'js/data.js', relCover], { cwd: ROOT, stdio: 'inherit' });
      execFileSync('git', ['commit', '-m', `Add album: ${name} by ${band}`], { cwd: ROOT, stdio: 'inherit' });
    } catch (e) {
      fail('git add/commit failed — your files were still written to disk, but nothing was committed:\n' + e.message);
    }

    if (args.push === false) {
      console.log('--no-push passed, committed locally only.');
      return;
    }
    try {
      execFileSync('git', ['push'], { cwd: ROOT, stdio: 'inherit' });
      console.log(`\nDone — "${name}" by ${band} is committed and pushed.`);
    } catch (e) {
      fail('Commit succeeded locally, but git push failed:\n' + e.message);
    }
  } finally {
    if (rl && !rl.closed) rl.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
