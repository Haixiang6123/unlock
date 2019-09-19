const puppeteer = require('puppeteer');

(async () => {
  async function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  const links = [
    'https://www.1point3acres.com/bbs/interview/twitter-software-engineer-436994.html',
    'https://www.1point3acres.com/bbs/thread-551409-1-1.html'
  ]

  // Launch browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set up account
  await page.goto('https://www.1point3acres.com/bbs/')
  await page.evaluate(() => {
    document.querySelector('#ls_username').value = 'yan6123@qq.com';
    document.querySelector('#ls_password').value = 'Qq680321!!';
    document.querySelector('button[type="submit"]').click()
  })

  setTimeout(async () => {
    // Get screenshots
    for (let i = 0; i < links.length; i++) {
      console.log(`Fetching #${i} link: ${links[i]}...`)
      // Random access 4ms ~ 10ms
      const sleeping = getRandomArbitrary(4, 10)
      console.log(`Sleeping ${sleeping * 1000} ms`)
      await sleep(sleeping * 1000)

      await page.goto(links[i]);

      await page.screenshot({path: `unlock-${i}.png`, fullPage: true});
    }

    await browser.close();
  }, 5000)
})();
