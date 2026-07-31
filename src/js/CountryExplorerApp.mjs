/* ==========================================================
CountryExplorerApp Class

Purpose:
---------
This class serves as the main controller of the
Country Explorer application.

Responsibilities:
-----------------
- Initialize the application
- Store application settings
- Connect application modules
- Manage application state

Author: Enssah Fayia Momoh
Course: WDD330 Final Project - Country Explorer App
========================================================== */

// imports
import Footer from './components/Footer.mjs';

export default class CountryExplorerApp {
    // Constructor: Creates the application object.
    constructor() {
        // Application information
        this.appName = 'Country Explorer';
        this.version = '1.0.0';

        // Application status
        this.isRunning = false;

        // Application Modules
        // These will be connected later.
        this.countryAPI = null;
        this.exchangeRateAPI = null;
        this.countryRenderer = null;

        // Application state
        this.initializeState();

        // Start Application
        this.initialize();
    }

    initializeState() {
        this.state = {
            countries: [],
            searchResults: [],
            selectedCountry: null,
            favoriteCountries: [],
            selectedRegion: null
        };
    }

    // Initialize Application: Controls the startup process.

    initialize() {
        this.cacheDOM();
        this.bindEvents();
        this.isRunning = true;
        this.initializeFoter();
    }

    // Cache DOM Elements: Stores frequently used HTML elements.

    cacheDOM() {
        // Search form
        this.searchForm = document.querySelector('.search-form');

        // Search input
        this.searchInput = document.querySelector('#country-search');

        // Region filter
        this.regionFilter = document.querySelector('#region-filter');

        // Footer
        this.footer = document.querySelector('.site-footer');
    }

    // Bind Events: Handles user interactions.
    bindEvents() {
        // Search Form Event - Future: This will connect to the CountryAPI class.
        if (this.searchForm) {
            this.searchForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const searchValue = this.searchInput.value;
                console.log(searchValue);
                // Future: Send searchValue to CountryAPI
            });
        }
    }

    // initialize footer
    initializeFoter() {
        const footerContainer = document.querySelector('.site-footer');
        if (footerContainer) {
            const footer = new Footer(footerContainer);
            footer.render();
        }
    }
}
