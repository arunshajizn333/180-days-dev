import { useEffect, useState } from "react";


const useResMenuApi = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    setResInfo(null);

    if (!resId) {
      return;
    }

    const controller = new AbortController();

    const fetchMenu = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/menu/${resId}`, {
          signal: controller.signal,
        });
        if (response.ok) {
          const json = await response.json();
          setResInfo(json?.data);
          return;
        }
      } catch (error) {
        if (controller.signal.aborted) return;
        console.log("Local proxy not reachable, using fallback Swiggy menu");
      }

      try {
        const fallbackRes = await fetch(
          `https://proxy.corsfix.com/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId=${resId}`,
          { signal: controller.signal }
        );
        if (!fallbackRes.ok) {
          throw new Error(`Fallback menu request failed: ${fallbackRes.status}`);
        }
        const json = await fallbackRes.json();
        setResInfo(json?.data);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Failed to fetch menu:", error);
        }
      }
    };

    fetchMenu();
    return () => controller.abort();
  }, [resId]);

  return resInfo;
};

export default useResMenuApi