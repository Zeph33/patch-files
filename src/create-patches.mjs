import path from "path";
import { existsSync } from "fs";
import { cwd } from "./lib/known-paths.mjs";
import { log } from "./lib/log.mjs";
import { getModulePathInfo } from "./lib/get-module-path-info.mjs";
import { fetchFromUnpkg } from "./lib/fetch-from-unpkg.mjs";
import { getModuleVersion } from "./lib/get-module-version.mjs";
import { createPatch } from "./lib/create-patch.mjs";

export async function createPatches(filePaths) {
  for (const filePath of filePaths) {
    const absoluteFilePath = path.join(cwd, filePath);

    if (!existsSync(absoluteFilePath)) {
      log.error(`File path "${filePath}" not found, skipping`);
      continue;
    }

    const { dir, name } = getModulePathInfo(filePath);

    const version = await getModuleVersion({
      dir,
      name,
    });

    if (!version) {
      continue;
    }

    // TODO: Make more robust
    const nodeModuleRelativePath = filePath.replace(
      `node_modules${path.sep}${name}`,
      ``
    );

    const patchId = await fetchFromUnpkg({
      name,
      version,
      filePath: nodeModuleRelativePath,
    });

    if (!patchId) {
      continue;
    }

    await createPatch({ filePath, patchId });
  }
}