import './styles.css';
import { fetchData } from './fetch-data';
import { openDialog } from './ui';
import { tempStatus } from './process-data';

fetchData('tokyo');

const form = document.querySelector('form');
form.addEventListener('submit', searchForData);

const close = document.querySelector('.exit');
close.addEventListener('click', () => {
  const dialog = document.querySelector('dialog');
  dialog.close();
});

const searchIcon = document.querySelector('#search');
searchIcon.addEventListener('click', openDialog);

function searchForData(e) {
  e.preventDefault();
  const input = document.querySelector('input');
  fetchData(input.value);
  const container = document.querySelector('.container');
  container.textContent = '';
  const dialog = document.querySelector('dialog');
  dialog.close();
  input.value = '';
}
