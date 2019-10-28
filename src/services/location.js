import UtilsService from './utils';
import ApiService from './api';

function getIsInUSA(countryCode) {
  return countryCode === 'US'
}

async function getHowFarFromWashingtonDC(lat, lon) {
  const washingtonLat = 38.89511;
  const washingtonLon = -77.03637;
  return UtilsService.getDistanceFromLatLonInMiles(washingtonLat, washingtonLon, lat, lon)
}

async function analyzeLocationInformation() {
  const ip = await ApiService.getIp()
  const {countryCode, regionCode, lat, lon} = await ApiService.getLocationInfoByIp(ip)
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