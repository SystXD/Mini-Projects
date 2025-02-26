import fs from "fs";
import path from "path";
import { FileInfo, MethodInfo } from "../typings";
export const getFiles = (dir: string, nested = false): FileInfo[] => {
    const paths: FileInfo[] = [];

    fs.readdirSync(dir, { withFileTypes: true }).forEach((file) => {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory() && nested) {
            paths.push(...getFiles(fullPath, true));
        } else  {
            paths.push({
                filePath: fullPath,
                folderName: path.basename(dir),
                isFolder: false,
            });
        }
    });

    return paths;
};

export function getMethods(dir: string): MethodInfo[] {
  const methods: MethodInfo[] = [];
  fs.readdirSync(dir, { withFileTypes: true })
    .filter((f) => f.isDirectory())
    .forEach((f) =>
      methods.push({ method: f.name, path: path.join(dir, f.name) })
    );
  return methods;
}

export function pathToRoute(filePath: string): string {
  const normalizedPath = path.normalize(filePath);

  return (
    "/" +
    normalizedPath
      .replace(/\.(js|ts)$/, "")
      .split(path.sep)
      .map(seg => seg.startsWith("[") && seg.endsWith("]") ? `:${seg.slice(1, -1)}` : seg)
      .filter(Boolean)
      .join("/")
  );
}
