// It builds index.html and receives objects countries.

const countriesContainer = document.querySelector('.countries');

export default function createHTMLIndex(countries){
    const fragment = new DocumentFragment();
    countries.map(country => {

        country.aParent.innerHTML = `
        <div class="country__flag">
            <img loading="lazy" src="${country.flag}" alt="${country.name}">
        </div>
        <div class="country__content">
            <div class="country__name">${country.name}</div>
            <p class="country__population">Population: <span>${country.population}</span></p>
            <p >Region: <span class="country__region">${country.region}</span></p>
            <p class="country__capital">Capital: <span>${country.capital}</span></p>
        </div>
        `;
        fragment.append(country.aParent);
    })
    countriesContainer.append(fragment);
    return 
}

