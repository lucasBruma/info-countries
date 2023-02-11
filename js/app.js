
import Country from "./countryClass.js";
import createHTMLIndex from "./createHTMLIndex.js";
import switchTheme from "./themes.js";
const search = document.querySelector('.search');
const select = document.querySelector('.filter__select');

switchTheme();

window.addEventListener('DOMContentLoaded',()=>{
    getCountries();
})

async function getCountries(){
    const url = "https://restcountries.com/v3.1/all";
    const response = await axios(url);
    
    const objCountries = createObjectsCountries(response);
    localStorage.setItem('countries',JSON.stringify(response.data));
    createHTMLIndex(objCountries);
}

function createObjectsCountries(response){
    const countries = [];
    response.data.forEach(obj => {
        //domain
        if(obj.tld == undefined) obj.tld = 'Undefined';
        else if(obj.tld.length > 1) obj.tld = obj.tld.join(', ');
        else obj.tld = obj.tld[0];

        const a = document.createElement('a');
        a.classList.add('country');
        a.href = `country.html?country=${obj.cca3}`;

        const country = new Country({
            name: obj.name.common,
            flag: obj.flags.svg,
            nativeName: obj.name.nativeName ? Object.values(obj.name.nativeName)[0].common : 'Undefined',
            population: formatPopulation(obj.population),
            region: obj.region,
            subRegion: obj.subregion,
            capital: obj.capital ? obj.capital[0] : 'Undefined',
            domain: obj.tld,
            currencies: obj.currencies ? Object.values(obj.currencies)[0].name : 'Undefined',
            aParent: a,
        }) 

        countries.push(country)
    });
    return countries
}

function formatPopulation(population) {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

// search

search.addEventListener('keyup', e=>{
    document.querySelectorAll(".country__name").forEach(el =>{
        const region = el.parentNode.childNodes[5].childNodes[1].textContent;
        (el.textContent.toLowerCase().includes(e.target.value.toLowerCase())
        && (region == select.value || select.value == 'All' || select.value == ''))
            ? el.parentNode.parentNode.style.display = 'flex'
            : el.parentNode.parentNode.style.display = 'none';
    })
}
)

//select

select.addEventListener('click',(e)=>{
    if(e.pointerId == 0){
        if(e.target.value !== 'All'){
            document.querySelectorAll(".country__region").forEach(el =>{
                el.textContent.toLowerCase() == e.target.value.toLowerCase() 
                    ? el.parentNode.parentNode.parentNode.style.display = 'flex'
                    : el.parentNode.parentNode.parentNode.style.display = 'none';
            })
        }else{
            document.querySelectorAll(".country__region").forEach(el => el.parentNode.parentNode.parentNode.style.display = 'flex')
        }
    }
})
