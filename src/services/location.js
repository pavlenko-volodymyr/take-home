import UtilsService from './utils';

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
  return {countryCode, regionCode, lat: latitude, lon: longitude}
}

function getIsInUSA(countryCode) {
  return countryCode === 'US'
}

async function getHowFarFromWashingtonDC(lat, lon) {
  const washingtonLat = 38.89511;
  const washingtonLon = -77.03637;
  return UtilsService.getDistanceFromLatLonInMiles(washingtonLat, washingtonLon, lat, lon)
}

async function analyzeLocationInformation() {
  const ip = await getIp()
  const {countryCode, regionCode, lat, lon} = await getLocationInfoByIp(ip)
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
    const howFar = await getHowFarFromWashingtonDC(lat, lon)
    response['isInUSA'] = false
    response['howFar'] = howFar
    return response
  }
}

export default {
  analyzeLocationInformation,
}