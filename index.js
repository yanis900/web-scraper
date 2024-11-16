import puppeteer from "puppeteer";

const getCompanies = async () => {
  var url =
    "https://en.wikipedia.org/wiki/List_of_companies_of_the_United_Kingdom_A%E2%80%93J";

  const browser = await puppeteer.launch({
    // This starts a Puppeteer session.
    headless: true, // This will make the browser visible.
    defaultViewport: null, // This will make sure the height and width will be maxed out.
  });

  const page = await browser.newPage(); // This will create a new page in the browser.

  await page.goto(url, {
    // This will direct to page to a specific Url.
    waitUntil: "domcontentloaded", // This will wait until the content is loaded before appearing.
  });

  const companies = await page.evaluate(() => {
    const company = document.querySelectorAll("ul > li > a:first-child");

    return Array.from(company).map((e) =>e.textContent)

  });

  console.dir(companies, {'maxArrayLength': null});

  await browser.close();
};

getCompanies();
