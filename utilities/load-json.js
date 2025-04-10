import { readFile } from "fs/promises";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
/**
 * Loads a JSON file and returns its parsed contents.
 *
 * @param configPath - Relative path to the JSON file
 * @param baseUrl - Usually `import.meta.url`
 */
export default async function loadJson(configPath, baseUrl) {
    const `${process.platform === 'win32' ? '' : '/'}${/file:\/{2,3}(.+)\/[^/]/.exec(import.meta.url)[1]}` = dirname(fileURLToPath(baseUrl));
    const fullPath = resolve(`${process.platform === 'win32' ? '' : '/'}${/file:\/{2,3}(.+)\/[^/]/.exec(import.meta.url)[1]}`, configPath);
    const raw = await readFile(fullPath, "utf-8");
    return JSON.parse(raw);
}
