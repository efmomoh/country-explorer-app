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
        this.renderComponent(this.headerContainer, Header);
        this.renderComponent(this.heroContainer, Hero);
        this.renderComponent(this.searchContainer, SearchSection);
        this.renderComponent(this.countryContainer, CountryGrid);
        this.renderComponent(this.footerContainer, Footer);
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
}
