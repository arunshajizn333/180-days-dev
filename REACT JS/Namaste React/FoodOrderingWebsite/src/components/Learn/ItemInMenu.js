import { IMAGE_URL } from "../../utils/constants";

const ItemInMenu = ({ data }) => {
  const imgUrl = `${IMAGE_URL}${data.imageId}`;

  return (
   <div className="flex items-start justify-between gap-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 transition hover:bg-slate-100">
      {/* Dish details */}
      <div className="min-w-0 flex-1 pt-1">
        {data.itemAttribute?.vegClassifier === "VEG" && (
          <span className="mb-2 inline-flex h-4 w-4 items-center justify-center border border-green-600">
            <span className="h-2 w-2 rounded-full bg-green-600" />
          </span>
        )}

        <h3 className="text-base font-semibold text-gray-800">
          {data.name}
        </h3>

        <p className="mt-1 text-sm font-medium text-gray-800">
          ₹{data.price / 100}
        </p>

        {data.ratings?.aggregatedRating?.rating && (
          <p className="mt-2 text-sm font-medium text-green-700">
            ★ {data.ratings.aggregatedRating.rating}
            <span className="ml-1 font-normal text-gray-500">
              ({data.ratings.aggregatedRating.ratingCount})
            </span>
          </p>
        )}

        {data.description && (
          <p className="mt-2 line-clamp-3 text-sm leading-5 text-gray-500">
            {data.description}
          </p>
        )}
      </div>

      {/* Image and Add button */}
      {data.imageId && (
        <div className="relative w-32 shrink-0 sm:w-36">
          <img
            className="h-28 w-full rounded-xl object-cover sm:h-32"
            src={imgUrl}
            alt={data.name}
            loading="lazy"
          />

          <button
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-lg border border-b-black bg-white px-8 py-2 text-sm font-bold uppercase text-green-700 shadow-sm transition hover:bg-green-50 active:scale-95"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemInMenu;