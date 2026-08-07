/* ==========================================================

ExchangeRate Model

Purpose:
---------
Represents a currency conversion returned
by ExchangeRate-API.

Responsibilities:
-----------------
- Store conversion information
- Provide a clean object for the application
- Hide raw API response structure

Author:
Enssah Fayia Momoh

Course:
WDD330 Final Project - Country Explorer App

========================================================== */

export default class ExchangeRate {
    /*
    Constructor

    Receives:
    ----------
    exchangeData
        JSON returned by ExchangeRate-API.
    */

    constructor(exchangeData) {
        /*
        Currency information
        */

        this.baseCurrency = exchangeData.base_code;

        this.targetCurrency = exchangeData.target_code;

        /*
        Exchange information
        */

        this.rate = exchangeData.conversion_rate;

        this.convertedAmount = exchangeData.conversion_result;

        /*
        Time information
        */

        this.lastUpdated = exchangeData.time_last_update_utc;

        this.nextUpdate = exchangeData.time_next_update_utc;
    }
}
