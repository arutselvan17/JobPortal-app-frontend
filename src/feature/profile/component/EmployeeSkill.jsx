import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSkillsThunk,
  updateSkillThunk,
  deleteSkillThunk,
} from "../slice/ProfileSlice";

import "../styles/EmployeeSkill.css";

export default function EmployeeSkill({ profile }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.profile);

  const [newSkillName, setNewSkillName] = useState("");
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [editingSkillName, setEditingSkillName] = useState("");

  const handleAdd = () => {
    if (!newSkillName.trim()) return;
    dispatch(addSkillsThunk([{ skillName: newSkillName }]));
    setNewSkillName("");
  };

  const handleUpdate = (skillId) => {
    dispatch(
      updateSkillThunk({ skillId, skillDTO: { skillName: editingSkillName } }),
    );
    setEditingSkillId(null);
    setEditingSkillName("");
  };

  const handleDelete = (skillId) => {
    dispatch(deleteSkillThunk(skillId));
  };

  return (
    <div className="skill-section">
      <h3>Skills</h3>

      <div className="skill-list">
        {profile.skills &&
          profile.skills.map((skill) => (
            <div key={skill.skillId} className="skill-card">
              {editingSkillId === skill.skillId ? (
                <>
                  <input
                    className="skill-input"
                    value={editingSkillName}
                    onChange={(e) => setEditingSkillName(e.target.value)}
                  />

                  <i
                    className="bi bi-check-lg skill-icon save"
                    onClick={() => handleUpdate(skill.skillId)}
                  ></i>

                  <i
                    className="bi bi-x-lg skill-icon cancel"
                    onClick={() => setEditingSkillId(null)}
                  ></i>
                </>
              ) : (
                <>
                  <span className="skill-name">{skill.skillName}</span>

                  <i
                    className="bi bi-pencil skill-icon edit"
                    onClick={() => {
                      setEditingSkillId(skill.skillId);
                      setEditingSkillName(skill.skillName);
                    }}
                  ></i>

                  <i
                    className="bi bi-trash skill-icon delete"
                    onClick={() => handleDelete(skill.skillId)}
                  ></i>
                </>
              )}
            </div>
          ))}
      </div>

      {/* Add */}
      <div className="skill-add">
        <input
          placeholder="Add skill"
          value={newSkillName}
          onChange={(e) => setNewSkillName(e.target.value)}
        />

        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}
