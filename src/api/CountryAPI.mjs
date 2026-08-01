/*
==========================================================

CountryAPI Module

Purpose:
---------
Handles all communication with the REST Countries API.

Responsibilities:
-----------------
- Connect to REST Countries API
- Send API requests
- Search countries by name
- Filter countries by region
- Handle API errors

Author:
Enssah Fayia Momoh

Course:
WDD330 Final Project - Country Explorer App

==========================================================
*/
export default class CountryAPI {
    /*
    Creates the API object.
    Stores:
    - API base URL
    - API authentication key
    */

    constructor() {
        // REST Countries API version 5 URL
        this.baseURL = 'https://api.restcountries.com/countries/v5';

        /*
        API key is stored inside .env
        Vite exposes environment variables
        using import.meta.env
        */

        this.apiKey = import.meta.env.VITE_COUNTRY_API_KEY;
    }

    /*
    Private helper method
    Purpose:
     Avoid repeating fetch code.
    Every API method will use this.
    */
    async request(endpoint) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            headers: {
                Authorization: `Bearer ${this.apiKey}`
            }
        });

        /*
        Check if API request failed
        Examples:
        401 = Unauthorized
        403 = Forbidden
        404 = Not Found
        */
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        return await response.json();
    }

    /*
    Search country by name
    Example:
    Canada
    Used by:
    Country Search Module
    */
    async getCountryByName(countryName) {
        return await this.request(`/names.common/${countryName}`);
    }

    /*
    Get countries by region
    Example:
    Africa
    Europe
    Asia
    Used by:
    Region Filter Module
    */

    async getCountriesByRegion(region) {
        return await this.request(`/regions/${region}`);
    }
}
