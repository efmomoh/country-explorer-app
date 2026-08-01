import CountryAPI from '../api/CountryAPI.mjs';
import CountrySearch from './modules/CountrySearch.mjs';

const api = new CountryAPI();

const state = {
    searchResults: []
};

const search = new CountrySearch(api, state);

const results = await search.searchByName('Canada');

console.log(results);
// console.log(state);
