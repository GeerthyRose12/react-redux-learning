import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await api.get("students");
    console.log(response.data);
    return response.data;
  },
);

export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (studentData) => {
    const response = await api.post("students/", studentData);

    return response.data;
  },
);

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, studentData }) => {
    const response = await api.patch(`students/${id}/`, studentData);

    return response.data;
  },
);
export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    await api.delete(`students/${id}/`);

    return id;
  },
);

const initialState = {
  students: [],
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.push(action.payload);
      })

      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;

        state.error = action.error.message;
      })
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;

        const updatedStudent = action.payload;

        const index = state.students.findIndex(
          (student) => student.id === updatedStudent.id,
        );

        if (index !== -1) {
          state.students[index] = updatedStudent;
        }
      })

      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;

        state.error = action.error.message;
      })

      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;

        state.students = state.students.filter(
          (student) => student.id !== action.payload,
        );
      })

      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;

        state.error = action.error.message;
      });
  },
});

export default studentSlice.reducer;
