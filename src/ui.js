import map from './assets/icons/map.svg';
import magnify from './assets/icons/magnify.svg';
import {
  convertCelsiusToFahrenheit,
  StoreData,
  tempStatus,
} from './process-data';

function displayMainContent() {
  const container = document.querySelector('.container');

  const mainContainer = document.createElement('div');
  mainContainer.setAttribute('class', 'main-container');

  container.appendChild(mainContainer);

  //location
  const mainContainerLocation = document.createElement('div');
  mainContainer.appendChild(mainContainerLocation);
  mainContainerLocation.addEventListener('click', openDialog);

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
  const image = document.createElement('img');
  const url = require(`./assets/weather-icon/${StoreData.currentForeCast.icon}.svg`);
  image.src = url;
  console.log(tempStatus.getTemp());
  temperature.textContent = `${
    tempStatus.getTemp()
      ? convertCelsiusToFahrenheit(StoreData.currentForeCast.temp)
      : StoreData.currentForeCast.temp
  }${String.fromCodePoint(176)}`;
  tempContainer.appendChild(temperature);
  tempContainer.appendChild(image);
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
      data: tempStatus.getTemp()
        ? convertCelsiusToFahrenheit(StoreData.currentForeCast.feelslike)
        : StoreData.currentForeCast.feelslike,
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
  girdContainer.setAttribute('class', 'grid-container');
  mainContainer.appendChild(titleContainer);
  mainContainer.appendChild(girdContainer);

  mainContainer.setAttribute('class', 'air-condition-container');
  titleContainer.textContent = 'Air Conditions';

  //condition details
  for (let item of weatherDetalis) {
    const itemElementContainer = document.createElement('div');
    itemElementContainer.setAttribute('class', 'item-container');
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
    temp.textContent = `${
      tempStatus.getTemp() ? convertCelsiusToFahrenheit(hour.temp) : hour.temp
    }°`;

    itemElementContainer.appendChild(date);
    itemElementContainer.appendChild(image);
    itemElementContainer.appendChild(temp);

    flexContainer.appendChild(itemElementContainer);
    mainContainer.appendChild(flexContainer);
  }
  container.appendChild(mainContainer);
}

function showDailyForeCast() {
  const container = document.querySelector('.container');
  const mainContainer = document.createElement('div');
  const titleContainer = document.createElement('div');
  const flexContainer = document.createElement('div');
  flexContainer.setAttribute('class', 'daily-flex-container');

  mainContainer.appendChild(titleContainer);
  mainContainer.appendChild(flexContainer);

  mainContainer.setAttribute('class', 'daily-forecast-container');
  titleContainer.textContent = 'Daily ForeCast';

  for (let day of StoreData.dailyForeCast) {
    const itemElementContainer = document.createElement('div');
    const leftContainer = document.createElement('div');
    const date = document.createElement('p');
    date.textContent = day.datetime;
    const image = document.createElement('img');
    const url = require(`./assets/weather-icon/${day.icon}.svg`);
    image.src = url;
    const temp = document.createElement('p');
    temp.textContent = `${
      tempStatus.getTemp() ? convertCelsiusToFahrenheit(day.temp) : day.temp
    }°`;
    const condition = document.createElement('p');
    condition.textContent = day.conditions;
    leftContainer.appendChild(date);
    leftContainer.appendChild(image);
    leftContainer.appendChild(condition);
    itemElementContainer.appendChild(leftContainer);
    itemElementContainer.appendChild(temp);

    flexContainer.appendChild(itemElementContainer);
    mainContainer.appendChild(flexContainer);
  }
  container.appendChild(mainContainer);
}

export function display() {
  setActiveMeasurement();
  displayMainContent();
  showCurrentConditions();
  showHourlyForeCast();
  showDailyForeCast();
}

export function openDialog() {
  const dialog = document.querySelector('dialog');
  dialog.showModal();
}

export function setActiveMeasurement() {
  const fahrenheitButton = document.querySelector('.f');
  const celsiusButton = document.querySelector('.c');
  if (tempStatus.getTemp()) {
    celsiusButton.classList.add('active-button');
    fahrenheitButton.classList.remove('active-button');
  } else {
    celsiusButton.classList.remove('active-button');
    fahrenheitButton.classList.add('active-button');
  }
}
