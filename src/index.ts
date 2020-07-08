import Puppeteer from 'puppeteer';

const Instagram = async () => {
    let username = '';

    const browser = await Puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.emulate(Puppeteer.devices['iPhone X']);

    return {
        login: async (user: string, password: string) => {
            username = user;

            const x = await page.goto('https://www.instagram.com/accounts/login/')
                .then(() => page.waitForSelector('[name=username]', {visible: true}))
                .then(() => page.type('[name=username]', user))
                .then(() => page.type('[name=password]', password))
                .then(() => page.click('[type=submit]'))
                .then(() => page.waitForSelector('#react-root > section > main > div > div > div > button', {visible: true}))
                .then(() => page.click('#react-root > section > main > div > div > div > button'))
                .then(() => page.evaluate(() => {
                    const test = document.querySelector('#react-root > section > main > section > div > div > div.Igw0E.IwRSH.YBx95._4EzTm.DhRcB.c420d.nGS-Y > h2');
                    return test?.innerHTML;
                })).catch((err) => err);

            return('Logged In')
        },
        upload: async (fileLocation: string, caption: string = '', uploadTimeout: number = 60000) => {
            const x = await page.goto('https://www.instagram.com/')
                .then(() => page.waitForSelector('#react-root > section > nav.NXc7H.f11OC > div > div > div.KGiwt > div > div > div.q02Nz._0TPg', {visible: true}))
                .then(() => Promise.all([
                    page.waitForFileChooser(),
                    page.click('#react-root > section > nav.NXc7H.f11OC > div > div > div.KGiwt > div > div > div.q02Nz._0TPg')
                ]))
                .then(([fileChooser]) =>  fileChooser.accept([fileLocation]))
                .then(() => page.waitForSelector('#react-root > section > div.gH2iS > div.N7f6u.Bc-AD > div > div > div > button.pHnkA', {visible: true}))
                .then(() => page.click('#react-root > section > div.gH2iS > div.N7f6u.Bc-AD > div > div > div > button.pHnkA'))
                .then(() => page.click('#react-root > section > div.Scmby > header > div > div.mXkkY.KDuQp > button'))
                .then(() => page.waitForSelector('#react-root > section > div.A9bvI > section.IpSxo > div.NfvXc > textarea', {visible: true}))
                .then(() => page.type('#react-root > section > div.A9bvI > section.IpSxo > div.NfvXc > textarea', caption)
                .then(() => page.click('#react-root > section > div.Scmby > header > div > div.mXkkY.KDuQp > button'))
                .then(() => page.waitForSelector('body > div.oBPxI.Z2m7o > div > div', {visible: true, timeout: uploadTimeout}))
                .catch((err) => err));
            
            return('Uploaded')
        },
        like: async () => {
            
        },
        follow: async () => {
            
        },
        unfollow: async () => {
            
        },
        getMostRecentPostId: async () => {
            const x = await page.goto(`https://www.instagram.com/${username}`)
                .then(() => page.waitForSelector('#react-root > section > main > div > div._2z6nI > article > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(1) > a', {visible: true}))
                .then(() => page.evaluate(() => {
                    let a = document.querySelector('#react-root > section > main > div > div._2z6nI > article > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(1) > a') as HTMLAnchorElement;
                    let aSplit = a.href.split('/');
                    return(aSplit[aSplit.length-2])
                }))
                .catch((err) => err);

            return x;
        },
        delete: async (postId: string) => {
            const x = await page.goto(`https://www.instagram.com/p/${postId}`)
            .then(() => page.waitForSelector('#react-root > section > main > div > div > article > div.MEAGs > button', {visible: true}))
            .then(() => page.click('#react-root > section > main > div > div > article > div.MEAGs > button'))
            .then(() => page.waitForSelector('body > div.RnEpo.Yx5HN > div > div > div > div > button.aOOlW.-Cab_', {visible: true}))
            .then(() => page.click('body > div.RnEpo.Yx5HN > div > div > div > div > button.aOOlW.-Cab_'))
            .then(() => page.waitForSelector('body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.-Cab_', {visible: true}))
            .then(() => page.click('body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.-Cab_'))
            .then(() => page.waitForNavigation({ waitUntil: 'networkidle0' })
            .catch((err) => err));
            
            return('Deleted')
        },
        close: async () => {
            await browser.close();
        }
    }
}

export default Instagram;