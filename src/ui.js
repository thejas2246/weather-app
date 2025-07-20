import map from './assets/icons/map.svg';
import magnify from './assets/icons/magnify.svg';
import { StoreData } from './process-data';

function displayMainContent() {
  const container = document.querySelector('.container');

  const mainContainer = document.createElement('div');
  mainContainer.setAttribute('class', 'main-container');

  container.appendChild(mainContainer);

  //location
  const mainContainerLocation = document.createElement('div');
  mainContainer.appendChild(mainContainerLocation);

  const mapIcon = document.createElement('img');
  mapIcon.src = map;
  mainContainerLocation.appendChild(mapIcon);

  const locationName = document.createElement('p');
  locationName.textContent = StoreData.locationName;
  mainContainerLocation.appendChild(locationName);

  const magnifyIcon = document.createElement('img');
  magnifyIcon.src = magnify;
  mainContainerLocation.appendChild(magnifyIcon);

  //temp
  const tempContainer = document.createElement('div');
  const temperature = document.createElement('p');
  temperature.textContent = StoreData.currentForeCast.temp;
  tempContainer.appendChild(temperature);
  mainContainer.appendChild(tempContainer);

  //condition

  const conditionContainer = document.createElement('div');
  const condition = document.createElement('p');
  condition.textContent = StoreData.currentForeCast.conditions;
  conditionContainer.appendChild(condition);
  mainContainer.appendChild(conditionContainer);
}

function showCurrentConditions() {
  let weatherDetalis = [
    {
      data: StoreData.currentForeCast.feelslike,
      iconName: 'feels-like',
      name: 'Feels Like',
      symbol: String.fromCodePoint(176),
    },
    {
      data: StoreData.currentForeCast.humidity,
      iconName: 'humidity',
      name: 'Humidity',
      symbol: '%',
    },
    {
      data: StoreData.currentForeCast.windspeed,
      iconName: 'wind-speed',
      name: 'Wind Speed',
      symbol: 'km/hr',
    },
    {
      data: StoreData.currentForeCast.uvindex,
      iconName: 'uv-index',
      name: 'UV Index',
      symbol: '',
    },
    {
      data: StoreData.currentForeCast.visibility,
      iconName: 'visibility',
      name: 'Visibility',
      symbol: 'km',
    },
    {
      data: StoreData.currentForeCast.precipprob,
      iconName: 'rain-chance',
      name: 'Rain Chance',
      symbol: '%',
    },
  ];
  const container = document.querySelector('.container');
  const mainContainer = document.createElement('div');
  const titleContainer = document.createElement('div');
  const girdContainer = document.createElement('div');
  mainContainer.appendChild(titleContainer);
  mainContainer.appendChild(girdContainer);

  mainContainer.setAttribute('class', 'air-condition-container');
  titleContainer.textContent = 'Air Conditions';

  //condition details
  for (let item of weatherDetalis) {
    const itemElementContainer = document.createElement('div');
    const iconNameContainer = document.createElement('div');
    const stats = document.createElement('div');
    const image = document.createElement('img');
    const p = document.createElement('p');

    const url = require(`./assets/details-icon/${item.iconName}.svg`);
    image.src = url;

    iconNameContainer.appendChild(image);
    iconNameContainer.appendChild(p);
    p.textContent = item.name;

    itemElementContainer.appendChild(iconNameContainer);
    itemElementContainer.appendChild(stats);
    stats.textContent = `${item.data} ${item.symbol}`;

    girdContainer.appendChild(itemElementContainer);
  }

  container.appendChild(mainContainer);
}

function showHourlyForeCast() {
  const container = document.querySelector('.container');
  const mainContainer = document.createElement('div');
  const titleContainer = document.createElement('div');
  const flexContainer = document.createElement('div');
  mainContainer.appendChild(titleContainer);
  mainContainer.appendChild(flexContainer);

  mainContainer.setAttribute('class', 'hourly-forecast-container');
  titleContainer.textContent = 'Hourly ForeCast';

  for (let hour of StoreData.hourlyForeCast) {
    const itemElementContainer = document.createElement('div');
    const date = document.createElement('p');
    date.textContent = hour.datetime;
    const image = document.createElement('img');
    const url = require(`./assets/weather-icon/${hour.icon}.svg`);
    image.src = url;
    const temp = document.createElement('p');
    temp.textContent = `${hour.temp}°`;

    itemElementContainer.appendChild(date);
    itemElementContainer.appendChild(image);
    itemElementContainer.appendChild(temp);

    mainContainer.appendChild(itemElementContainer);
  }
  container.appendChild(mainContainer);
}

export function display() {
  displayMainContent();
  showCurrentConditions();
  showHourlyForeCast();
}
