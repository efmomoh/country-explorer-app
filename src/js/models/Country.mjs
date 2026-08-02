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
        REST Countries API v5 fields mapping
        are transformed here.
        */

        this.name = countryData.names?.common || 'Unknown';

        this.flag = countryData.flag.url_png || countryData.flag.url_svg || '';

        this.capital = countryData.capitals?.[0]?.name || 'Not available';

        this.population = countryData.population || 0;

        this.region = countryData.region || 'Unknown';

        this.subregion = countryData.subregion || 'Unknown';

        this.area = countryData.area?.kilometers || 0;

        this.timezones = countryData.timezones || [];

        this.maps = countryData.links?.google_maps || '';

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
        return languages.map((language) => language.name);
    }

    /*
    Converts currency object into
    readable format
    */

    getCurrencies(currencies) {
        if (!currencies) {
            return [];
        }

        return currencies.map((currency) => {
            return {
                name: currency.name,
                code: currency.code,
                symbol: currency.symbol
            };
        });
    }
}
