/*
==========================================================

ExchangeRateSection Component

Purpose:
---------
Displays exchange rate information
for the selected country.

Responsibilities:
-----------------
- Render exchange rate section
- Display converted currency
- Show loading message
- Show empty message

Author:
Enssah Fayia Momoh

Course:
WDD330 Final Project - Country Explorer App

==========================================================
*/

export default class ExchangeRateSection {
    /*
    Constructor

    Receives:
    ----------
    container
        DOM container.
    */

    constructor(container) {
        this.container = container;
    }

    /*
    ======================================================
    Render empty section
    ======================================================
    */

    render() {
        this.container.innerHTML = `
            <section class="exchange-rate-section">

                <h3>Exchange Rate</h3>

                <p class="empty-message">
                    Select a country to view
                    exchange rate information.
                </p>

            </section>
        `;
    }

    /*
    ======================================================
    Display exchange rate
    ======================================================
    */

    display(exchangeRate) {
        this.container.innerHTML = `
            <section class="exchange-rate-section">

                <h3>Exchange Rate</h3>

                <p>

                    <strong>${exchangeRate.amount}</strong>

                    ${exchangeRate.baseCurrency}

                    =

                    <strong>${exchangeRate.convertedAmount}</strong>

                    ${exchangeRate.targetCurrency}

                </p>

                <p>

                    Exchange Rate:
                    ${exchangeRate.rate}

                </p>

                <p>

                    Updated:
                    ${exchangeRate.lastUpdated}

                </p>

            </section>
        `;
    }

    /*
    ======================================================
    Display loading message
    ======================================================
    */

    showLoading() {
        this.container.innerHTML = `
            <section class="exchange-rate-section">

                <h3>Exchange Rate</h3>

                <p>Loading exchange rate...</p>

            </section>
        `;
    }

    /*
    ======================================================
    Display error
    ======================================================
    */

    showError(message) {
        this.container.innerHTML = `
            <section class="exchange-rate-section">

                <h3>Exchange Rate</h3>

                <p class="error-message">

                    ${message}

                </p>

            </section>
        `;
    }
}
