import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface ISeminar {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
}

interface ISeminarState {
  seminars: ISeminar[];
  loading: boolean;
  error: string | null;
}

const initialState: ISeminarState = {
  seminars: [],
  loading: false,
  error: null,
};

// Асинхронная санка для получения данных семинаров

export const fetchSeminars = createAsyncThunk(
  "seminars/fetchSeminars",
  async () => {
    const response = await axios.get("http://localhost:3001/seminars");
    return response.data;
  }
);

// Асинхронный санка для удаления семинара

export const deleteSeminar = createAsyncThunk(
  "seminars/deleteSeminar",
  async (id: number) => {
    await axios.delete(`http://localhost:3001/seminars/${id}`);
    return id;
  }
);

// Асинхронный санка для обновления семинара

export const updateSeminar = createAsyncThunk<ISeminar, ISeminar>(
  "seminars/updateSeminar",
  async (updatedSeminar: ISeminar) => {
    await axios.put(
      `http://localhost:3001/seminars/${updatedSeminar.id}`,
      updatedSeminar
    );
    return updatedSeminar;
  }
);

const seminarsSlice = createSlice({
  name: "seminars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeminars.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSeminars.fulfilled,
        (state, action: PayloadAction<ISeminar[]>) => {
          state.seminars = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchSeminars.rejected, (state) => {
        state.loading = false;
        state.error = "Ошибка загрузки";
      })
      .addCase(
        deleteSeminar.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.seminars = state.seminars.filter(
            (seminar: ISeminar) => seminar.id !== action.payload
          );
        }
      )
      .addCase(
        updateSeminar.fulfilled,
        (state, action: PayloadAction<ISeminar>) => {
          state.seminars = state.seminars.map((seminar: ISeminar) =>
            seminar.id === action.payload.id ? action.payload : seminar
          );
        }
      );
  },
});

export default seminarsSlice.reducer;
