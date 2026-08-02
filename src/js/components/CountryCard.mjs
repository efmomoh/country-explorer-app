/*
==========================================================

Country Card Component Module

Purpose:
---------
Displays information for a single country.

Responsibilities:
-----------------
- Display country flag
- Display country name
- Display capital city
- Display region
- Display population

Author:
Enssah Fayia Momoh

Course:
WDD330 Final Project - Country Explorer App

==========================================================
*/

export default class CountryCard {
    constructor(country) {
        this.country = country;
    }

    render() {
        return `
        <article class="country-card">

            <img
                class="country-flag"
                src="${this.country.flag}"
                alt="Flag of ${this.country.name}"
            >

            <div class="country-card-content">

                <h3 class="country-name">
                    ${this.country.name}
                </h3>

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

            </div>

        </article>
        `;
    }
}
