import React, {useEffect, useState} from 'react';
import './App.css';

import LocationService from './services/location'
import Title from './components/Title';
import Distance from './components/Distance';
import Location from './components/Location';


function App() {
  const [loading, setLoading] = useState(false)
  const [isInUSA, setIsInUSA] = useState(false)
  const [location, setLocation] = useState('')
  const [howFar, setHowFar] = useState(0)

  useEffect(() => {
    const run = async () => {
      setLoading(true)
  
      const {isInUSA, location, howFar} = await LocationService.analyzeLocationInformation()
      setIsInUSA(isInUSA)
      setLocation(location)
      setHowFar(howFar)
  
      setLoading(false)
    }
    run()
  }, [])

  if (loading) {
    return <div className="App">Loading...</div>
  }

  const titleText = isInUSA ? "You're where you should be!" : "Pack your bags!";

  return (
    <div className="App">
      <Title text={titleText} />
      <Distance howFar={howFar} />
      <Location text={location} />
    </div>
  );
}

export default App;
