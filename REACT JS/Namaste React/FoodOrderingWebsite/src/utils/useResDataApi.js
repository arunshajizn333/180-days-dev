import { useEffect, useState, useCallback, useRef } from "react";
import { CORS_FIX, ResApiCards, ResApiUpdate, LATITUDE, LONGITUDE } from "../utils/constants.js";

// Helper function to extract restaurant cards from diverse card formats in Swiggy's response
const extractRestaurantsFromCards = (cards) => {
  if (!Array.isArray(cards)) return [];
  const list = [];

  for (const cardItem of cards) {
    // 1. Grid of restaurants (common format)
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

    // 3. Nested restaurants list
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
      const response = await fetch(ResApiCards);

      if (!response.ok) {
        throw new Error("Unable to load restaurants.");
      }

      const json = await response.json();

      // Find restaurant card dynamically or fallback to cards[1] / cards[2]
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

      // Extract pagination & seo details from initial response
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

      const response = await fetch(ResApiUpdate, {
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

      // Update pagination information from latest response
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