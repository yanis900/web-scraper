import puppeteer from "puppeteer";

const getCompanies = async (url: string) => {
  const browser = await puppeteer.launch({
    // start Puppeteer session.
    headless: true, // use visible browser
    defaultViewport: null, // max out height and width
  });

  const page = await browser.newPage(); // new page in browser

  await page.goto(url, {
    // direct page to url
    waitUntil: "domcontentloaded", // wait for content to load before appearing
  });

  const companies = await page.evaluate(() => {
    const company = document.querySelectorAll("ul > li > a:first-child");

    return Array.from(company).map((e) => e.textContent); 
  });

  console.dir(companies, { maxArrayLength: null }); // log the entire array

  // close browser
  await browser.close();
};

getCompanies(
  "https://en.wikipedia.org/wiki/List_of_companies_of_the_United_Kingdom_A%E2%80%93J"
);
