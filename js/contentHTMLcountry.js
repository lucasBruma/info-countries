// this script takes a parameter in the URL, which is a country's code, and brings this parameter's info from the API.

const country = document.querySelector('.country-profile');
const urlParams = new URLSearchParams(window.location.search);
const countryCode = urlParams.get('country');
import switchTheme from "./themes.js";

switchTheme();

window.addEventListener('DOMContentLoaded',()=>{
    getCountry();
})

async function getCountry(){
    const url = `https://restcountries.com/v3.1/alpha/${countryCode.toLowerCase()}`;
    const response = await axios(url);
    insertHTMLcountry(response.data[0]);
};

function insertHTMLcountry(data){

    if(data.tld == undefined) data.tld = 'Undefined';
    else if(data.tld.length > 1) data.tld = data.tld.join(', ');
    else data.tld = data.tld[0];

    data.name.nativeName = data.name.nativeName ? Object.values(data.name.nativeName)[0].common : 'Undefined';
    data.capital = data.capital ? data.capital[0] : 'Undefined';
    data.currencies = data.currencies ? Object.values(data.currencies)[0].name : 'Undefined';

    let borders = '';

    if(data.borders){
        data.borders.map(countryBorder => {
            const name = searchCountry(countryBorder);
            borders += `<a href="country.html?country=${countryBorder.toLowerCase()}">${name}</a>`
        })
    }else{
        borders = "This country has no neighboring countries"
    }


    country.innerHTML =  `
    <div class="country-profile__flag"><img src="${data.flags.svg}" alt="usa"></div>
    <div class="country-profile__info">
        <h2 class="country-profile__name">${data.name.common}</h2>
        <div class="country-profile__par">
            <div class="country-profile__par-left">
                <p>Native Name: <span class="country-profile__native-name">${data.name.nativeName}</span></p>
                <p>Population: <span class="country-profile__population">${formatPopulation(data.population)}</span></p>
                <p>Region: <span class="country-profile__region">${data.region}</span></p>
                <p>Sub Region: <span class="country-profile__sub-region">${data.subregion}</span></p>
            </div>
            <div class="country-profile__par-right">
                <p>Capital: <span class="country-profile__capital">${data.capital}</span></p>
                <p>Top Level Domain: <span class="country-profile__domain">${data.tld}</span></p>
                <p>Currencies: <span class="country-profile__currencies">${data.currencies}</span></p>
            </div>
        </div>
        <div class="country-profile__info-border">
            <p>Border Countries:</p>
            <div class="country-profile__borders">${borders}</div>
        </div>
    </div>
    `;
}

function formatPopulation(population) {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

function searchCountry(abbr){
    let list = localStorage.getItem('countries');
    return JSON.parse(list).find(country => country.cca3 == abbr).name.common
}

