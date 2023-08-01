import axios from "axios";
import { apiKey } from "../constants";

const forecastEndpoint = params => `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}`;
const locationsEndpoint = params => `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

const translationDict = {
  'Partly cloudy': 'Sluníčkový piknik s obláčky',
  'Clear': 'Den plný sluníčkových úsměvů',
  'Patchy rain possible': 'Obláčky mohou pokapávat',
  'Moderate rain': 'Mírný deštíkový koncert',
  'Sunny': 'Den plný sluníčkových úsměvů',
  'Overcast': 'Den plný sluníčkových úsměvů',
  'Cloudy': 'Hustá obláčková párty',
  'Light rain': 'Šeptání dešťových kapek',
  'Moderate rain at times': 'Občasné kapky pro radost',
  'Heavy rain': 'Silný deštíkový koncert',
  'Heavy rain at times': 'Obláčky občas hodně pláčou',
  'Moderate or heavy freezing rain': 'Zmrzlé kapky, malé nebo velké',
  'Moderate or heavy rain shower': 'Obláčkové sprchování, malé nebo velké',
  'Moderate or heavy rain with thunder': 'Bouřkový koncert pro velké i malé kapky',
  'Mist': 'Hra na schovávanou s kouzelnou mlhou',
  // přidejte další překlady zde...
};

const apiCall = async (endpoint) => {
  const options = {
    method: 'GET',
    url: endpoint,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log('error: ', error);
    return {};
  }
}

export const fetchWeatherForecast = async params => {
  let forecastUrl = forecastEndpoint(params);
  let data = await apiCall(forecastUrl);

  // Pokud máme data a máme informace o podmínkách, přeložíme 'condition' text
  if (data && data.current && data.current.condition) {
    const conditionText = data.current.condition.text;
    data.current.condition.text = translationDict[conditionText] || conditionText;
  }

  return data;
}

export const fetchLocations = params => {
  let locationsUrl = locationsEndpoint(params);
  return apiCall(locationsUrl);
}
