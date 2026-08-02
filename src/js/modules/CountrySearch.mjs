/* ==========================================================
Country Search Module

Purpose:
---------
Handles country search functionality.

Responsibilities:
-----------------
- Search countries by name
- Search countries by region
- Convert API responses into Country objects
- Update application state

Author:
Enssah Fayia Momoh

Course:
WDD330 Final Project - Country Explorer App
==========================================================
*/
import Country from '../models/Country.mjs';

export default class CountrySearch {
    constructor(countryAPI, state) {
        this.countryAPI = countryAPI;
        this.state = state;
    }
    /* Search countries by name
    Example: Canada
    Returns: Array of Country objects */

    async searchByName(name) {
        const data = await this.countryAPI.getCountryByName(name);
        const countries = this.createCountryObjects(data);
        this.state.searchResults = countries;
        return countries;
    }

    /*Search countries by region
    Example: Africa
    Returns: Array of Country objects  */

    async searchByRegion(region) {
        const data = await this.countryAPI.getCountriesByRegion(region);
        const countries = this.createCountryObjects(data);
        this.state.searchResults = countries;
        return countries;
    }

    /*Convert API response datainto application Country objects. */
    // createCountryObjects(countryData) {
    //     console.log(countryData);
    //     return countryData.map((country) => new Country(country));
    // }

    // OR

    createCountryObjects(countryData) {
        console.log("RAW API RESPONSE:");
        console.log(countryData);

        let countries = countryData;
        // Handles API responses wrapped inside an object
        if (countryData.data?.objects) {
            countries = countryData.data.objects;
        }

        if (!Array.isArray(countries)) {
            countries = [countries];
        }

        console.log("COUNTRIES ARRAY:");
        console.log(countries);

        return countries.map((country) => new Country(country));
    }
}
