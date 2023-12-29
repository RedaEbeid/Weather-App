import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// AXIOS LIBRARY
import axios from 'axios';

export const fetchWeather = createAsyncThunk("watherApi/fetchWeather",async () => {
  console.log("Calling Fetch weather");
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather?lat=30.0444&lon=31.2357&appid=d08e579acfc36185d10a445ff58e0ab9"
  );

  // handle success
  let temperature = Math.round(response.data.main.temp - 272.15);
  let min = Math.round(response.data.main.temp_min - 272.15);
  let max = Math.round(response.data.main.temp_max - 272.15);
  let description = response.data.weather[0].description;;
  let icon = response.data.weather[0].icon;

  console.log(response);
    return { temperature, min, max, description, icon: `https://openweathermap.org/img/wn/${icon}@2x.png` };
});



const weatherApiSlice = createSlice({

    name: 'weatherApi',

    initialState: {
        result: 'Empty',
        weather: {},
        isLoading: false
    },

    reducers: {
        changeResult: (state, action) => {
            state.result = 'changed';
        }
    },

    extraReducers (builder) {
        builder.addCase(fetchWeather.pending, (state, action)=> {
            state.isLoading = true;
        }).addCase(fetchWeather.fulfilled, (state, action)=> {
            state.isLoading = false;
            console.log(state,action);
            state.weather = action.payload;
        })
    }
});

export const { changeResult } = weatherApiSlice.actions;
export default weatherApiSlice.reducer;