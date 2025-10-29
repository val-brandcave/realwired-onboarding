/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Automated Screenshot Capture Script
 * This script captures screenshots of all pages in the YouConnect onboarding app
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Base URL of the running dev server
const BASE_URL = 'http://localhost:3000';

// Screenshot configuration
const VIEWPORT = { width: 1920, height: 1080 };
const SCREENSHOT_DIR = path.join(__dirname, '..', 'screenshots');

// All pages to capture with their labels
const pages = [
  // Landing Page
  { url: '/', label: '00-landing-page', description: 'Landing page with role selection' },
  
  // Hub
  { url: '/hub', label: '01-hub', description: 'Onboarding hub - module overview' },
  
  // Module 1: Organization Setup
  { url: '/organization-setup-intro', label: '02-module1-intro', description: 'Module 1 - Organization Setup Intro' },
  { url: '/organization-setup', label: '03-module1-step1-services', description: 'Module 1 - What services do you offer?' },
  { url: '/organization-setup/org-info', label: '04-module1-step2-org-info', description: 'Module 1 - Organization Information' },
  { url: '/organization-setup/branding', label: '05-module1-step3-branding', description: 'Module 1 - Branding & Customization' },
  { url: '/organization-setup/participants', label: '06-module1-step4-participants', description: 'Module 1 - Onboarding Participants' },
  { url: '/organization-setup/it-config', label: '07-module1-step5-it-config', description: 'Module 1 - IT Configuration' },
  { url: '/organization-setup/complete', label: '08-module1-complete', description: 'Module 1 - Completion' },
  
  // Module 2: Definitions
  { url: '/definitions-intro', label: '09-module2-intro', description: 'Module 2 - Definitions Intro' },
  { url: '/definitions', label: '10-module2-overview', description: 'Module 2 - Definitions Overview' },
  { url: '/definitions/property-categories', label: '11-module2-step1-property-categories', description: 'Module 2 - Property Categories & Request Types' },
  { url: '/definitions/properties/configure', label: '12-module2-step2-property-record', description: 'Module 2 - Property Record Configuration' },
  { url: '/definitions/request-form/configure', label: '13-module2-step3-request-form', description: 'Module 2 - Request Form Configuration' },
  { url: '/definitions/complete', label: '14-module2-complete', description: 'Module 2 - Completion' },
  
  // Module 3: Users
  { url: '/users-intro', label: '15-module3-intro', description: 'Module 3 - Team & Groups Intro' },
  { url: '/users', label: '16-module3-users', description: 'Module 3 - Add Team Members' },
  { url: '/users/lending-groups', label: '17-module3-lending-groups', description: 'Module 3 - Lending Groups' },
  { url: '/users/complete', label: '18-module3-complete', description: 'Module 3 - Completion' },
  
  // Module 4: Routing
  { url: '/routing-intro', label: '19-module4-intro', description: 'Module 4 - Routing Intro' },
  { url: '/routing-setup/request-type', label: '20-module4-request-type', description: 'Module 4 - Request Type Job Manager' },
  { url: '/routing-setup/logical', label: '21-module4-logical', description: 'Module 4 - Logical Routing' },
  { url: '/routing-setup/assigned-area', label: '22-module4-assigned-area', description: 'Module 4 - Assigned Area' },
  { url: '/routing-setup/complete', label: '23-module4-complete', description: 'Module 4 - Completion' },
  
  // Module 5: General Settings
  { url: '/general-settings-intro', label: '24-module5-intro', description: 'Module 5 - General Settings Intro' },
  { url: '/general-settings', label: '25-module5-settings', description: 'Module 5 - Workflow Settings & Timers' },
  { url: '/general-settings/complete', label: '26-module5-complete', description: 'Module 5 - Completion' },
  
  // Module 6: IT Checklist
  { url: '/it-checklist-intro', label: '27-module6-intro', description: 'Module 6 - IT Readiness Intro' },
  { url: '/it-checklist', label: '28-module6-checklist', description: 'Module 6 - IT Checklist' },
  { url: '/it-checklist/complete', label: '29-module6-complete', description: 'Module 6 - Completion' },
  
  // Test Order
  { url: '/test-order', label: '30-test-order', description: 'Test Order Creation Page' },
];

async function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
}

async function captureScreenshot(page, url, label, description) {
  try {
    console.log(`📸 Capturing: ${description}...`);
    
    // Navigate to the page
    await page.goto(`${BASE_URL}${url}`, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    // Wait a bit for any animations to complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take screenshot
    const filename = `${label}.png`;
    const filepath = path.join(SCREENSHOT_DIR, filename);
    
    await page.screenshot({
      path: filepath,
      fullPage: true
    });
    
    console.log(`   ✅ Saved: ${filename}`);
    return { success: true, label, description };
  } catch (error) {
    console.error(`   ❌ Failed to capture ${label}: ${error.message}`);
    return { success: false, label, description, error: error.message };
  }
}

async function generateManifest(results) {
  const manifest = {
    generatedAt: new Date().toISOString(),
    totalPages: results.length,
    successCount: results.filter(r => r.success).length,
    failureCount: results.filter(r => !r.success).length,
    screenshots: results.map(r => ({
      label: r.label,
      description: r.description,
      filename: `${r.label}.png`,
      success: r.success,
      error: r.error || null
    }))
  };
  
  const manifestPath = path.join(SCREENSHOT_DIR, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n📋 Generated manifest: ${manifestPath}`);
}

async function main() {
  console.log('🚀 Starting automated screenshot capture...\n');
  console.log(`📁 Screenshots will be saved to: ${SCREENSHOT_DIR}\n`);
  
  // Ensure screenshots directory exists
  await ensureDirectoryExists(SCREENSHOT_DIR);
  
  // Launch browser
  console.log('🌐 Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);
  
  console.log('✅ Browser ready\n');
  console.log(`📸 Capturing ${pages.length} pages...\n`);
  
  // Capture all screenshots
  const results = [];
  for (const pageInfo of pages) {
    const result = await captureScreenshot(page, pageInfo.url, pageInfo.label, pageInfo.description);
    results.push(result);
  }
  
  // Close browser
  await browser.close();
  console.log('\n✅ Browser closed');
  
  // Generate manifest
  await generateManifest(results);
  
  // Summary
  const successCount = results.filter(r => r.success).length;
  const failureCount = results.filter(r => !r.success).length;
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total pages: ${results.length}`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failureCount}`);
  
  if (failureCount > 0) {
    console.log('\n❌ Failed screenshots:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.label}: ${r.error}`);
    });
  }
  
  console.log('\n✨ Screenshot capture complete!');
  console.log(`📁 Check the screenshots folder: ${SCREENSHOT_DIR}`);
}

// Run the script
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

