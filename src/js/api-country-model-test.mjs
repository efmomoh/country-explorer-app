import CountryAPI from '../api/CountryAPI.mjs';
import Country from './models/Country.mjs';

const countryAPI = new CountryAPI();

try {
    const data = await countryAPI.getCountryByName('Canada');
    // eslint-disable-next-line
    const canada = new Country(data);
    // console.log(canada);
    // eslint-disable-next-line
} catch (error) {
    // console.error(error.message);
}
