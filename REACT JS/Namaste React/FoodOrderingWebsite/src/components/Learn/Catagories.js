
import ItemInMenu from "./ItemInMenu.js";

const Catagories = ({ data, isOpen, onClick }) => {
  return (
    <div className="my-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Category header */}
      <button
        type="button"
        onClick={onClick}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between bg-white px-5 py-5 text-left transition hover:bg-gray-50"
      >
        <h2 className="text-base font-bold text-gray-800 sm:text-lg">
          {data.title}
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({data.itemCards?.length || 0})
          </span>
        </h2>

        <span className="text-xl font-bold text-gray-600">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {/* Display dishes only when this category is open */}
      {isOpen && (
        <div className="border-t border-gray-100 px-4">
          {data.itemCards?.map((item) => (
            <ItemInMenu
              key={item.card.info.id}
              data={item.card.info}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Catagories;
