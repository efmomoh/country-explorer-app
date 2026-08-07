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
- Handle favorite selection
- Show empty messages when needed

Author:
Enssah Fayia Momoh

Course:
WDD330 Final Project - Country Explorer App

==========================================================
*/

import CountryCard from './CountryCard.mjs';

export default class CountryGrid {
    /*
    ======================================================
    Constructor
    ======================================================
    */

    constructor(container, favoriteManager) {
        this.container = container;

        this.favoriteManager = favoriteManager;

        /*
        Stores the grid element after rendering.
        */

        this.grid = null;

        /*
        Callback provided by CountryExplorerApp.

        Used when the user clicks
        "View Details".
        */

        this.onCountrySelected = null;

        /*
        Callback provided by CountryExplorerApp.

        Used when the user clicks
        the Favorite button.
        */

        this.onFavoriteSelected = null;
    }

    /*
    ======================================================
    Render Country Grid Structure
    ======================================================
    */

    render() {
        this.container.innerHTML = `

            <section
                class="country-section"
                id="countries"
                aria-labelledby="country-title"
            >

                <h2 id="country-title">
                    Countries
                </h2>


                <div class="country-grid">

                    <p class="empty-message">
                        Search for a country to explore information.
                    </p>

                </div>

            </section>

        `;

        this.grid = this.container.querySelector('.country-grid');
    }

    /*
    ======================================================
    Set Country Selected Callback
    ======================================================
    
    CountryExplorerApp provides the function that
    should run when View Details is clicked.
    */

    setCountrySelectedCallback(callback) {
        this.onCountrySelected = callback;
    }

    /*
    ======================================================
    Set Favorite Selected Callback
    ======================================================
    */

    setFavoriteSelectedCallback(callback) {
        this.onFavoriteSelected = callback;
    }

    /*
    ======================================================
    Display Country Cards
    ======================================================

    Receives:
    ----------
    countries
        Array of Country model objects.
    */

    displayCountries(countries) {
        if (!countries.length) {
            this.grid.innerHTML = `

                <p class="empty-message">
                    No countries were found.
                </p>

            `;

            return;
        }

        /*
        Create each CountryCard.
        */

        this.grid.innerHTML = countries
            .map((country, index) => {
                const isFavorite = this.favoriteManager.isFavorite(country);

                /*
                Pass the country-selection callback
                into CountryCard.
                */

                const card = new CountryCard(
                    country,
                    isFavorite,
                    this.onCountrySelected
                );

                return `

                    <div
                        class="country-card-wrapper"
                        data-index="${index}"
                    >

                        ${card.render()}

                    </div>

                `;
            })
            .join('');

        /*
        Attach events after the HTML
        has been inserted into the DOM.
        */

        this.addCardEvents(countries);
    }

    /*
    ======================================================
    Add Card Events
    ======================================================

    Handles:

    - View Details
    - Favorite button
    */

    addCardEvents(countries) {
        const cards = this.grid.querySelectorAll('.country-card-wrapper');

        cards.forEach((card, index) => {
            const selectedCountry = countries[index];

            /*
            ------------------------------------------------
            View Details
            ------------------------------------------------

            Find the CountryCard instance's
            View Details button.
            */

            const viewDetailsButton = card.querySelector(
                '.view-details-button'
            );

            if (viewDetailsButton) {
                viewDetailsButton.addEventListener('click', (event) => {
                    /*
                        Prevent the button click
                        from triggering anything
                        outside the button.
                        */

                    event.stopPropagation();

                    /*
                        Tell the application which
                        country was selected.
                        */

                    if (this.onCountrySelected) {
                        this.onCountrySelected(selectedCountry);
                    }
                });
            }

            /*
            ------------------------------------------------
            Favorite Button
            ------------------------------------------------

            Clicking Favorite should NOT open
            the country details.
            */

            const favoriteButton = card.querySelector('.favorite-button');

            if (favoriteButton) {
                favoriteButton.addEventListener('click', (event) => {
                    event.stopPropagation();

                    if (this.onFavoriteSelected) {
                        this.onFavoriteSelected(selectedCountry);
                    }
                });
            }
        });
    }

    /*
    ======================================================
    Display Loading Message
    ======================================================
    */

    showLoading() {
        this.grid.innerHTML = `

            <p class="loading-message">
                Loading countries...
            </p>

        `;
    }

    /*
    ======================================================
    Display API Error
    ======================================================
    */

    showError(message) {
        this.grid.innerHTML = `

            <p class="error-message">
                ${message}
            </p>

        `;
    }
}
