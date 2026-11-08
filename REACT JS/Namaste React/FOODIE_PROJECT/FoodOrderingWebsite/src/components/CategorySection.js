import { CATEGORIES } from "../utils/mockDatas";

const CategorySection = ({ selectedCategory = "all", onSelectCategory }) => {
  return (
    <div className="category-section" role="region" aria-label="Food categories">
      <div className="category-list">
        {CATEGORIES.map((cat) => (
          <label key={cat.id} className="category-item">
            <input
              type="radio"
              name="food-category"
              checked={selectedCategory === cat.id}
              onChange={() => onSelectCategory && onSelectCategory(cat.id, cat.name)}
              className="category-radio"
            />
            <div className="category-circle" style={{ backgroundColor: cat.bg }}>
              <span className="category-icon">{cat.icon}</span>
            </div>
            <span className="category-name">{cat.name}</span>
            <div className="category-indicator"></div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;