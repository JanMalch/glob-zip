const { program } = require('commander');
const path = require('path');
const chalk = require('chalk');
const pkg = require('./package.json');
const { globZip } = require('.');

const globPatterns = new Set();
let output = null;

function addGlobPattern(pattern) {
  if (pattern != null) {
    globPatterns.add(pattern);
  }
}

function resolveWrap(value) {
  if (typeof value === 'string') {
    return value;
  } else {
    return path.basename(process.cwd());
  }
}

// FIXME: change argument usage to "glob-zip [options] <outFile> <pattern> [patterns...]"

program
  .name('glob-zip')
  .arguments('<outFile> [globPattern]')
  .on('option:verbose', function () {
    process.env.VERBOSE = this.verbose;
  })
  .on('option:wrap', function (value) {
    this.wrap = resolveWrap(value);
  })
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  $ glob-zip out.zip *.json                              # easiest usage');
    console.log('  $ glob-zip out.zip *.json --glob="sp ace.txt" -g *.js      # three glob patterns');
    console.log('  $ glob-zip out.zip src/**/*.js --wrap backup --lift 1  # effectively renames "src" to "backup" in zip');
  })
  .option('-g, --glob <pattern>', 'Add a glob pattern', addGlobPattern)
  .option(
    '-w, --wrap [name]',
    'Define the root path within the zip, defaults to current directory name if flag is present without value'
  )
  .option(
    '-l, --lift <depth>',
    'Lift files the given amount of directories for the path in the zip',
    (v) => parseInt(v, 10),
    0
  )
  .option('-a, --append', 'Appends to the specified outFile if present. If not, a file with the same name would be removed.', false)
  .option('-F, --no-fail', 'Do not fail when zip would be empty', false)
  .option('-E, --no-empty', 'Do not include empty directories', false)
  .option('-d, --dry-run', 'Do not write or delete any files', false)
  .option('-v, --verbose', 'Use verbose output', false)
  .version(pkg.version)
  .action((outFile, globPattern) => {
    output = path.resolve(outFile);
    addGlobPattern(globPattern);
  });

program.parse(process.argv);

if (globPatterns.size === 0) {
  console.error('error: no glob patterns defined');
  process.exit(1);
}

if (process.env.VERBOSE) {
  console.log(`using ${chalk.blue(
    globPatterns.size.toString(10)
  )} glob pattern${globPatterns.size === 1 ? '' : 's'}:
  ${Array.from(globPatterns.values())
    .map((p) => chalk.green(p))
    .join('\n  ')}
`);
}

const prettyPrintSrcDest = (src, dest) => {
  const srcCwdPart = src.substring(0, process.cwd().length + 1);
  const srcFilePart = src.substring(srcCwdPart.length);
  const destCwdPart = path.dirname(output);
  const destFilePart = path.basename(output);

  console.log(
    chalk.blue(dest.endsWith(path.sep) ? 'empty dir:' : 'file:'),
    chalk.gray(srcCwdPart) + chalk.green(srcFilePart),
    '->',
    (
      chalk.gray(destCwdPart + path.sep) +
      destFilePart + path.sep +
      chalk.green(dest.startsWith(path.sep) ? dest.substring(1) : dest)
    )
  );
};

try {
  globZip({
    ...program,
    outFile: output,
    globPatterns,
    fileInfoCallback: process.env.VERBOSE ? prettyPrintSrcDest : undefined,
  });
} catch (e) {
  console.error('error:', e.message);
  process.exit(1);
}
