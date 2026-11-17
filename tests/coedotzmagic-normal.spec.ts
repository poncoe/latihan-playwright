import { test, expect } from '@playwright/test';

test('Buka Google dan cari coedotzmagic.com', async ({ page }) => {
    console.log("Membuka Google menggunakan Chrome asli...");

    // 1. Membuka halaman Google
    await page.goto('https://www.google.com');

    // 2. Mencari kolom input pencarian berdasarkan atribut name="q"
    const searchBox = page.locator('[name="q"]');

    // 3. Mengetik 'coedotzmagic.com'
    await searchBox.fill('coedotzmagic.com');

    // 4. Menekan tombol Enter
    await searchBox.press('Enter');

    console.log("Pencarian berhasil diketik!");

    // 5. Menunggu selama 5 detik agar hasilnya sempat terlihat di layar
    await page.waitForTimeout(5000);
});