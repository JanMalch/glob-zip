const { glob } = require('glob');
const path = require('path');
const fs = require('fs');
const AdmZip = require('adm-zip');


module.exports.globZip = function (
  {
    outFile,
    globPatterns: _globPatterns,
    append,
    fail: failIfZipEmpty,
    empty: includeEmptyDirectories,
    wrap,
    dryRun,
    lift,
    fileInfoCallback = () => {
    },
  },
  callback = () => {}
) {
  let globPatterns;
  if (_globPatterns instanceof Set) {
    globPatterns = _globPatterns;
  } else if (typeof _globPatterns === 'string') {
    globPatterns = new Set([_globPatterns]);
  } else if (Array.isArray(_globPatterns)) {
    globPatterns = new Set(_globPatterns);
  } else {
    throw new TypeError(`cannot use given globPatterns`);
  }

  const files = Array.from(globPatterns.values()).reduce(
    (acc, p) => acc.concat(glob.sync(p, { dot: true })),
    []
  );

  if (!dryRun && fs.existsSync(outFile) && append !== true) {
    fs.unlinkSync(outFile);
  }

  const zip =
    append === true && fs.existsSync(outFile)
      ? new AdmZip(outFile)
      : new AdmZip();

  const prefix =
    wrap == null ? '' : wrap.endsWith(path.sep) ? wrap : wrap + path.sep;

  files.forEach((file) => {
    const segments = path.normalize(file).split(path.sep);
    if (segments.length <= lift) {
      throw new Error(
        `cannot lift '${file}' ${lift} directories (${
          lift + 1 - segments.length
        } too many)`
      );
    }
    const srcPath = path.resolve(process.cwd(), file);
    const destPath = prefix + segments.slice(lift, -1).join(path.sep);
    const destPathWithName =
      destPath + path.sep + segments[segments.length - 1];
    if (fs.lstatSync(srcPath).isDirectory()) {
      if (includeEmptyDirectories && fs.readdirSync(srcPath).length === 0) {
        zip.addFile(destPathWithName + path.sep, Buffer.alloc(0));
        fileInfoCallback(srcPath + path.sep, destPathWithName + path.sep);
      }
    } else {
      zip.addLocalFile(srcPath, destPath);
      fileInfoCallback(srcPath, destPathWithName);
    }
  });

  if (failIfZipEmpty && zip.getEntries().length === 0) {
    throw new Error('no files found');
  }

  if (!dryRun) {
    zip.writeZip(outFile, callback);
  } else {
    callback();
  }
};
