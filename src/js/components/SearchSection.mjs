/* ==========================================================

Search Section Component Module

Purpose:
---------
Creates the homepage search interface.

Responsibilities:
-----------------
- Display country search input
- Display search button
- Display region filter
- Prepare interface for REST Countries API

Author: Enssah Fayia Momoh
Course: WDD330 Final Project - Country Explorer App
========================================================== */

export default class SearchSection {
    /* Receives the search container */
    constructor(container) {
        this.container = container;
    }

    /* Render search interface */

    render() {
        this.container.innerHTML = `
        <section class="search-section" id="search" aria-labelledby="search-title">
            <h2 id="search-title">Explore Countries</h2>

            <form class="search-form">

                <label for="country-search">Search by country name</label>
                
                <div class="search-controls">
                    <input
                        type="search"
                        id="country-search"
                        name="country"
                        placeholder="Enter country name"
                        autocomplete="off"
                    />

                    <button type="submit" class="search-button">Search</button>
                </div>

                <label for="region-filter">Filter by region</label>
                <select id="region-filter" name="region">
                    <option value="" disabled selected>All Regions</option>
                    <option value="Africa">Africa</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Americas">Americas</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </form>
        </section>
        `;
    }
}
