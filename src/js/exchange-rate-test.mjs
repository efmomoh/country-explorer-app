import ExchangeRateAPI from '../api/ExchangeRateAPI.mjs';

const exchangeAPI = new ExchangeRateAPI();

async function test() {
    try {
        const result = await exchangeAPI.convertCurrency('USD', 'CAD', 100);

        console.log('Exchange result:', result);
    } catch (error) {
        console.error(error);
    }
}

test();
