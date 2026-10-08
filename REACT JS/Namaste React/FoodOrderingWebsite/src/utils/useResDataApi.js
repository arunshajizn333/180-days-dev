import { useEffect, useState } from "react";
import { CORS_FIX, ResApiCards } from "../utils/constants.js";



const useResDataApi = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [resList, setResList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");



 const fetchdata = async () => {
    const shimmerStartedAt = Date.now();
    const minimumShimmerDuration = 350;

    setIsLoading(true);
    setFetchError("");

    try {
      const response = await fetch(CORS_FIX + ResApiCards);

      if (!response.ok) {
        throw new Error("Unable to load restaurants.");
      }

      const json = await response.json();
      const restaurants =
        json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
        json?.data?.cards?.[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
        [];

      setRestaurantList(restaurants);
      setResList(restaurants);
    } catch (error) {
      setFetchError(error.message);
    } finally {
      const elapsed = Date.now() - shimmerStartedAt;
      const remainingShimmerTime = Math.max(0, minimumShimmerDuration - elapsed);

      await new Promise((resolve) => setTimeout(resolve, remainingShimmerTime));
      setIsLoading(false);
    }
  };
 
   useEffect(() => {
    fetchdata();
  }, []);

  return {restaurantList,resList,fetchError,isLoading}
}

export default useResDataApi