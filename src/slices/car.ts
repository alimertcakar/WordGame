// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "src/store";

// type Token = string | null;

// export interface IAuthState {
//   token: Token;
//   userData: any;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: IAuthState = {
//   token: null,
//   userData: null,
//   loading: false,
//   error: null,
// };

// export const girisYap = createAsyncThunk(
//   "Kullanici/GirisYap",
//   async (args: any, { rejectWithValue }) => {
//     const { nick, parola } = args;
//     try {
//       const res = await kullanici.girisYap(nick, parola);
//       return res;
//     } catch (err) {
//       throw new Error(err.message);
//     }
//   }
// );

// export const carSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     cikisYap: (state, action: PayloadAction) => {
//       state.token = null;
//       state.userData = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(girisYap.pending, (state, action) => {
//       state.loading = true;
//     });
//     builder.addCase(girisYap.fulfilled, (state, action) => {
//       state.error = null;
//       state.loading = false;
//       state.token = action.payload.Token;
//       state.userData = action.payload.Data!;
//     });
//     builder.addCase(girisYap.rejected, (state, action) => {
//       state.error = action.error.message || null;
//       state.loading = false;
//     });
//   },
// });

// export const { cikisYap } = carSlice.actions;

// export const authSelector = (state: RootState) => state.auth;

// export default carSlice.reducer;

export {};
