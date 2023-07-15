import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  urls: [],
};

const urlSlice = createSlice({
  name: "urls",
  initialState,
  reducers: {
    addShortenedUrl: (state, action) => {
      const { id, originalUrl, shortUrl } = action.payload;
      state.urls.push({ id, originalUrl, shortUrl });
    },
  },
});

export const { addShortenedUrl } = urlSlice.actions;
export default urlSlice.reducer;
