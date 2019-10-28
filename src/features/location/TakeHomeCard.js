import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'redux-starter-kit';

import { analyzeLocationInformation } from './locationSlice';
import Title from './Title';
import Distance from './Distance';
import Location from './Location';

const selectLocationState = state => state.location
const selectLoading = createSelector(selectLocationState, ({loading}) => loading)
const selectIsInUSA = createSelector(selectLocationState, ({isInUSA}) => isInUSA)
const selectLocation = createSelector(selectLocationState, ({location}) => location)
const selectHowFar = createSelector(selectLocationState, ({howFar}) => howFar)

const mapState = state => ({
  loading: selectLoading(state),
  isInUSA: selectIsInUSA(state),
  location: selectLocation(state),
  howFar: selectHowFar(state),
})

const mapDispatch = { analyzeLocationInformation }

function TakeHomeCard({ loading, isInUSA, location, howFar, analyzeLocationInformation }) {
  useEffect(() => {
    async function run() {
      analyzeLocationInformation();
    }

    run();
  }, [analyzeLocationInformation])

  if (loading) {
    return <div className="TakeHomeCard">Loading...</div>
  }

  const titleText = isInUSA ? "You're where you should be!" : "Pack your bags!";

  return (
    <div className="TakeHomeCard">
      <Title text={titleText} />
      <Distance howFar={howFar} />
      <Location text={location} />
    </div>
  );
}

export default connect(
  mapState,
  mapDispatch,
)(TakeHomeCard);
