export interface Country{
    flag: string,
    name: string,
    population: number,
    region: string,
    capital: string | null
}

export interface IHome{
    data: Country[]
}

export interface ICountryList{
    countries: Country[]
}

export interface ICountry{
    name:string,
    population:number,
    flag: string,
    region: string,
    capital: string | null
}