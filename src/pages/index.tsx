import Head from 'next/head'
import { ChangeEvent, useState } from 'react'

import Header from '@/components/Header'
import CountryList from '@/components/CountryList'

import {Country} from "../types/Country"
import {IHome} from "../types/types"


export default function Home({data}:IHome) {

  const [countries, setCountries] = useState(data)
  const [inputValue, setInputValue] = useState<string>("")
  const [selectValue, setSelectValue] = useState<string>("")

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value)
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header/>
        <div className="filter">
          <div className="input">Lupa<input type="text" placeholder='Search for a country' value={inputValue} onChange={handleInput} /></div>
          <select value={selectValue} onChange={handleSelect}>
            <option value="">Default</option>
            <option value="Africa">Africa</option>
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        <CountryList countries={countries.filter(country => country.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()) && country.region.toLocaleLowerCase().includes(selectValue.toLocaleLowerCase()))}/>
      </main>
    </>
  )
}

export const getStaticProps = async() => {
  let countries
  const API_URL = "https://restcountries.com/v3.1/all"
  const res = await fetch(API_URL)
  const data = await res.json() as Country[]
  countries = data.map(country => {
    return{
      flag: country.flags.png,
      name: country.name.common,
      population: country.population,
      region: country.region,
      capital: country.capital ? country.capital[0] : null
    }
  })

  return{
    props:{
      data: countries,
    }
  }
}
