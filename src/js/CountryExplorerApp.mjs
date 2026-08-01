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
import Header from './components/Header.mjs';
import Hero from './components/Hero.mjs';
import SearchSection from './components/SearchSection.mjs';
import CountryGrid from './components/CountryGrid.mjs';
import Footer from './components/Footer.mjs';
import CountryAPI from '../api/CountryAPI.mjs';
import CountrySearch from './modules/CountrySearch.mjs';

export default class CountryExplorerApp {
    // Constructor: Creates the application object.
    constructor() {
        // Application information
        this.appName = 'Country Explorer';
        this.version = '1.0.0';

        // Application status
        this.isRunning = false;

        // Application Modules
        this.countryAPI = new CountryAPI();
        this.countrySearch = null;
        this.exchangeRateAPI = null;
        this.countryRenderer = null;

        // Application state
        this.initializeState();
        this.initializeModules();

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

    // initialize modules
    initializeModules() {
        this.countrySearch = new CountrySearch(this.countryAPI, this.state);
    }
    // Initialize Application: Controls the startup process.

    initialize() {
        // Get static containers from HTML
        this.cacheDOM();

        // Render components
        this.renderComponent(this.headerContainer, Header);
        this.renderComponent(this.heroContainer, Hero);
        this.renderComponent(this.searchContainer, SearchSection);

        this.renderComponent(this.countryContainer, CountryGrid);

        this.renderComponent(this.footerContainer, Footer);

        // Refresh DOM references after rendering
        this.cacheDOM();

        // Attach events after elements exist
        this.bindEvents();

        this.isRunning = true;
    }

    // Cache DOM Elements: Stores frequently used HTML elements.

    cacheDOM() {
        /* Header */
        this.headerContainer = document.querySelector('.site-header');

        /* Hero */
        this.heroContainer = document.querySelector('.hero-section');

        /* Search */
        this.searchContainer = document.querySelector('.search-container');

        /* Country Grid */
        this.countryContainer = document.querySelector('.country-container');

        /* Footer */
        this.footerContainer = document.querySelector('.site-footer');

        /* Search Form */
        this.searchForm = document.querySelector('.search-form');

        this.searchInput = document.querySelector('#country-search');

        this.regionFilter = document.querySelector('#region-filter');
    }

    /* Creates and renders a component.
    @param {HTMLElement} container - The DOM container.
    @param {Class} Component - The component class.
    */
    renderComponent(container, Component) {
        if (!container) {
            return;
        }

        const component = new Component(container);
        component.render();
    }

    // Bind Events: Handles user interactions.
    bindEvents() {
        if (this.searchForm) {
            this.searchForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                console.log('Search submitted');
                const searchValue = this.searchInput.value.trim();
                console.log('Search value:', searchValue);
                if (!searchValue) {
                    return;
                }

                const results =
                    await this.countrySearch.searchByName(searchValue);
                console.log('Search results:', results);
            });
        }
    }
    // bindEvents() {
    //     // Search Form Event - Future: This will connect to the CountryAPI class.
    //     if (this.searchForm) {
    //         this.searchForm.addEventListener('submit', (event) => {
    //             event.preventDefault();
    //             const searchValue = this.searchInput.value;
    //             console.log(searchValue);
    //             // Future: Send searchValue to CountryAPI
    //         });
    //     }
    // }
}
