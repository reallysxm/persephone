import { readFile } from "fs/promises";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

/**
 * Loads a JSON file and returns its parsed contents.
 *
 * @param configPath - Relative path to the JSON file
 * @param baseUrl - Usually `import.meta.url`
 */
export default async function loadJson<T extends Record<string, unknown>>(
  configPath: string,
  baseUrl: URL
): Promise<T> {
  const dirname__ = dirname(fileURLToPath(baseUrl));
  const fullPath = resolve(dirname__, configPath);
  const raw = await readFile(fullPath, "utf-8");
  return JSON.parse(raw) as T;
}
