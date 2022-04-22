import '../css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import countryCard from '../handlebars/country-card.hbs'
import API from './fetchCountries';
import { log } from 'handlebars';

const Handlebars = require("handlebars");
const template = Handlebars.compile("Name: {{name}}");
const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const container = document.querySelector('.country-info');

input.addEventListener('input', debounce(onSearch,DEBOUNCE_DELAY))

// Если пользователь полностью очищает поле поиска, то HTTP-запрос не выполняется, а разметка списка стран или информации о стране пропадает.

// Выполни санитизацию введенной строки методом trim(), это решит проблему когда в поле ввода только пробелы или они есть в начале и в конце строки.

// Notify.failure('Oops, there is no country with that name');
// Notify.info('Too many matches found. Please enter a more specific name.');

function onSearch() {
    const searchNameCountry = input.value;

    container.innerHTML = '';

    API.fetchCountries(searchNameCountry)
        .then(country => {
                const markup = countryCard(country)
                console.log(markup);
            container.innerHTML = markup;
        }).catch(onError);
}

function onError() {
    Notify.failure('Oops, there is no country with that name');
}