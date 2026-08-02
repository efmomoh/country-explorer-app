/*
==========================================================

Country Details Module

Purpose:
---------
Displays detailed information about a selected country.

Responsibilities:
-----------------
- Receive selected country
- Render country information
- Display flag, population, languages,
  currencies and map link

Author:
Enssah Fayia Momoh

Course:
WDD330 Final Project - Country Explorer App

==========================================================
*/

export default class CountryDetails {
    constructor(container) {
        this.container = container;
    }

    render(country) {
        if (!country) {
            this.container.innerHTML = '';
            return;
        }

        this.container.innerHTML = `
            <section class="country-details">
                <img
                    src="${country.flag}"
                    alt="Flag of ${country.name}"
                    class="details-flag"
                >
    
                <h2>${country.name}</h2>
    
                <p><strong>Capital:</strong> ${country.capital}</p>
    
                <p><strong>Region:</strong> ${country.region}</p>
    
                <p><strong>Subregion:</strong> ${country.subregion}</p>
    
                <p><strong>Population:</strong>
                    ${country.population.toLocaleString()}
                </p>
    
                <p><strong>Area:</strong>
                    ${country.area.toLocaleString()} km²
                </p>
    
                <p><strong>Languages:</strong>
                    ${country.languages.join(', ')}
                </p>
    
                <p><strong>Currencies:</strong>
                    ${country.currencies
                        .map((currency) => currency.name)
                        .join(', ')}
                </p>
    
                <p><strong>Time Zones:</strong>
                    ${country.timezones.join(', ')}
                </p>
    
                <p>
                    <a
                        href="${country.maps}"
                        target="_blank"
                        rel="noopener noreferrer">
                        View on Google Maps
                    </a>
                </p>
            </section>
        `;
    }
}
