import { processData } from './process-data';
import { display } from './ui';
export async function fetchData(location) {
  const loader = document.querySelector('.loader');
  loader.classList.add('active');
  const API_KEY = 'U42EPFYWWAXL8DWP2Q3XVKCA8';
  let response;
  try {
    response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`
    );
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      processData(data);
      display();
    } else if (response.status === 400) {
      showError('Enter valid location ');
    } else if (response.status === 401) {
      showError(
        ' There is a problem with the API key, account or subscription. Sorry!'
      );
    } else if (response.status === 404) {
      showError('NOT_FOUND ');
    } else if (response.status === 429) {
      showError('The account has exceeded their assigned limits');
    } else {
      showError('INTERNAL_SERVER_ERROR');
    }
  } catch (e) {
    console.log(e);
  }
  loader.classList.remove('active');
}

function showError(e) {
  const container = document.querySelector('.container');
  container.textContent = '';
  const error = document.createElement('p');
  error.textContent = e;
  container.appendChild(error);
}
