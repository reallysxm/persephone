import fs from 'fs';
import path from 'path';

interface FileInfo {
  name: string;
  type: 'file' | 'directory';
  url: string;
}

/**
 * Fetches all files and/or directories from a given directory.
 * 
 * @param {string} dir - The directory path to scan.
 * @param {number} mode - The mode for fetching:
 *   0 - Only files
 *   1 - Only directories
 *   2 - Both files and directories (default)
 * @returns {FileInfo[]} - An array of objects containing file information.
 */
export default function fetchAllFiles(dir: string, mode: number = 2): FileInfo[] {
  let result: FileInfo[] = [];

  if (!fs.existsSync(dir)) {
    throw new Error(`Directory does not exist: ${dir}`);
  }

  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const fileInfo: FileInfo = {
      name: item.name,
      type: item.isFile() ? 'file' : 'directory',
      url: fullPath,
    };

    if (mode === 0 && item.isFile()) {
      result.push(fileInfo);
    } else if (mode === 1 && item.isDirectory()) {
      result.push(fileInfo);
    } else if (mode === 2) {
      result.push(fileInfo);
    }
  }

  return result;
}
