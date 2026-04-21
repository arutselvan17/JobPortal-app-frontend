import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEducationsThunk,
  updateEducationThunk,
  deleteEducationThunk,
} from "../slice/ProfileSlice";

import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/EmployeeEducation.css";

const emptyForm = {
  educationName: "",
  schoolName: "",
  startingDate: "",
  endingDate: "",
};

export default function EmployeeEducation({ profile }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.profile);

  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(emptyForm);

  const handleAdd = () => {
    if (!addForm.educationName || !addForm.schoolName) return;
    dispatch(addEducationsThunk([addForm]));
    setAddForm(emptyForm);
    setShowAddForm(false);
  };

  const handleUpdate = (id) => {
    dispatch(updateEducationThunk({ educationId: id, educationDTO: editForm }));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteEducationThunk(id));
  };

  return (
    <div className="edu-section">
      <h3>Education</h3>

      {/* LIST */}
      <div className="edu-list">
        {profile.educations?.map((edu) => (
          <div key={edu.educationId} className="edu-card">

            {editingId === edu.educationId ? (
              <div className="edu-form">
                <input
                  placeholder="Degree"
                  value={editForm.educationName}
                  onChange={(e) =>
                    setEditForm({ ...editForm, educationName: e.target.value })
                  }
                />
                <input
                  placeholder="School"
                  value={editForm.schoolName}
                  onChange={(e) =>
                    setEditForm({ ...editForm, schoolName: e.target.value })
                  }
                />
                <input
                  type="date"
                  value={editForm.startingDate}
                  onChange={(e) =>
                    setEditForm({ ...editForm, startingDate: e.target.value })
                  }
                />
                <input
                  type="date"
                  value={editForm.endingDate}
                  onChange={(e) =>
                    setEditForm({ ...editForm, endingDate: e.target.value })
                  }
                />

                <div className="edu-actions">
                  <i
                    className="bi bi-check-lg icon save"
                    onClick={() => handleUpdate(edu.educationId)}
                  ></i>
                  <i
                    className="bi bi-x-lg icon cancel"
                    onClick={() => setEditingId(null)}
                  ></i>
                </div>
              </div>
            ) : (
              <>
                <div className="edu-info">
                  <span className="edu-degree">{edu.educationName}</span>
                  <span className="edu-school">{edu.schoolName}</span>
                  <span className="edu-date">
                    {edu.startingDate} → {edu.endingDate}
                  </span>
                </div>

                <div className="edu-actions">
                  <i
                    className="bi bi-pencil icon edit"
                    onClick={() => {
                      setEditingId(edu.educationId);
                      setEditForm(edu);
                    }}
                  ></i>

                  <i
                    className="bi bi-trash icon delete"
                    onClick={() => handleDelete(edu.educationId)}
                  ></i>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* ADD */}
      {showAddForm ? (
        <div className="edu-add">
          <input
            placeholder="Degree"
            value={addForm.educationName}
            onChange={(e) =>
              setAddForm({ ...addForm, educationName: e.target.value })
            }
          />
          <input
            placeholder="School"
            value={addForm.schoolName}
            onChange={(e) =>
              setAddForm({ ...addForm, schoolName: e.target.value })
            }
          />
          <input
            type="date"
            value={addForm.startingDate}
            onChange={(e) =>
              setAddForm({ ...addForm, startingDate: e.target.value })
            }
          />
          <input
            type="date"
            value={addForm.endingDate}
            onChange={(e) =>
              setAddForm({ ...addForm, endingDate: e.target.value })
            }
          />

          <button onClick={handleAdd} disabled={loading}>
            Save
          </button>
        </div>
      ) : (
        <button className="primary-btn" onClick={() => setShowAddForm(true)}>
          + Add Education
        </button>
      )}
    </div>
  );
}