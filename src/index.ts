import Puppeteer from 'puppeteer';

const Instagram = async () => {
    const browser = await Puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.emulate(Puppeteer.devices['iPhone X']);

    return {
        login: async (username: string, password: string) => {
            const x = await page.goto('https://www.instagram.com/accounts/login/')
                .then(() => page.waitForSelector('[name=username]', {visible: true}))
                .then(() => page.type('[name=username]', username))
                .then(() => page.type('[name=password]', password))
                .then(() => page.click('[type=submit]'))
                .then(() => page.waitForSelector('#react-root > section > main > div > div > div > button', {visible: true}))
                .then(() => page.click('#react-root > section > main > div > div > div > button'))
                .then(() => page.evaluate(() => {
                    const test = document.querySelector('#react-root > section > main > section > div > div > div.Igw0E.IwRSH.YBx95._4EzTm.DhRcB.c420d.nGS-Y > h2');
                    return test?.innerHTML;
                })).catch((err) => console.log(err));

            return('Logged In')
        },
        upload: async (fileLocation: string) => {
            const x = await Promise.all([
                    page.waitForFileChooser(),
                    page.click('#react-root > section > nav.NXc7H.f11OC > div > div > div.KGiwt > div > div > div.q02Nz._0TPg')
                ])
                .then(([fileChooser]) =>  fileChooser.accept([fileLocation]))
                .then(() => page.waitForSelector('#react-root > section > div.gH2iS > div.N7f6u.Bc-AD > div > div > div > button.pHnkA', {visible: true}))
                .then(() => page.click('#react-root > section > div.gH2iS > div.N7f6u.Bc-AD > div > div > div > button.pHnkA'))
                .then(() => page.click('#react-root > section > div.Scmby > header > div > div.mXkkY.KDuQp > button'))
                .then(() => page.waitForSelector('#react-root > section > div.A9bvI > section.IpSxo > div.NfvXc > textarea', {visible: true}))
                .then(() => page.evaluate(() => {
                    const elem : HTMLInputElement = document.querySelector('#react-root > section > div.A9bvI > section.IpSxo > div.NfvXc > textarea') as HTMLInputElement;
                    elem.value = 'test';
                })
                .then(() => page.click('#react-root > section > div.Scmby > header > div > div.mXkkY.KDuQp > button'))
                .then(() => page.waitForSelector('body > div.oBPxI.Z2m7o > div > div', {visible: true, timeout: 60000}))
                .catch((err) => err));
            
            return('uploaded')
        },
        delete: async () => {
            
        },
        close: async () => {
            await browser.close();
        }
    }
}

export default Instagram;