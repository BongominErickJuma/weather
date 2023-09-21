export const geoUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
export const geoOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

export const weatherUrl = "https://api.openweathermap.org/data/2.5"

export const weatherApi = process.env.REACT_APP_WEATHER_API_KEY