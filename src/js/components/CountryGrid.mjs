/*
==========================================================

Country Grid Component Module

Purpose:
---------
Displays a collection of country cards.

Responsibilities:
-----------------
- Render the country results section
- Display search results
- Handle country selection
- Notify the application when a country is selected
- Show empty messages when needed

Author:
Enssah Fayia Momoh

Course:
WDD330 Final Project - Country Explorer App

==========================================================
*/

import CountryCard from './CountryCard.mjs';

export default class CountryGrid {
    constructor(container) {
        this.container = container;
        // Stores the grid element after rendering
        this.grid = null;
        // Callback function provided by App
        this.onCountrySelected = null;
    }

    /* Render country grid structure  */

    render() {
        this.container.innerHTML = `
        <section class="country-section" id="countries" aria-labelledby="country-title">
            <h2 id="country-title">Countries</h2>

            <div class="country-grid">
                <p class="empty-message">Search for a country to explore information.</p>
            </div>
        </section>
        `;

        this.grid = this.container.querySelector('.country-grid');
    }

    /* Allows CountryExplorerApp to provide a country selection function */
    setCountrySelectedCallback(callback) {
        this.onCountrySelected = callback;
    }

    /* Display country cards
    Receives: Array of Country model objects
    */

    displayCountries(countries) {
        if (!countries.length) {
            this.grid.innerHTML = `
            <p class="empty-message">No countries were found.</p>
            `;
            return;
        }

        this.grid.innerHTML = countries
            .map((country, index) => {
                const card = new CountryCard(country);
                return `

                <div class="country-card-wrapper" data-index="${index}">
                    ${card.render()}
                </div>
                `;
            })
            .join('');
        this.addCardEvents(countries);
    }

    /*Add click events to country cards*/
    addCardEvents(countries) {
        const cards = this.grid.querySelectorAll('.country-card-wrapper');
        cards.forEach((card) => {
            card.addEventListener('click', () => {
                const index = card.dataset.index;
                const selectedCountry = countries[index];

                if (this.onCountrySelected) {
                    this.onCountrySelected(selectedCountry);
                }
            });
        });
    }
}
