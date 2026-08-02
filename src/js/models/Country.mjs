/*
==========================================================

Country Model Class

Purpose:
---------
Represents a country object inside
the Country Explorer application.

Responsibilities:
-----------------
- Store country information
- Convert API data into application data
- Provide clean data for components

Author:
Enssah Fayia Momoh

Course:
WDD330 Final Project - Country Explorer App
==========================================================
*/

export default class Country {
    constructor(countryData) {
        /*
        Store original API data
        This allows future access
        if additional fields are needed.
        */

        this.rawData = countryData;

        /*
        Basic country information
        REST Countries API fields
        are transformed here.
        */

        this.name = countryData.name?.common || 'Unknown';

        this.flag = countryData.flags?.png || countryData.flags?.svg || '';

        this.capital = countryData.capital?.[0] || 'Not available';

        this.population = countryData.population || 0;

        this.region = countryData.region || 'Unknown';

        this.subregion = countryData.subregion || 'Unknown';

        this.area = countryData.area || 0;

        this.timezones = countryData.timezones || [];

        this.maps = countryData.maps?.googleMaps || '';

        this.languages = this.getLanguages(countryData.languages);

        this.currencies = this.getCurrencies(countryData.currencies);
    }

    /*
    Converts language object into array
    API example:
    {
    eng:"English",
    fra:"French"
    }
    becomes:
    [
    "English",
    "French"
    ]
    */
    getLanguages(languages) {
        if (!languages) {
            return [];
        }
        return Object.values(languages);
    }

    /*
    Converts currency object into
    readable format
    */

    getCurrencies(currencies) {
        if (!currencies) {
            return [];
        }

        return Object.values(currencies).map((currency) => {
            return {
                name: currency.name,
                symbol: currency.symbol
            };
        });
    }
}
