/* ==========================================================

ExchangeRateService Module

Purpose:
---------
Handles exchange rate operations for the
Country Explorer application.

Responsibilities:
-----------------
- Request exchange rates from the API
- Convert API responses into ExchangeRate models
- Store exchange rate data in application state

Author:
Enssah Fayia Momoh

Course:
WDD330 Final Project - Country Explorer App

========================================================== */

import ExchangeRate from '../models/ExchangeRate.mjs';

export default class ExchangeRateService {
    /*
    Constructor
    */

    constructor(exchangeRateAPI, state) {
        this.exchangeRateAPI = exchangeRateAPI;

        this.state = state;
    }

    /*
    ======================================================
    Convert Currency
    ======================================================
    */

    async convertCurrency(from, to, amount) {
        const response = await this.exchangeRateAPI.convertCurrency(
            from,
            to,
            amount
        );

        const exchangeRate = this.createExchangeRate(response);

        /*
        Save inside application state
        */

        this.state.exchangeRate = exchangeRate;

        return exchangeRate;
    }

    /*
    ======================================================
    Latest Rates
    ======================================================
    */

    async getLatestRates(baseCurrency) {
        return await this.exchangeRateAPI.getLatestRates(baseCurrency);
    }

    /*
    ======================================================
    Convert raw JSON into ExchangeRate model
    ======================================================
    */

    createExchangeRate(exchangeData) {
        return new ExchangeRate(exchangeData);
    }
}
