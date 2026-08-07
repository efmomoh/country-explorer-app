/*
==========================================================

Country Card Component Module

Purpose:
---------
Creates the HTML for a single country card.

Responsibilities:
-----------------
- Display country information
- Display the country flag
- Display basic country details
- Display a Favorite button

Author:
Enssah Fayia Momoh

Course:
WDD330 Final Project - Country Explorer App

==========================================================
*/

export default class CountryCard {
    /* Receives one Country model object. */

    constructor(country, isFavorite = false) {
        this.country = country;
        this.isFavorite = isFavorite;
    }

    /* Creates the HTML for a country card.
    Returns: HTML string */

    render() {
        return `
            <article class="country-card">

                <img
                    src="${this.country.flag}"
                    alt="Flag of ${this.country.name}"
                    class="country-flag"
                >

                <h3>${this.country.name}</h3>

                <p>
                    <strong>Capital:</strong>
                    ${this.country.capital}
                </p>

                <p>
                    <strong>Region:</strong>
                    ${this.country.region}
                </p>

                <p>
                    <strong>Population:</strong>
                    ${this.country.population.toLocaleString()}
                </p>

                <button type="button" class="favorite-button">
                ${this.isFavorite ? '★ Remove Favorite' : '★ Add Favorite'}
                </button>
            </article>
        `;
    }
}
