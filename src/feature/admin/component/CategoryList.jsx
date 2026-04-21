import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, deleteCategoryById } from "../slice/CategorySlice";
import CategoryCard from "./CategoryCard";
import AddCategory from "./AddCategory";
import "./CategoryList.css";
import { updateCategoryById } from "../slice/CategorySlice";

export default function CategoryList() {
  const dispatch = useDispatch();

  const categoryState = useSelector((state) => state.category);

  const { categories, loading, error } = categoryState || {
    categories: [],
    loading: false,
    error: null,
  };

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteCategoryById(id));
  };

  const handleUpdate = (updatedCategory) => {
    dispatch(
      updateCategoryById({
        id: updatedCategory.id,
        data: { name: updatedCategory.name },
      }),
    );
  };

  //  Filter
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="category-container">
      {/*  TOP FLEX ROW */}
      <div className="top-bar">
        <AddCategory />

        <div className="search-box">
          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />

          {search && (
            <button className="clear-btn" onClick={() => setSearch("")}>
              ✕
            </button>
          )}
        </div>
      </div>

      <h2>Categories</h2>

      <div className="category-grid">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>No matching categories</p>
        )}
      </div>
    </div>
  );
}
