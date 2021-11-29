const puppeteer = require('puppeteer');
const rimraf = require('rimraf');

const fs = require('fs');
const data = JSON.parse(fs.readFileSync('cards.json', 'utf8'));

const USER_DATA_DIR = 'C:\\temp\\puppeteer_user_data';
const USER_DATA_DIR_WSL = '/mnt/c/temp/puppeteer_user_data';

( async () => {

    const browser = await puppeteer.launch();

    const page = await browser.newPage()
    const navigationPromise = page.waitForNavigation()
    
    await page.goto('https://donations.wires.org.au/')

    await page.setViewport({ width: 1536, height: 714 })

    await navigationPromise
    console.log('entering doner details')
    await page.waitForSelector('#s_name')
    await page.click('#s_name')
    await page.type('#s_name', 'Xu')
    await page.type('.col-12 > #contact-form > .form-row > .col-md-6:nth-child(2) > .form-control', 'Xie')
    console.log('NAME: Xu Xie')

    await page.waitForSelector('#form_field_6_19_No')
    await page.click('#form_field_6_19_No')
    console.log('EMAIL: xuxie@sharklasers.com')

    await page.waitForSelector('.col-12 > #contact-form > .form-row > .col > .select-country')
    await page.select('.col-12 > #contact-form > .form-row > .col > .select-country', 'Australia')

    await page.waitForSelector('.col-12 > #contact-form > .form-row > .col > .select-country')
    await page.click('.col-12 > #contact-form > .form-row > .col > .select-country')

    await page.waitForSelector('#contact-form > .address-fields > .form-row > .col > .form-control')
    await page.click('#contact-form > .address-fields > .form-row > .col > .form-control')

    await page.type('#contact-form > .address-fields > .form-row > .col > .form-control', '770 George St')
    await page.type('#contact-form > .address-fields > .form-row > .col-md-4:nth-child(1) > .form-control', 'Sydney')
    await page.type('#contact-form > .address-fields > .form-row > .col-md-4:nth-child(2) > .form-control', 'NSW')

    await page.waitForSelector('.main-content > .container > .sectionPadding > .container > .row')
    await page.click('.main-content > .container > .sectionPadding > .container > .row')

    await page.waitForSelector('.form-row > .col > .radio-container > .radio:nth-child(4) > label')
    await page.click('.form-row > .col > .radio-container > .radio:nth-child(4) > label')

    await page.waitForSelector('#root > form > div > div.CardField-input-wrapper.is-ready-to-slide > span.CardField-number.CardField-child > span:nth-child(2) > div > div.CardNumberField-input-wrapper > span > input')
    await page.type('4242 4242 4242 4242')

    await page.waitForSelector('#root > form > div > div.CardField-input-wrapper.is-ready-to-slide > span.CardField-expiry.CardField-child > span > span > input')
    await page.type('01/25')
    
    await page.waitForNavigation('#root > form > div > div.CardField-input-wrapper.is-ready-to-slide > span.CardField-cvc.CardField-child > span > span > input')
    await page.type('888')

    await page.waitForSelector('#btn-submit')
    await page.click('#btn-submit')

    await browser.close()
})
