import puppeteer from "puppeteer";

const getCarData = async (url: string) => {
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

  const carData = await page.evaluate(() => {
    // const company = document.querySelectorAll("ul > li > a:first-child");
    // return Array.from(company).map((e) => e.textContent);
    const title = document.querySelector(".vehicleCard__title");
    const specs = document.querySelector(".vehicleCard__uspList");
    const price = document.querySelector(".vehicleCard__price__inner");

    // return Array.from(title).map((e) => e.textContent?.trim());
    return [
      title?.textContent?.trim(),
      specs?.textContent?.trim(),
      price?.textContent?.trim(),
    ];
  });

  console.dir(carData, { maxArrayLength: null }); // log the entire array
  // close browser
  await browser.close();
};

getCarData("https://www.saxton4x4.co.uk/");
