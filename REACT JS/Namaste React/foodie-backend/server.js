const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();
const PORT = 5000;

app.use(cors());

let browserInstance = null;
let pageInstance = null;

// Reusable browser with stealth settings
async function getPage() {
  if (!browserInstance) {
    browserInstance = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-blink-features=AutomationControlled", // Hides the bot flag
      ],
    });
  }

  if (!pageInstance || pageInstance.isClosed()) {
    pageInstance = await browserInstance.newPage();

    await pageInstance.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    );

    // Initial visit to establish session and WAF cookies
    console.log("Initializing Swiggy browser session...");
    await pageInstance.goto("https://www.swiggy.com", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    console.log("Session ready!");
  }

  return pageInstance;
}



app.get("/api/restaurants/:latitude", async (req, res) => {


})



app.get("/api/menu/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params;
  const lat = req.query.lat || "12.9352403";
  const lng = req.query.lng || "77.624532";

  const targetUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`;

  try {
    const page = await getPage();

    // Execute same-origin fetch directly inside the active browser session
    const data = await page.evaluate(async (url) => {
      const resp = await fetch(url, {
        headers: {
          "__fetch_req__": "true",
          "Accept": "*/*",
        },
      });

      const text = await resp.text();
      try {
        return JSON.parse(text);
      } catch (e) {
        return { error: "Non-JSON response", raw: text.slice(0, 300) };
      }
    }, targetUrl);

    if (data.error) {
      console.warn("Got non-JSON from Swiggy:", data.raw);
      return res.status(500).json({ error: "Swiggy challenge not passed yet", details: data.raw });
    }

    console.log(`Successfully fetched live data for restaurant ${restaurantId}`);
    res.json(data);
  } catch (error) {
    console.error("Puppeteer fetch error:", error);
    res.status(500).json({ error: "Failed to fetch menu via Puppeteer" });
  }
});

app.listen(PORT, () => {
  console.log(`Automated Live Backend running at http://localhost:${PORT}`);
});