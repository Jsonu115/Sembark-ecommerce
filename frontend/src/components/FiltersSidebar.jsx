import React from "react";

export const FiltersSidebar = ({
  search,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <aside className="filters-card">
      <h2 className="filters-title">Filters</h2>

      <div className="filters-section">
        <span className="filters-section-label">Search</span>
        <input
          type="text"
          className="filters-search-input"
          placeholder="Search products..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filters-section">
        <span className="filters-section-label">Category</span>
        <div className="filters-checkboxes">
          <label className="filters-checkbox">
            <input
              type="radio"
              checked={activeCategory === null}
              onChange={() => onCategoryChange(null)}
            />
            <span>All</span>
          </label>
          {categories.map((cat) => (
            <label key={cat} className="filters-checkbox">
              <input
                type="radio"
                checked={activeCategory === cat}
                onChange={() => onCategoryChange(cat)}
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};
