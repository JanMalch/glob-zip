# glob-zip <a href="https://www.github.com/JanMalch/glob-zip"><img src="https://user-images.githubusercontent.com/25508038/63974103-75242700-caac-11e9-8ca4-71cc5b905e90.png" width="90" height="90" align="right"></a>

[![npm](https://badgen.net/bpm/v/glob-zip)](https://www.npmjs.com/package/glob-zip)
[![Build](https://github.com/JanMalch/glob-zip/workflows/Build/badge.svg)](https://github.com/JanMalch/glob-zip/workflows/Build)

_Create zip files based on glob patterns._

## Installation

```
npm i -g glob-zip
```

## Usage

```
$ glob-zip --help

Usage: glob-zip [options] <outFile> [globPattern]

Options:
  -V, --version         output the version number
  -g, --glob <pattern>  Add a glob pattern
  -a, --append          Appends to the specified outFile if present (default: false)
  -l, --lift <depth>    Lift files the given amount of directories for the path in the zip (default: 0)
  -w, --wrap [name]     Define the root path within the zip, defaults to current directory name if flag is present without value
  -F, --no-fail         Do not fail when zip would be empty
  -E, --no-empty        Do not include empty directories
  -d, --dry-run         Do not write the final zip (default: false)
  -v, --verbose         Use verbose output (default: false)
  -h, --help            display help for command

Examples:
  $ glob-zip out.zip *.json                              # easiest usage
  $ glob-zip out.zip -g *.json -g *.js                   # multiple glob patterns
  $ glob-zip out.zip src/**/*.js --wrap backup --lift 1  # effectively renames "src" to "backup" in zip
```
