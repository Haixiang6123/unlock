const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  async function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Put your links here!
  console.log('Reading links...')
  const linksString = await fs.readFileSync('./links.txt', 'utf8')
  console.log(`Walking through:\n${linksString}`)
  const links = linksString.split('\r\n').filter(link => link !== '')


  // Launch browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set up account
  await page.goto('https://www.1point3acres.com/bbs/')
  await page.evaluate(() => {
    document.querySelector('#ls_username').value = '一亩三分地用户名';
    document.querySelector('#ls_password').value = '一亩三分地密码';
    document.querySelector('button[type="submit"]').click()
  })

  setTimeout(async () => {
    // Get screenshots
    for (let i = 0; i < links.length; i++) {
      if (!links) {
        continue
      }

      // Random access 4ms ~ 10ms
      const sleeping = getRandomArbitrary(4, 10)
      console.log(`Sleeping ${sleeping * 1000} ms`)
      await sleep(sleeping * 1000)

      console.log(`Fetching #${i} link: ${links[i]}...`)
      await page.goto(links[i]);

      await page.screenshot({path: `./dist/unlock-${i}.png`, fullPage: true});
    }

    await browser.close();
  }, 5000)
})();
