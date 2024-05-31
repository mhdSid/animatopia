const puppeteer = require('puppeteer')

async function launchPuppeteer () {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--font-render-hinting=none',
      '--hide-scrollbars',
      '--enable-font-antialiasing',
      '--disable-raf-throttling'
    ]
  })

  return browser
}

async function openNewPage ({
  browser,
  url
}) {
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle2' })
  return page
}

module.exports = {
  launchPuppeteer,
  openNewPage
}
