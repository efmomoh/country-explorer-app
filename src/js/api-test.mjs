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
import Country from './models/Country.mjs';

const countryAPI = new CountryAPI();

const country = await countryAPI.getCountryByName('Canada');
// console.log("API connection successful");
// console.log(JSON.stringify(country, null, 2));

// country models - this displays country data
// eslint-disable-next-line
const countryData = new Country(country);
// console.log(countryData);
