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
    constructor(container, exchangeRateService) {
        this.container = container;
        this.exchangeRateService = exchangeRateService;
        this.onBackToSearch = null;
    }

    render(country) {
        // console.log("DETAILS:", country);
        if (!country) {
            this.container.innerHTML = '';
            return;
        }

        this.container.innerHTML = `
            <section class="country-details">

            <button
    type="button"
    class="back-to-search"
>
    ← Back to Search
</button>

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

                <div class="exchange-rate">

                <div class="exchange-rate">
                <p>Loading current exchange rate...</p>
            </div>

        </div>
            </section>
        `;

        this.loadExchangeRate(country);

        const backButton = this.container.querySelector('.back-to-search');

        if (backButton) {
            backButton.addEventListener('click', () => {
                if (this.onBackToSearch) {
                    this.onBackToSearch();
                }
            });
        }
    }

    /*
======================================================
Load Exchange Rate

Purpose:
--------
Loads currency conversion information
for the selected country.

Example:
--------
100 USD -> CAD
======================================================
*/

    async loadExchangeRate(country) {
        try {
            /*
            Get country's currency code
            */

            const currency = country.currencies[0].code;

            /*
            Request exchange rate
            */

            const exchange = await this.exchangeRateService.convertCurrency(
                'USD',
                currency,
                100
            );

            /*
            Find exchange rate container
            */

            const exchangeContainer =
                this.container.querySelector('.exchange-rate');

            /*
            Display exchange information
            */

            exchangeContainer.innerHTML = `

            <h3>Exchange Rate</h3>

            <p>
            <strong>1 USD</strong> =
            ${exchange.rate.toFixed(4)}
            ${exchange.targetCurrency}
        </p>
        <p>
        <strong>100 USD</strong> =
        ${exchange.convertedAmount.toLocaleString()}
        ${exchange.targetCurrency}
    </p>

            <small>
                Updated:
                ${exchange.lastUpdated}
            </small>

        `;
        } catch (error) {
            console.error('Exchange rate loading failed:', error);

            const exchangeContainer =
                this.container.querySelector('.exchange-rate');

            exchangeContainer.innerHTML = `

            <h3>Exchange Rate</h3>

            <p class="error-message">
            Exchange rate is currently unavailable.
        </p>

        `;
        }
    }

    // back to search callback
    setBackToSearchCallback(callback) {
        this.onBackToSearch = callback;
    }
}
