import './styles.css';
import { fetchData } from './fetch-data';
import { display, openDialog, setActiveMeasurement } from './ui';
import { tempStatus } from './process-data';

setActiveMeasurement();
fetchData('tokyo');

const form = document.querySelector('form');
form.addEventListener('submit', searchForData);

const close = document.querySelector('.exit');
close.addEventListener('click', () => {
  const dialog = document.querySelector('dialog');
  dialog.close();
});

const celsiusButton = document.querySelector('.c');
celsiusButton.addEventListener('click', () => {
  tempStatus.setTemp(true);
  clearOldDataFromScreen();
  display();
});

const fahrenheitButton = document.querySelector('.f');
fahrenheitButton.addEventListener('click', () => {
  tempStatus.setTemp(false);
  clearOldDataFromScreen();
  display();
});

const searchIcon = document.querySelector('#search');
searchIcon.addEventListener('click', openDialog);

function searchForData(e) {
  e.preventDefault();
  const input = document.querySelector('input');
  fetchData(input.value);
  clearOldDataFromScreen();
  const dialog = document.querySelector('dialog');
  dialog.close();
  input.value = '';
}

function clearOldDataFromScreen() {
  const container = document.querySelector('.container');
  container.textContent = '';
}
