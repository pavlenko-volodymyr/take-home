import { createSlice } from 'redux-starter-kit';

import LocationService from '../../services/location';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    loading: false,
    isInUSA: false,
    location: '',
    howFar: 0
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setIsInUSA(state, action) {
      state.isInUSA = action.payload;
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
    setHowFar(state, action) {
      state.howFar = action.payload;
    },
  }
});

export default locationSlice.reducer;

export const analyzeLocationInformation = () => async dispatch => {
  dispatch(locationSlice.actions.setLoading(true));

  const { isInUSA, location, howFar } = await LocationService.analyzeLocationInformation();
  dispatch(locationSlice.actions.setIsInUSA(isInUSA))
  dispatch(locationSlice.actions.setLocation(location))
  dispatch(locationSlice.actions.setHowFar(howFar))

  dispatch(locationSlice.actions.setLoading(false));
}
