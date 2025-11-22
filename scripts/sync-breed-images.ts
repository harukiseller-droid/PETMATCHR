import fs from 'fs/promises';
import path from 'path';

const INPUT_DIR = path.join(process.cwd(), 'input_image');
const PUBLIC_DIR = path.join(process.cwd(), 'public/images/breeds');

function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-');  // Replace multiple - with single -
}

async function syncImages() {
    try {
        // Ensure public dir exists
        await fs.mkdir(PUBLIC_DIR, { recursive: true });

        const entries = await fs.readdir(INPUT_DIR, { withFileTypes: true });

        for (const entry of entries) {
            if (entry.isDirectory()) {
                const breedName = entry.name;
                const breedSlug = slugify(breedName);
                const sourceDir = path.join(INPUT_DIR, breedName);
                const targetDir = path.join(PUBLIC_DIR, breedSlug);

                console.log(`Processing ${breedName} -> ${breedSlug}`);

                await fs.mkdir(targetDir, { recursive: true });

                const files = await fs.readdir(sourceDir);
                const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

                for (const file of imageFiles) {
                    const sourceFile = path.join(sourceDir, file);
                    const targetFile = path.join(targetDir, file);

                    // Simple copy (overwrite)
                    await fs.copyFile(sourceFile, targetFile);
                }

                console.log(`  Synced ${imageFiles.length} images.`);
            }
        }

        console.log('Image sync complete.');

    } catch (error) {
        console.error('Error syncing images:', error);
    }
}

syncImages();
