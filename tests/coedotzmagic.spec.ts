import { test } from '@playwright/test';
import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

test('Buka Chrome dengan salinan profil (Fix Protocol Error)', async () => {
    // 1. Path profil asli kamu
    const originalProfile = 'C:\\Users\\Coedotz\\AppData\\Local\\Google\\Chrome\\User Data\\Default';

    // 2. Folder salinan khusus untuk Playwright
    const customUserDataDir = path.join(__dirname, '../my-automation-profile');
    const targetDefault = path.join(customUserDataDir, 'Default');

    if (!fs.existsSync(targetDefault)) {
        console.log("Menyiapkan salinan profil Chrome untuk automasi...");
        fs.mkdirSync(targetDefault, { recursive: true });

        const filesToCopy = ['Preferences', 'Local State', 'Cookies', 'Login Data'];
        for (const file of filesToCopy) {
            const srcFile = path.join(originalProfile, file);
            const destFile = path.join(targetDefault, file);
            if (fs.existsSync(srcFile)) {
                try {
                    fs.copyFileSync(srcFile, destFile);
                } catch (e) {
                    // Lewati jika file sedang dikunci
                }
            }
        }
    }

    // 3. Jalankan Playwright menggunakan folder salinan
    const context = await chromium.launchPersistentContext(customUserDataDir, {
        channel: 'chrome',
        headless: false,
        slowMo: 500,
    });

    // --- PERBAIKAN DI SINI ---
    // Gunakan tab pertama yang sudah terbuka secara otomatis oleh browser
    let page = context.pages()[0];
    if (!page) {
        page = await context.newPage();
    }

    console.log("Membuka Google...");
    await page.goto('https://www.google.com', { waitUntil: 'domcontentloaded' });

    const searchBox = page.locator('[name="q"]');
    await searchBox.fill('coedotzmagic.com');
    await searchBox.press('Enter');

    console.log("Pencarian berhasil diketik!");
    await page.waitForTimeout(5000);

    await context.close();
});