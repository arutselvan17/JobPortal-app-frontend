import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMyProfile,
  updateMyProfile,
  addSkills,
  updateSkill,
  deleteSkill,
  addEducations,
  updateEducation,
  deleteEducation,
  addCompanyInfo,
  updateCompanyInfo,
} from "../service/ProfileService";

// Fetch profile
export const fetchMyProfile = createAsyncThunk(
  "profile/fetchMyProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMyProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load profile",
      );
    }
  },
);

// Update personal info
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await updateMyProfile(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile",
      );
    }
  },
);

// Add skills
export const addSkillsThunk = createAsyncThunk(
  "profile/addSkills",
  async (skills, { rejectWithValue }) => {
    try {
      const response = await addSkills(skills);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add skill",
      );
    }
  },
);

// Update skill
export const updateSkillThunk = createAsyncThunk(
  "profile/updateSkill",
  async ({ skillId, skillDTO }, { rejectWithValue }) => {
    try {
      const response = await updateSkill(skillId, skillDTO);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update skill",
      );
    }
  },
);

// Delete skill
export const deleteSkillThunk = createAsyncThunk(
  "profile/deleteSkill",
  async (skillId, { rejectWithValue }) => {
    try {
      const response = await deleteSkill(skillId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete skill",
      );
    }
  },
);

// Add educations
export const addEducationsThunk = createAsyncThunk(
  "profile/addEducations",
  async (educations, { rejectWithValue }) => {
    try {
      const response = await addEducations(educations);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add education",
      );
    }
  },
);

// Update education
export const updateEducationThunk = createAsyncThunk(
  "profile/updateEducation",
  async ({ educationId, educationDTO }, { rejectWithValue }) => {
    try {
      const response = await updateEducation(educationId, educationDTO);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update education",
      );
    }
  },
);

// Delete education
export const deleteEducationThunk = createAsyncThunk(
  "profile/deleteEducation",
  async (educationId, { rejectWithValue }) => {
    try {
      const response = await deleteEducation(educationId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete education",
      );
    }
  },
);

// Add company info
export const addCompanyThunk = createAsyncThunk(
  "profile/addCompany",
  async (companyDTO, { rejectWithValue }) => {
    try {
      const response = await addCompanyInfo(companyDTO);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add company",
      );
    }
  },
);

// Update company info
export const updateCompanyThunk = createAsyncThunk(
  "profile/updateCompany",
  async (companyDTO, { rejectWithValue }) => {
    try {
      const response = await updateCompanyInfo(companyDTO);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update company",
      );
    }
  },
);

const initialState = {
  profile: null,
  error: null,
  loading: false,
  updateSuccess: false,
};

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchMyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchMyProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Update personal info
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
        state.updateSuccess = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Add skill
      .addCase(addSkillsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSkillsThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(addSkillsThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Update skill
      .addCase(updateSkillThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSkillThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(updateSkillThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Delete skill
      .addCase(deleteSkillThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSkillThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(deleteSkillThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Add education
      .addCase(addEducationsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEducationsThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(addEducationsThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Update education
      .addCase(updateEducationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEducationThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(updateEducationThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Delete education
      .addCase(deleteEducationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEducationThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(deleteEducationThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Add company
      .addCase(addCompanyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCompanyThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(addCompanyThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Update company
      .addCase(updateCompanyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompanyThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(updateCompanyThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearUpdateSuccess } = ProfileSlice.actions;
export default ProfileSlice.reducer;
