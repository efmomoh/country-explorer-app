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
    constructor(container, favoriteManager) {
        this.container = container;
        this.favoriteManager = favoriteManager;
        // Stores the grid element after rendering
        this.grid = null;
        // Callback function provided by App
        this.onCountrySelected = null;
        this.onFavoriteSelected = null;
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

    /* Allows CountryExplorerApp to provide a favorite selection function */

    setFavoriteSelectedCallback(callback) {
        this.onFavoriteSelected = callback;
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
                const isFavorite = this.favoriteManager.isFavorite(country);
                const card = new CountryCard(country, isFavorite);
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
    /*
Adds click events to every country card.

Handles:
---------
- Country selection
- Favorite button click
*/

    addCardEvents(countries) {
        const cards = this.grid.querySelectorAll('.country-card-wrapper');

        cards.forEach((card) => {
            const index = card.dataset.index;
            const selectedCountry = countries[index];
            // console.log("GRID:", selectedCountry);
            /*  Clicking anywhere on the card  opens the country details.  */

            card.addEventListener('click', () => {
                if (this.onCountrySelected) {
                    this.onCountrySelected(selectedCountry);
                }
            });

            /* Clicking the Favorite button should NOT open the details.
            stopPropagation() prevents the card click event from firing.*/

            const favoriteButton = card.querySelector('.favorite-button');

            favoriteButton.addEventListener('click', (event) => {
                event.stopPropagation();
                if (this.onFavoriteSelected) {
                    this.onFavoriteSelected(selectedCountry);
                }
            });
        });
    }

    /*
==========================================================
Display loading message
==========================================================
*/

    showLoading() {
        this.grid.innerHTML = `

        <p class="loading-message">
            Loading countries...
        </p>

    `;
    }

    /*
==========================================================
Display API error
==========================================================
*/

    showError(message) {
        this.grid.innerHTML = `

        <p class="error-message">

            ${message}

        </p>

    `;
    }
}
