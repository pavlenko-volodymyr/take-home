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

export default {
  getIp,
  getLocationInfoByIp,
};