
import { useParams } from "react-router";
import { useState } from "react";
import useResMenuApi from "../../utils/useResMenuApi.js";
import Catagories from "./Catagories.js";

const AccordianResPage = () => {
  const { resId } = useParams();
  const resInfo = useResMenuApi(resId);

  // Stores the index of the currently open category
  const [showItems, setShowItems] = useState(0);

  const restaurentInfo =
    resInfo?.cards?.[2]?.card?.card?.info || {};

  const {
    name,
    costForTwoMessage,
    cuisines,
    city,
  } = restaurentInfo;

  const menuCards =
    resInfo?.cards?.[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  const categories = menuCards.filter(
    (menu) =>
      menu.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      {/* Restaurant information */}
      <div className="mx-auto my-8 max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="mb-2 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {name}
        </h1>

        <h4 className="mb-3 text-center text-sm font-medium text-gray-500">
          {city}
        </h4>

        <h4 className="mb-4 text-center text-sm text-gray-600">
          {cuisines?.join(", ")}
        </h4>

        <div className="flex justify-center">
          <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">
            {costForTwoMessage}
          </span>
        </div>
      </div>

      {/* Menu categories */}
      <div className="mx-auto max-w-3xl">
        {categories.map((menu, index) => (
          <Catagories
            key={menu.card.card.title}
            data={menu.card.card}
            isOpen={showItems === index}
            onClick={() =>
              setShowItems((previous) =>
                previous === index ? -1 : index
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

export default AccordianResPage;
