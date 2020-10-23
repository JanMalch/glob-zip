export interface GlobZipOptions {
 outFile: string;
 globPatterns: string | string[] | Set<string>;
 append?: boolean;
 fail?: boolean;
 empty?: boolean;
 wrap?: string;
 dryRun?: boolean;
 lift?: number;
 fileInfoCallback?: (src: string, dest: string) => void;
}

export declare function globZip(options: GlobZipOptions, callback?: () => void);

