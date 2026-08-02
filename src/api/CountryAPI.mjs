/*
==========================================================

CountryAPI Module

Purpose:
---------
Handles communication with the REST Countries API.

Responsibilities:
-----------------

- Send API requests
- Retrieve country data
- Search countries by name
- Filter countries by region
- Return raw API responses

Author:
Enssah Fayia Momoh

Course:
WDD330 Final Project - Country Explorer App

==========================================================
*/
export default class CountryAPI {
    constructor() {
        // REST Countries API endpoint
        this.baseURL = 'https://api.restcountries.com/countries/v5';
        // API key stored in environment variables
        this.apiKey = import.meta.env.VITE_COUNTRY_API_KEY;
    }

    /* Reusable API request handler
    Handles:
    - Headers
    - Fetching
    - Error checking
    - JSON conversion
    */
    async request(endpoint) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            headers: {
                Authorization: `Bearer ${this.apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error(`Country API request failed: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data);
        return data;
    }

    /* Fetch all countries
    Returns: Array of countries
   */

    async getAllCountries() {
        return await this.request('/all');
    }

    /*  Search country by name
    Example: Canada
    */
    async getCountryByName(name) {
        return await this.request(`?q=${name}`); // we can also use this: "name.common/{name}"
    }

    /* Search countries by region
    Example: Africa
    */

    async getCountriesByRegion(region) {
        // console.log(region);
        return await this.request(`?regions=${region}`);
    }
}
