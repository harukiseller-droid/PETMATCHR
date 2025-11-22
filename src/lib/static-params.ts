import fs from "fs";
import path from "path";

export function getAllStaticParams(): Record<string, { slug: string }[]> {
    const baseDir = path.join(process.cwd(), "src/data_v7/pages");

    // Check if directory exists to avoid runtime errors during build if data is missing
    if (!fs.existsSync(baseDir)) {
        console.warn(`Data directory not found: ${baseDir}`);
        return {};
    }

    const categories = fs.readdirSync(baseDir);

    const params: Record<string, { slug: string }[]> = {};

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
