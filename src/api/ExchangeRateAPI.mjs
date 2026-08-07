/* ==========================================================

ExchangeRateAPI Module

Purpose:
---------
Handles communication with ExchangeRate-API.

Responsibilities:
-----------------
- Send API requests
- Retrieve latest exchange rates
- Convert currencies
- Validate responses
- Handle request errors

Author:
Enssah Fayia Momoh

Course:
WDD330 Final Project - Country Explorer App

========================================================== */

export default class ExchangeRateAPI {
    constructor() {
        /*
        ExchangeRate-API endpoint
        */

        this.baseURL = 'https://v6.exchangerate-api.com/v6';

        /*
        API Key
        */

        this.apiKey = import.meta.env.VITE_EXCHANGE_RATE_KEY;
    }

    /*
    ======================================================
    Generic Request Method
    ======================================================
    */

    async request(endpoint) {
        const response = await fetch(
            `${this.baseURL}/${this.apiKey}/${endpoint}`
        );

        if (!response.ok) {
            throw new Error(
                `Exchange Rate API request failed (${response.status})`
            );
        }

        const data = await response.json();
        console.log(data);
        if (data.result !== 'success') {
            throw new Error(
                data['error-type'] || 'Exchange Rate API returned an error.'
            );
        }

        return data;
    }

    /*
    ======================================================
    Latest Exchange Rates
    ======================================================
    */

    async getLatestRates(baseCurrency) {
        return await this.request(`latest/${baseCurrency}`);
    }

    /*
    ======================================================
    Currency Conversion
    ======================================================
    */

    async convertCurrency(from, to, amount) {
        return await this.request(`pair/${from}/${to}/${amount}`);
    }
}
