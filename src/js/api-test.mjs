/*
==========================================================

API Test Module

Purpose:
---------
Temporary file to test API connection.

This will be removed after
CountryAPI is connected to components.

==========================================================
*/

import CountryAPI from '../api/CountryAPI.mjs';

const countryAPI = new CountryAPI();

try {
    // eslint-disable-next-line
    const country = await countryAPI.getCountryByName('Canada');

    // console.log("API connection successful");
    // console.log(JSON.stringify(country, null, 2));

    // eslint-disable-next-line
} catch (error) {
    // console.error(error.message);
}
