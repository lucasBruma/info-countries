export default class Country {

    constructor({
        name,
        flag,
        nativeName,
        population,
        region,
        subRegion,
        capital,
        domain,
        currencies,
        aParent 
    }) {
      this.name = name,
      this.flag = flag,
      this.nativeName = nativeName,
      this.population = population,
      this.region = region,
      this.subRegion = subRegion,
      this.capital = capital,
      this.domain = domain,
      this.currencies = currencies,
      this.aParent = aParent
    }
  }

