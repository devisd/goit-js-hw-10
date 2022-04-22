const URL = 'https://restcountries.com/v3.1/name/'

function fetchCountries(inputName) {
    return fetch(`${URL}${inputName}`)
        .then(response => response.json());
        
}

export default { fetchCountries };

// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages - массив языков