const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

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

// Helper function to execute requests directly inside the authenticated Swiggy browser session
async function fetchFromSwiggy(targetUrl, options = {}) {
  const page = await getPage();

  const data = await page.evaluate(
    async ({ url, opts }) => {
      const fetchOptions = {
        method: opts.method || "GET",
        headers: {
          __fetch_req__: "true",
          Accept: "*/*",
          ...(opts.headers || {}),
        },
      };

      if (opts.body) {
        fetchOptions.body =
          typeof opts.body === "string" ? opts.body : JSON.stringify(opts.body);
        fetchOptions.headers["Content-Type"] = "application/json";
      }

      const resp = await fetch(url, fetchOptions);
      const text = await resp.text();

      try {
        return JSON.parse(text);
      } catch (e) {
        return { error: "Non-JSON response", status: resp.status, raw: text.slice(0, 300) };
      }
    },
    { url: targetUrl, opts: options }
  );

  return data;
}

// 1. Initial restaurant list (GET)
app.get("/api/restaurants", async (req, res) => {
  const lat = req.query.lat || "12.9352403";
  const lng = req.query.lng || "77.624532";
  const targetUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

  try {
    const data = await fetchFromSwiggy(targetUrl);

    if (data.error) {
      console.warn("Got non-JSON from Swiggy:", data.raw);
      return res.status(500).json({ error: "Failed to load restaurants", details: data.raw });
    }

    console.log("Successfully fetched initial restaurants");
    res.json(data);
  } catch (error) {
    console.error("Restaurants fetch error:", error);
    res.status(500).json({ error: "Failed to fetch restaurants via Puppeteer" });
  }
});

// 2. Load more restaurants (POST)
app.post("/api/restaurants/update", async (req, res) => {
  const targetUrl = "https://www.swiggy.com/dapi/restaurants/list/update";

  try {
    const data = await fetchFromSwiggy(targetUrl, {
      method: "POST",
      body: req.body,
    });

    if (data.error) {
      console.warn("Got non-JSON from Swiggy:", data.raw);
      return res.status(500).json({ error: "Failed to load more restaurants", details: data.raw });
    }

    console.log("Successfully fetched more restaurants batch");
    res.json(data);
  } catch (error) {
    console.error("Update restaurants fetch error:", error);
    res.status(500).json({ error: "Failed to fetch more restaurants via Puppeteer" });
  }
});

// 3. Menu list (GET)
app.get("/api/menu/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params;
  const lat = req.query.lat || "12.9352403";
  const lng = req.query.lng || "77.624532";
  const targetUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`;

  try {
    const data = await fetchFromSwiggy(targetUrl);

    if (data.error) {
      console.warn("Got non-JSON from Swiggy:", data.raw);
      return res.status(500).json({ error: "Swiggy challenge not passed yet", details: data.raw });
    }

    console.log(`Successfully fetched live menu for restaurant ${restaurantId}`);
    res.json(data);
  } catch (error) {
    console.error("Puppeteer fetch error:", error);
    res.status(500).json({ error: "Failed to fetch menu via Puppeteer" });
  }
});

app.listen(PORT, () => {
  console.log(`Automated Live Backend running at http://localhost:${PORT}`);
});