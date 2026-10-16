# 🚀 Complete Guide: Infinite Scroll & Puppeteer Backend Proxy in React

A comprehensive reference and walkthrough of how we implemented **Infinite Scrolling** with `IntersectionObserver` and built a **Puppeteer-backed Express Proxy** to bypass CORS and Cloudflare/Akamai bot detection.

---

## 📌 Table of Contents
1. [Architecture Overview](#1-architecture-overview)
2. [Why We Moved from Free CORS Proxies to Backend](#2-why-we-moved-from-free-cors-proxies-to-backend)
3. [Full Code for Every File](#3-full-code-for-every-file)
   - [File 1: Backend (`foodie-backend/server.js`)](#file-1-foodie-backendserverjs)
   - [File 2: Frontend Constants (`constants.js`)](#file-2-foodorderingwebsitesrcutilsconstantsjs)
   - [File 3: Data Fetching Hook (`useResDataApi.js`)](#file-3-foodorderingwebsitesrcutilsuseresdataapijs)
   - [File 4: UI & Observer (`RestaurantSection.js`)](#file-4-foodorderingwebsitesrccomponentsrestaurantsectionjs)
   - [File 5: Card Component HOC (`RestaurantCard.js`)](#file-5-foodorderingwebsitesrccomponentsrestaurantcardjs)
4. [Critical Bugs We Solved (Interview & Real-World Lessons)](#4-critical-bugs-we-solved)
5. [How to Run Everything Locally](#5-how-to-run-everything-locally)

---

## 1. Architecture Overview

```
[ User scrolls down the page ]
               │
               ▼
[ IntersectionObserver sentinel in RestaurantSection.js ]
               │ (Fires when sentinel enters viewport with 300px rootMargin)
               ▼
[ loadMoreRestaurants() in useResDataApi.js ]
               │ (Dispatches POST with nextOffset & widgetOffset)
               ▼
[ Local Backend at http://localhost:5000/api/restaurants/update ]
               │ (Executes inside active Puppeteer browser session on swiggy.com)
               ▼
[ Swiggy Official API ]
               │
               ▼
[ Backend extracts JSON & returns next batch + updated nextOffset ]
               │
               ▼
[ React hook deduplicates restaurants by ID & appends to state ]
```

---

## 2. Why We Moved from Free CORS Proxies to Backend

| Problem with Free CORS Proxies (`corsfix`, `cors-anywhere`) | Solution with Our Backend |
| :--- | :--- |
| **CORS Errors**: Browsers enforce same-origin policy. | **No CORS**: CORS only exists in browsers. Server-to-server requests are never restricted. |
| **Rate Limits (`429 Too Many Requests`)**: Free proxies block your IP after 20–30 requests. | **No Proxy Rate Limits**: Direct communication without 3rd-party proxy throttling. |
| **POST Request Issues**: Many proxies drop or block POST request payloads. | **Full Control**: Express forwards whatever JSON payload Swiggy requires. |
| **Cloudflare / Akamai WAF Bot Challenges**: Swiggy challenges automated HTTP calls. | **Puppeteer Session**: The backend launches Chromium once, solves/bypasses the challenge, and makes all requests from inside the genuine browser session. |

---

## 3. Full Code for Every File

### File 1: `foodie-backend/server.js`

```javascript
const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // Required to parse JSON POST bodies (req.body)

let browserInstance = null;
let pageInstance = null;

// Launch headless Chromium once and keep session alive
async function getPage() {
  if (!browserInstance) {
    browserInstance = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-blink-features=AutomationControlled", // Hides the navigator.webdriver bot flag
      ],
    });
  }

  if (!pageInstance || pageInstance.isClosed()) {
    pageInstance = await browserInstance.newPage();

    await pageInstance.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    );

    console.log("Initializing Swiggy browser session...");
    await pageInstance.goto("https://www.swiggy.com", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    console.log("Session ready!");
  }

  return pageInstance;
}

// Reusable helper: executes fetch directly in Swiggy's origin context
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
```

---

### File 2: `FoodOrderingWebsite/src/utils/constants.js`

```javascript
export const IMAGE_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export const ResApiCards = "http://localhost:5000/api/restaurants";
export const ResApiUpdate = "http://localhost:5000/api/restaurants/update";

export const LATITUDE = 12.9352403;
export const LONGITUDE = 77.624532;

// Empty string because requests go directly to our local backend on port 5000
export const CORS_FIX = "";
```

---

### File 3: `FoodOrderingWebsite/src/utils/useResDataApi.js`

```javascript
import { useEffect, useState, useCallback, useRef } from "react";
import { CORS_FIX, ResApiCards, ResApiUpdate, LATITUDE, LONGITUDE } from "../utils/constants.js";

// Helper to extract restaurant cards across Swiggy's varying card schemas
const extractRestaurantsFromCards = (cards) => {
  if (!Array.isArray(cards)) return [];
  const list = [];

  for (const cardItem of cards) {
    // 1. Standard grid of restaurants (in infoWithStyle)
    const gridRestos =
      cardItem?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
      cardItem?.card?.gridElements?.infoWithStyle?.restaurants;
    if (Array.isArray(gridRestos) && gridRestos.length > 0) {
      list.push(...gridRestos);
      continue;
    }

    // 2. Individual restaurant card
    if (cardItem?.card?.card?.info?.id) {
      list.push(cardItem.card.card);
      continue;
    }

    // 3. Nested restaurants array
    if (Array.isArray(cardItem?.card?.card?.restaurants)) {
      list.push(...cardItem.card.card.restaurants);
    }
  }

  return list;
};

const useResDataApi = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [resList, setResList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [loadMoreError, setLoadMoreError] = useState(null);

  const [paginationInfo, setPaginationInfo] = useState({
    nextOffset: null,
    widgetOffset: {},
    seoParams: {},
  });

  // Ref lock to completely prevent duplicate simultaneous network calls
  const isFetchingMoreRef = useRef(false);

  const fetchData = async () => {
    const shimmerStartedAt = Date.now();
    const minimumShimmerDuration = 350;

    setIsLoading(true);
    setFetchError("");
    setLoadMoreError(null);

    try {
      const response = await fetch(CORS_FIX + ResApiCards);

      if (!response.ok) {
        throw new Error("Unable to load restaurants.");
      }

      const json = await response.json();

      // Find the card containing the restaurant grid
      const restoCard = json?.data?.cards?.find(
        (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );

      const restaurants =
        restoCard?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
        json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
        json?.data?.cards?.[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
        [];

      setRestaurantList(restaurants);
      setResList(restaurants);

      // Extract pagination details for infinite scrolling
      const pageOffset =
        json?.data?.pageOffset ||
        json?.data?.cards?.find((c) => c?.pageOffset)?.pageOffset;

      const nextOffset =
        pageOffset?.nextOffset ||
        json?.data?.nextOffset ||
        null;

      const widgetOffset =
        pageOffset?.widgetOffset ||
        json?.data?.widgetOffset ||
        {};

      const seoParams =
        json?.data?.seoParams ||
        pageOffset?.seoParams ||
        {};

      setPaginationInfo({
        nextOffset,
        widgetOffset,
        seoParams,
      });

      if (!nextOffset) {
        setHasMore(false);
      }
    } catch (error) {
      setFetchError(error.message);
    } finally {
      const elapsed = Date.now() - shimmerStartedAt;
      const remainingShimmerTime = Math.max(0, minimumShimmerDuration - elapsed);

      await new Promise((resolve) => setTimeout(resolve, remainingShimmerTime));
      setIsLoading(false);
    }
  };

  const loadMoreRestaurants = useCallback(async () => {
    // Avoid calls when no offset, already fetching, no more items, or during initial loading
    if (
      !paginationInfo.nextOffset ||
      isFetchingMoreRef.current ||
      !hasMore ||
      isLoading
    ) {
      return;
    }

    isFetchingMoreRef.current = true;
    setIsLoadingMore(true);
    setLoadMoreError(null);

    try {
      const payload = {
        lat: LATITUDE,
        lng: LONGITUDE,
        nextOffset: paginationInfo.nextOffset,
        widgetOffset: paginationInfo.widgetOffset || {},
        filters: {},
        seoParams: paginationInfo.seoParams || {},
        page_type: "DESKTOP_WEB_LISTING",
        _csrf: "",
      };

      const response = await fetch(CORS_FIX + ResApiUpdate, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Rate limit reached. Please wait a moment and click Retry.");
        }
        throw new Error(`Failed to load more restaurants (Status: ${response.status})`);
      }

      const json = await response.json();
      const newRestaurants = extractRestaurantsFromCards(json?.data?.cards);

      if (newRestaurants.length > 0) {
        const appendUnique = (prevList) => {
          const existingIds = new Set(prevList.map((r) => r?.info?.id));
          const uniqueNew = newRestaurants.filter((r) => !existingIds.has(r?.info?.id));
          return [...prevList, ...uniqueNew];
        };

        setRestaurantList((prev) => appendUnique(prev));
        setResList((prev) => appendUnique(prev));
      }

      // Update pagination tokens for next trigger
      const pageOffset =
        json?.data?.pageOffset ||
        json?.data?.cards?.find((c) => c?.pageOffset)?.pageOffset;

      const newNextOffset =
        pageOffset?.nextOffset ||
        json?.data?.nextOffset ||
        null;

      const newWidgetOffset =
        pageOffset?.widgetOffset ||
        json?.data?.widgetOffset ||
        paginationInfo.widgetOffset;

      const newSeoParams =
        json?.data?.seoParams ||
        pageOffset?.seoParams ||
        paginationInfo.seoParams;

      setPaginationInfo({
        nextOffset: newNextOffset,
        widgetOffset: newWidgetOffset,
        seoParams: newSeoParams,
      });

      if (!newNextOffset || newRestaurants.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      setLoadMoreError(error.message || "Failed to load more restaurants");
    } finally {
      setIsLoadingMore(false);
      isFetchingMoreRef.current = false;
    }
  }, [paginationInfo, hasMore, isLoading]);

  const retryLoadMore = useCallback(() => {
    setLoadMoreError(null);
    setTimeout(() => {
      loadMoreRestaurants();
    }, 200);
  }, [loadMoreRestaurants]);

  useEffect(() => {
    fetchData();
  }, []);

  return {
    restaurantList,
    resList,
    fetchError,
    isLoading,
    isLoadingMore,
    loadMoreError,
    hasMore,
    loadMoreRestaurants,
    retryLoadMore,
  };
};

export default useResDataApi;
```

---

### File 4: `FoodOrderingWebsite/src/components/RestaurantSection.js`

```javascript
import React, { useEffect, useRef } from "react";
import RestaurantCard, { ResRatingCard } from "./RestaurantCard.js";
import { ShimmerCard } from "./Shimmers.js";
import { Link } from "react-router-dom";
import useResDataApi from "../utils/useResDataApi.js";

const RestaurantSection = ({ searchTerm = "" }) => {
  const {
    restaurantList,
    resList,
    fetchError,
    isLoading,
    isLoadingMore,
    loadMoreError,
    hasMore,
    loadMoreRestaurants,
    retryLoadMore,
  } = useResDataApi();

  const ResTopRatedCard = ResRatingCard(RestaurantCard);
  const observerTarget = useRef(null);

  // Keep references to latest state to avoid teardown/re-creation loops of IntersectionObserver
  const loadMoreRef = useRef(loadMoreRestaurants);
  loadMoreRef.current = loadMoreRestaurants;

  const statusRef = useRef({ hasMore, isLoadingMore, loadMoreError });
  statusRef.current = { hasMore, isLoadingMore, loadMoreError };

  const filteredRestaurants = resList.filter((res) => {
    if (!searchTerm || !searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase().trim();
    const nameMatch = res?.info?.name?.toLowerCase().includes(term);
    const cuisineMatch = res?.info?.cuisines?.some((c) =>
      c.toLowerCase().includes(term)
    );
    return nameMatch || cuisineMatch;
  });

  // Setup observer when initial restaurants finish loading
  useEffect(() => {
    if (isLoading) return; // Wait until initial data is loaded and DOM element is rendered

    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const { hasMore, isLoadingMore, loadMoreError } = statusRef.current;
        if (entries[0]?.isIntersecting && hasMore && !isLoadingMore && !loadMoreError) {
          console.log("Observer intersecting: loading next batch of restaurants...");
          loadMoreRef.current();
        }
      },
      {
        rootMargin: "300px", // Trigger 300px before user hits bottom for smooth loading
        threshold: 0.1,
      }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
      observer.disconnect();
    };
  }, [isLoading]); // Runs as soon as initial load finishes

  return (
    <section className="res-section" aria-label="Popular Restaurants">
      <div className="res-header">
        <h2 className="res-title">Popular Restaurants</h2>

        <a href="#all" className="see-all-link">
          See All <span className="see-all-arrow">→</span>
        </a>
      </div>

      {fetchError && <p className="res-error">{fetchError}</p>}

      <div className="res-grid" role="region" aria-label="Restaurant list">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <ShimmerCard key={`shimmer-card-${index}`} />
          ))
        ) : filteredRestaurants.length === 0 ? (
          <div className="no-res-found">
            <p>No restaurants found matching &quot;{searchTerm}&quot;.</p>
          </div>
        ) : (
          filteredRestaurants.map((res) => (
            <Link
              to={`/restaurentMenu/${res.info.id}`}
              key={res.info.id}
              className="res-card-link"
            >
              {res.info.avgRating >= 4.3 ? (
                <ResTopRatedCard restaurantData={res} />
              ) : (
                <RestaurantCard restaurantData={res} />
              )}
            </Link>
          ))
        )}
      </div>

      {/* Infinite Scroll Trigger & Loading Indicator */}
      {!isLoading && (
        <div
          ref={observerTarget}
          className="w-full py-8 flex flex-col items-center justify-center min-h-[70px]"
        >
          {isLoadingMore && (
            <div className="flex items-center gap-3 text-neutral-600 font-medium">
              <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Loading more restaurants...</span>
            </div>
          )}

          {loadMoreError && (
            <div className="flex flex-col items-center gap-2 py-2">
              <p className="text-amber-600 text-sm font-medium">{loadMoreError}</p>
              <button
                type="button"
                onClick={retryLoadMore}
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-full shadow transition-all duration-200 cursor-pointer"
              >
                Retry Loading
              </button>
            </div>
          )}

          {!hasMore && resList.length > 0 && !loadMoreError && (
            <p className="text-neutral-400 text-sm">
              🎉 You&apos;ve explored all available restaurants!
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default RestaurantSection;
```

---

### File 5: `FoodOrderingWebsite/src/components/RestaurantCard.js`

```javascript
// Higher Order Component (HOC) for Top Rated Badge
export const ResRatingCard = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-neutral-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-lg pointer-events-none uppercase tracking-wider text-[11px]">
          <span>⭐</span> Top Rated
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
```

---

## 4. Critical Bugs We Solved

### Bug 1: The "1 of 32 errors on page" Loop
- **Cause**: `isLoadingMore` was initially placed inside `useEffect` dependencies: `[hasMore, isLoadingMore, ...]`. Every time a fetch started or completed, `isLoadingMore` toggled `false -> true -> false`. This caused React to tear down the observer and recreate it immediately. The new observer instantly fired because the user was still scrolled to the bottom, triggering **30+ POST requests in 1 second**.
- **Fix**: We used a React ref (`statusRef.current = { hasMore, isLoadingMore }`). The observer is created only once, and inspects the ref without triggering teardown/recreation cycles.

### Bug 2: "Why observer not working" (The Null Ref Bug)
- **Cause**: The sentinel `div` was rendered with `{!isLoading && <div ref={observerTarget} />}`. When the component first mounted, `isLoading` was `true`. Therefore, `observerTarget.current` was `null`. Because `useEffect` had an empty array `[]`, it checked `if (!target) return;` and terminated forever.
- **Fix**: Added `[isLoading]` as the dependency. When initial restaurants load and `isLoading` switches to `false`, the effect runs again, finds the mounted DOM node, and calls `observer.observe(target)`.

### Bug 3: `GET http://localhost:5000/api/restaurants 404 (Not Found)`
- **Cause**: Node.js does not auto-restart when code is edited. An old Node process was running from 2 hours prior when only `/api/menu` was defined.
- **Fix**: Killed the old process and launched with `node --watch server.js` (native file-watching in Node 18+).

### Bug 4: `CORS_FIX + ResApiCards` requesting `proxy.corsfix.com/?http://localhost:5000`
- **Cause**: `CORS_FIX` had `"https://proxy.corsfix.com/?"`. When prefixed to `http://localhost:5000`, the public internet proxy failed because external servers cannot access your local machine's `localhost`.
- **Fix**: Set `CORS_FIX = ""` in `constants.js`.

---

## 5. How to Run Everything Locally

### Terminal 1: Backend Server
```bash
cd "d:\180-days-dev\REACT JS\Namaste React\foodie-backend"
node --watch server.js
```
*(Runs on `http://localhost:5000` with automatic reloads when `server.js` changes)*

### Terminal 2: Frontend App
```bash
cd "d:\180-days-dev\REACT JS\Namaste React\FoodOrderingWebsite"
npm start
```
*(Runs on `http://localhost:1234`)*
