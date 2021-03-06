# glob-zip <a href="https://www.github.com/JanMalch/glob-zip"><img src="https://user-images.githubusercontent.com/25508038/97730414-1acd8e80-1ad4-11eb-8fc5-4c2952cf5c31.png" width="90" height="90" align="right"></a>

[![npm](https://img.shields.io/npm/v/glob-zip)](https://www.npmjs.com/package/glob-zip)

_Create zip files based on glob patterns._

## Installation

```
npm i -g glob-zip
```

## Usage

The library is intended for CLI usage:

```
$ glob-zip --help

Usage: glob-zip [options] <outFile> <globPatterns...>

Options:
  -w, --wrap [name]   Define the root path within the zip, defaults to current directory name if flag is present without value
  -l, --lift [depth]  Lift files the given amount of directories for the path in the zip (default: 0)
  -a, --append        Appends to the specified outFile if present. If not, a file with the same name would be removed. (default: false)
  -F, --no-fail       Do not fail when zip would be empty
  -E, --no-empty      Do not include empty directories
  -d, --dry-run       Do not write or delete any files (default: false)
  -V, --verbose       Use verbose output (default: false)
  -v, --version       output the version number
  -h, --help          display help for command

Examples:
  $ glob-zip out.zip *.json                              # easiest usage
  $ glob-zip out.zip *.json "sp ace.txt" *.js            # three glob patterns
  $ glob-zip out.zip src/**/*.js --wrap backup --lift 1  # effectively renames "src" to "backup" in zip
```

You can also use it programmatically:

```js
const globZip = require('glob-zip');

globZip({
  outFile: 'out.zip',
  globPatterns: ['src/**/*.js', '*.json'],
}, (err) => {
  if (err != null) {
    console.error('Failed to write ZIP', err);
  } else {
    console.log('ZIP file ready!');
  }
});
```