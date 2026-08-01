/*
==========================================================

Country Grid Component Module

Purpose:
---------
Creates the area where country cards
will be displayed.

Responsibilities:
-----------------
- Display country results container
- Provide placeholder content
- Prepare structure for REST Countries API data

Author: Enssah Fayia Momoh
Course: WDD330 Final Project - Country Explorer App

==========================================================
*/

export default class CountryGrid {
    // Receives the country grid container
    constructor(container) {
        this.container = container;
    }

    // Render country grid container
    render() {
        this.container.innerHTML = `
        <section class="country-section" id="countries" aria-labelledby="country-title">
            <h2 id="country-title">Countries</h2>
            <div class="country-grid">
                <p class="empty-message">Search for a country to explore information.</p>
            </div>
        </section>
        `;
    }
}
