import { processData } from './process-data';

export async function fetchData(location) {
  const API_KEY = 'U42EPFYWWAXL8DWP2Q3XVKCA8';

  try {
    let response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`
    );
    let data = await response.json();
    console.log(data);
    processData(data);
  } catch (e) {
    console.log(e);
  }
}
