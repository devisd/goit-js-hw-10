import '../css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import API from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    container: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    if (e.target.value.length === 1 || e.target.value.length === 2) {
        return Notify.info("Too many matches found. Please enter a more specific name.");
    }
    onSearch(e.target.value);
}

function onSearch(inputValue) {
    API.fetchCountries(inputValue)
        .then(countryMarkup)
        .then(listMarkup)
        .catch(onError)
}

function countryMarkup(objects) {
    return objects.map(object => {
        if (objects.length > 1) {
            refs.container.innerHTML = '';
            return countryList(object);
        }
            refs.list.innerHTML = '';
            const markup = oneContry(object);
            refs.container.innerHTML = markup;
    }).join('');
}
  
function oneContry(e) {
  return `<h2 style='display:flex' style='font-size:20px'><img src='${e.flags.svg}'>${e.name.official}</h2>
            <p><b>Capital: </b>${e.capital}</p>
            <p><b>Population: </b>${e.population}</p>
            <p><b>Language: </b>${e.languages.eng}</p>`
}

function countryList(e) {
  return `<li><img src='${e.flags.svg}'>
          <p style='font-size:20px'><b>${e.name.official}</b></p></li>`
}

function listMarkup(markup) {
    refs.list.innerHTML = markup;
}

function onError() {
    Notify.failure('Oops, there is no country with that name');
    refs.list.innerHTML = '';
    refs.container.innerHTML = '';
}