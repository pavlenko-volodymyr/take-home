import React, {useEffect, useState} from 'react';
import './App.css';

async function getIp() {
  const response = await fetch('https://api.ipify.org/?format=json')
  const {ip} = await response.json()
  return ip
}

async function getLocationInfoByIp(ip) {
  const accessKey = '2af0a0b32371bbe4ea33cedc09c46c56'
  const url = `http://api.ipstack.com/${ip}?access_key=${accessKey}`
  const response = await fetch(url)
  const data = await response.json()
  const countryCode = data['country_code']
  const regionCode = data['region_code']
  const latitude = data['latitude']
  const longitude = data['longitude']
  return {countryCode, regionCode, coordinates: {lat: latitude, lng: longitude}}
}

function getIsInUSA(countryCode) {
  return countryCode === 'US'
}

async function getHowFarFromWashingtonDC(coordinates) {
  // mock distance value
  return 1000
}

async function analyzeLocationInformation() {
  const ip = await getIp()
  const {countryCode, regionCode, coordinates} = await getLocationInfoByIp(ip)
  const response = {
    isInUSA: null,
    location: `${regionCode}, ${countryCode}`,
    howFar: null
  }

  const isInUSA = getIsInUSA(countryCode)
  if (isInUSA) {
    response['isInUSA'] = true
    return response
  } else {
    const howFar = await getHowFarFromWashingtonDC(coordinates)
    response['isInUSA'] = false
    response['howFar'] = howFar
    return response
  }
}

function App() {
  const [loading, setLoading] = useState(false)
  const [isInUSA, setIsInUSA] = useState(false)
  const [location, setLocation] = useState('')
  const [howFar, setHowFar] = useState(0)

  useEffect(() => {
    const run = async () => {
      setLoading(true)
  
      const {isInUSA, location, howFar} = await analyzeLocationInformation()
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
  console.log({isInUSA})

  return (
    <div className="App">
      {isInUSA && <div>You're where you should be!</div>}
      {!isInUSA && <div>Pack your bags!</div>}
      {howFar && <div>You're {howFar} miles away from USA</div>}
      {location && <div>Location: {location}</div>}
    </div>
  );
}

export default App;
