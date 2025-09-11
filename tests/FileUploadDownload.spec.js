import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('File Upload & Download automation', async ({ page }) => {
  // ---------------------------
  // 1. File Upload (DemoQA site)
  // ---------------------------
  await page.goto('https://demoqa.com/upload-download');

  // Absolute path to your file (pick any image in your system)
  const filePath = path.join(__dirname, 'profile-pic.png');

  // Upload the file
  await page.setInputFiles('#uploadFile', filePath);

  // Verify uploaded file name is displayed
  await expect(page.locator('#uploadedFilePath')).toContainText('profile-pic.png');

  // ---------------------------
  // 2. File Download
  // ---------------------------
  // Start waiting for download before clicking
  const [ download ] = await Promise.all([
    page.waitForEvent('download'),
    page.click('#downloadButton') // triggers download
  ]);

  // Save downloaded file to project folder
  const downloadPath = path.join(__dirname, 'DownloadedFile.png');
  await download.saveAs(downloadPath);

  // Check file really exists
  expect(fs.existsSync(downloadPath)).toBeTruthy();
});
