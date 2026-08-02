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
import CountryDetails from './modules/CountryDetails.mjs';

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
        this.countryDetails = null;
        this.exchangeRateAPI = null;
        this.countryGrid = null;

        // Application state
        this.initializeState();
        this.initializeModules();

        // Start Application
        this.initialize();
    }

    // Initializes the application state.
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
        // this.countryDetails = new CountryDetails(this.detailsContainer);
    }

    // Initialize Application: Controls the startup process.

    initialize() {
        // Get static containers from HTML
        this.cacheDOM();

        // Create modules after DOM exists
        // this.initializeModules();

        // Render components
        this.renderComponent(this.headerContainer, Header);
        this.renderComponent(this.heroContainer, Hero);
        this.renderComponent(this.searchContainer, SearchSection);

        this.countryGrid = this.renderComponent(this.countryContainer, CountryGrid);

        this.renderComponent(this.footerContainer, Footer);

        // Refresh DOM references after rendering
        this.cacheDOM();

        // Create details module after DOM exists
        this.countryDetails = new CountryDetails(this.detailsContainer);

        // Connect country selection
        this.countryGrid.setCountrySelectedCallback((country) => {
            this.state.selectedCountry = country;
            this.countryDetails.render(country);
        });

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

        // Country details 
        this.detailsContainer = document.querySelector('.details-container');

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
        return component;
    }

    // Bind Events: Handles user interactions.
    bindEvents() {
        if (!this.searchForm) {
            return;
        }

        // search form listener 
        this.searchForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const searchValue = this.searchInput.value.trim();

            if (!searchValue) {
                return;
            }

            // const results = await this.countrySearch.searchByName(searchValue);
            // this.countryGrid.displayCountries(results);
            try {
                const results =
                    await this.countrySearch.searchByName(searchValue);

                this.countryGrid.displayCountries(results);

            } catch (error) {
                console.error(error);
            }
        }
        );

        // region filter listener
    }
}
