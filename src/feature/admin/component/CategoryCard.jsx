import React, { useState } from "react";
import "./CategoryCard.css";


export default function CategoryCard({ category, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(category.name);

  const handleSave = () => {
    if (!newName.trim()) return;

    onUpdate({
      id: category.id,
      name: newName,
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewName(category.name);
  };

  return (
    <div className="category-card">

      {isEditing ? (
        <>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="edit-input"
          />

          <div className="btn-group">
            <button className="update-btn" onClick={handleSave}>
              Save
            </button>

            <button className="delete-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3>{category.name}</h3>

          <div className="btn-group">
            <button
              className="update-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => onDelete(category.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}