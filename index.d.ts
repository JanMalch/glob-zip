/**
 * Options for programmatic usage of glob-zip.
 */
export interface GlobZipOptions {
  /**
   * The path the destination zip file.
   */
  outFile: string;
  /**
   * One or more glob patterns to use as input
   */
  globPatterns: string | string[] | Set<string>;
  /**
   * If set to `true` and the given `outFile` already exists,
   * the found content will be added to the existing zip.
   * In all other cases a completely new ZIP file will be written.
   */
  append?: boolean;
  /**
   * If set to `true`, the function will fail, if the resulting zip would be empty.
   */
  failIfEmpty?: boolean;
  /**
   * If set to `true`, empty directories will be included in the zip.
   */
  empty?: boolean;
  /**
   * A path-like string to prepend all destinations paths for the zip with.
   */
  wrap?: string;
  /**
   * If set to `true`, no file will be written.
   */
  dryRun?: boolean;
  /**
   * Determines how many directories to lift each file in the zip.
   * If the value is greater than the depth of the relative path, the function will fail.
   */
  lift?: number;
  /**
   * A function that is called on each found file with the resolved source and destination path.
   * @param src the source path on your locale file system
   * @param dest the destination path in the zip file
   */
  fileInfoCallback?: (src: string, dest: string) => void;
}

/**
 * Creates a zip file based on the given options.
 * @param options options to configure input, output, and behaviour
 * @param callback callback when the function finishes or fails
 */
export declare function globZip(
  options: GlobZipOptions,
  callback?: (error?: any) => void
);
