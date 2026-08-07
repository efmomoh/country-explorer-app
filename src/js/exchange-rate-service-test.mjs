/*
==========================================================

ExchangeRateService Test

Purpose:
---------
Tests the ExchangeRateAPI and
ExchangeRateService modules.

Author:
Enssah Fayia Momoh

Course:
WDD330 Final Project - Country Explorer App

==========================================================
*/

import ExchangeRateAPI from '../api/ExchangeRateAPI.mjs';
import ExchangeRateService from './modules/ExchangeRateService.mjs';
/*
----------------------------------------------------------
Create a temporary application state
----------------------------------------------------------
*/

const state = {
    exchangeRate: null
};

/*
----------------------------------------------------------
Create API and Service
----------------------------------------------------------
*/

const exchangeRateAPI = new ExchangeRateAPI();

const exchangeRateService = new ExchangeRateService(exchangeRateAPI, state);

/*
----------------------------------------------------------
Run Test
----------------------------------------------------------
*/

async function runTest() {
    try {
        console.log('==============================');
        console.log('Testing ExchangeRateService...');
        console.log('==============================');

        const exchangeRate = await exchangeRateService.convertCurrency(
            'USD',
            'CAD',
            100
        );

        console.log('ExchangeRate Model');
        console.log(exchangeRate);

        console.log('------------------------------');

        console.log('Application State');
        console.log(state);

        console.log('------------------------------');

        console.log(`100 USD = ${exchangeRate.convertedAmount} CAD`);
    } catch (error) {
        console.error('Exchange Rate Test Failed');
        console.error(error);
    }
}

runTest();
