import fs from "fs";
import path from "path";

export function getAllStaticParams() {
  const baseDir = path.join(process.cwd(), "src/data/pages");
  const categories = fs.readdirSync(baseDir);

  const params = {};

  for (const category of categories) {
    const dir = path.join(baseDir, category);
    if (!fs.statSync(dir).isDirectory()) continue;

    const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));

    params[category] = files.map(file => ({
      slug: file.replace(".json", "")
    }));
  }

  return params;
}
