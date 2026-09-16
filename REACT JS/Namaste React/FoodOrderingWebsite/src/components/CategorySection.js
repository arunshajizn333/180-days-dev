import { CATEGORIES } from "../utils/mockDatas";

const CategorySection = () => (
  <div className="category-section">
    <div className="category-list">
      {CATEGORIES.map((cat, index) => (
        <label key={cat.id} className="category-item">
          <input
            type="radio"
            name="food-category"
            defaultChecked={index === 0}
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

export default CategorySection