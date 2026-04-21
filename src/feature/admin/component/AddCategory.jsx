import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory, fetchCategories } from "../slice/CategorySlice";
import "./AddCategory.css";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    setError("");

    //  POST + REFETCH (important)
    await dispatch(createCategory({ name }));
    dispatch(fetchCategories());

    setName("");
  };

  return (
    <div className="add-category-container">
      <h3>Add Category</h3>

      <form onSubmit={handleSubmit} className="add-category-form">
        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="add-category-input"
        />

        <button type="submit" className="add-category-btn">
          Add
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}