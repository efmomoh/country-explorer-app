/*
==========================================================

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
- Manage the home/search view
- Manage the country details view
- Connect country selection
- Connect favorites
- Connect exchange rates

Author:
Enssah Fayia Momoh

Course:
WDD330 Final Project - Country Explorer App

==========================================================
*/

// ======================================================
// Imports
// ======================================================

import Header from './components/Header.mjs';
import Hero from './components/Hero.mjs';
import SearchSection from './components/SearchSection.mjs';
import CountryGrid from './components/CountryGrid.mjs';
import Footer from './components/Footer.mjs';

import CountryAPI from '../api/CountryAPI.mjs';

import CountrySearch from './modules/CountrySearch.mjs';
import CountryDetails from './modules/CountryDetails.mjs';
import FavoritesManager from './modules/FavoritesManager.mjs';

import FavoritesSection from './components/FavoritesSection.mjs';

import ExchangeRateAPI from '../api/ExchangeRateAPI.mjs';
import ExchangeRateService from './modules/ExchangeRateService.mjs';

// ======================================================
// CountryExplorerApp
// ======================================================

export default class CountryExplorerApp {
    /*
    ======================================================
    Constructor
    ======================================================
    */

    constructor() {
        /*
        Application information
        */

        this.appName = 'Country Explorer';

        this.version = '1.0.0';

        /*
        Application status
        */

        this.isRunning = false;

        /*
        ==================================================
        Application Modules
        ==================================================
        */

        this.countryAPI = new CountryAPI();

        this.countrySearch = null;

        this.countryDetails = null;

        this.favoritesManager = null;

        this.exchangeRateAPI = null;

        this.exchangeRateService = null;

        this.countryGrid = null;

        this.favoritesSection = null;

        /*
        ==================================================
        Application State
        ==================================================
        */

        this.initializeState();

        /*
        Initialize modules that do not
        require DOM elements.
        */

        this.initializeModules();

        /*
        Start application.
        */

        this.initialize();
    }

    /*
    ======================================================
    Initialize State
    ======================================================
    */

    initializeState() {
        this.state = {
            countries: [],

            searchResults: [],

            selectedCountry: null,

            favoriteCountries: [],

            selectedRegion: null,

            exchangeRate: null
        };
    }

    /*
    ======================================================
    Initialize Modules
    ======================================================
    */

    initializeModules() {
        /*
        Country Search
        */

        this.countrySearch = new CountrySearch(this.countryAPI, this.state);

        /*
        Favorites
        */

        this.favoritesManager = new FavoritesManager();

        /*
        Exchange Rate API
        */

        this.exchangeRateAPI = new ExchangeRateAPI();

        /*
        Exchange Rate Service
        */

        this.exchangeRateService = new ExchangeRateService(
            this.exchangeRateAPI,
            this.state
        );
    }

    /*
    ======================================================
    Initialize Application
    ======================================================
    */

    initialize() {
        /*
        Get DOM elements.
        */

        this.cacheDOM();

        /*
        Render static components.
        */

        this.renderComponent(this.headerContainer, Header);

        this.renderComponent(this.heroContainer, Hero);

        this.renderComponent(this.searchContainer, SearchSection);

        /*
        Create Country Grid.
        */

        this.countryGrid = new CountryGrid(
            this.countryContainer,
            this.favoritesManager
        );

        this.countryGrid.render();

        /*
        Render Favorites Section.
        */

        this.favoritesSection = this.renderComponent(
            this.favoritesContainer,
            FavoritesSection
        );

        /*
        Render Footer.
        */

        this.renderComponent(this.footerContainer, Footer);

        /*
        Refresh DOM references.

        This is important because some components
        have now been rendered.
        */

        this.cacheDOM();

        /*
        ==================================================
        Country Details
        ==================================================

        CountryDetails receives the ExchangeRateService
        so it can load the exchange rate itself.
        */

        this.countryDetails = new CountryDetails(
            this.detailsContainer,
            this.exchangeRateService
        );

        this.countryDetails.setBackToSearchCallback(() => {
            this.state.selectedCountry = null;
            this.showHomeView();
        });

        /*
        ==================================================
        Start on Home/Search View
        ==================================================
        */

        this.showHomeView();

        /*
        ==================================================
        Connect Country Selection
        ==================================================
        */

        this.countryGrid.setCountrySelectedCallback((country) => {
            /*
                Save selected country.
                */

            this.state.selectedCountry = country;

            /*
                Switch from Home/Search
                to Country Details.
                */

            this.showDetailsView();

            /*
                Render selected country.

                CountryDetails will also load
                the exchange rate.
                */

            this.countryDetails.render(country);
        });

        /*
        ==================================================
        Connect Favorite Selection
        ==================================================
        */

        this.countryGrid.setFavoriteSelectedCallback((country) => {
            /*
                Toggle favorite.
                */

            this.favoritesManager.toggleFavorite(country);

            /*
                Refresh country cards.
                */

            this.countryGrid.displayCountries(this.state.searchResults);

            /*
                Refresh favorites section.
                */

            this.favoritesSection.displayFavorites(
                this.favoritesManager.getFavorites()
            );
        });

        /*
        ==================================================
        Connect Favorites Section
        ==================================================
        */

        this.favoritesSection.setFavoriteSelectedCallback((country) => {
            /*
                Save selected country.
                */

            this.state.selectedCountry = country;

            /*
                Switch to details view.
                */

            this.showDetailsView();

            /*
                Render selected country.
                */

            this.countryDetails.render(country);
        });

        /*
        ==================================================
        Display Existing Favorites
        ==================================================
        */

        this.favoritesSection.displayFavorites(
            this.favoritesManager.getFavorites()
        );

        /*
        Attach application events.
        */

        this.bindEvents();

        /*
        Application is ready.
        */

        this.isRunning = true;
    }

    /*
    ======================================================
    Show Home/Search View
    ======================================================

    Displays:

    - Hero
    - Search
    - Country Grid
    - Favorites

    Hides:

    - Country Details
    ======================================================
    */

    showHomeView() {
        /*
        Show Home/Search components.
        */

        if (this.heroContainer) {
            this.heroContainer.hidden = false;
        }

        if (this.searchContainer) {
            this.searchContainer.hidden = false;
        }

        if (this.countryContainer) {
            this.countryContainer.hidden = false;
        }

        if (this.favoritesContainer) {
            this.favoritesContainer.hidden = false;
        }

        /*
        Hide Country Details.
        */

        if (this.detailsContainer) {
            this.detailsContainer.hidden = true;
        }
    }

    /*
    ======================================================
    Show Country Details View
    ======================================================

    Displays:

    - Country Details

    Hides:

    - Hero
    - Search
    - Country Grid
    - Favorites
    ======================================================
    */

    showDetailsView() {
        /*
        Hide Home/Search components.
        */

        if (this.heroContainer) {
            this.heroContainer.hidden = true;
        }

        if (this.searchContainer) {
            this.searchContainer.hidden = true;
        }

        if (this.countryContainer) {
            this.countryContainer.hidden = true;
        }

        if (this.favoritesContainer) {
            this.favoritesContainer.hidden = true;
        }

        /*
        Show Country Details.
        */

        if (this.detailsContainer) {
            this.detailsContainer.hidden = false;
        }

        /*
        Scroll to the details section.
        */

        if (this.detailsContainer) {
            this.detailsContainer.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    /*
    ======================================================
    Cache DOM Elements
    ======================================================
    */

    cacheDOM() {
        /*
        Header
        */

        this.headerContainer = document.querySelector('.site-header');

        /*
        Hero
        */

        this.heroContainer = document.querySelector('.hero-section');

        /*
        Favorites
        */

        this.favoritesContainer = document.querySelector(
            '.favorites-container'
        );

        /*
        Search
        */

        this.searchContainer = document.querySelector('.search-container');

        /*
        Country Grid
        */

        this.countryContainer = document.querySelector('.country-container');

        /*
        Footer
        */

        this.footerContainer = document.querySelector('.site-footer');

        /*
        Search Form
        */

        this.searchForm = document.querySelector('.search-form');

        /*
        Search Input
        */

        this.searchInput = document.querySelector('#country-search');

        /*
        Region Filter
        */

        this.regionFilter = document.querySelector('#region-filter');

        /*
        Country Details
        */

        this.detailsContainer = document.querySelector('.details-container');
    }

    /*
    ======================================================
    Render Component
    ======================================================
    */

    renderComponent(container, Component) {
        if (!container) {
            return null;
        }

        const component = new Component(container);

        component.render();

        return component;
    }

    /*
    ======================================================
    Bind Application Events
    ======================================================
    */

    bindEvents() {
        /*
        Make sure the search form exists.
        */

        if (!this.searchForm) {
            return;
        }

        /*
        ==================================================
        Search Form
        ==================================================
        */

        this.searchForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const searchValue = this.searchInput.value.trim();

            /*
                Do nothing if search is empty.
                */

            if (!searchValue) {
                return;
            }

            /*
                Make sure we are on the
                Home/Search view.
                */

            this.showHomeView();

            try {
                /*
                    Display loading message.
                    */

                this.countryGrid.showLoading();

                /*
                    Clear selected country.
                    */

                this.state.selectedCountry = null;

                /*
                    Search for country.
                    */

                const results =
                    await this.countrySearch.searchByName(searchValue);

                /*
                    Save search results.
                    */

                this.state.searchResults = results;

                /*
                    Display results.
                    */

                this.countryGrid.displayCountries(results);
            } catch (error) {
                console.error('Country search failed:', error);

                this.countryGrid.showError(
                    'Unable to load countries. Please try again.'
                );
            }
        });

        /*
        ==================================================
        Region Filter
        ==================================================
        */

        if (this.regionFilter) {
            this.regionFilter.addEventListener('change', async () => {
                const region = this.regionFilter.value;

                /*
                    Return to Home/Search view.
                    */

                this.showHomeView();

                try {
                    /*
                        Show loading.
                        */

                    this.countryGrid.showLoading();

                    /*
                        Clear selected country.
                        */

                    this.state.selectedCountry = null;

                    /*
                        Clear search input.
                        */

                    if (this.searchInput) {
                        this.searchInput.value = '';
                    }

                    /*
                        Search by region.
                        */

                    const results =
                        await this.countrySearch.searchByRegion(region);

                    /*
                        Save results.
                        */

                    this.state.searchResults = results;

                    /*
                        Display results.
                        */

                    this.countryGrid.displayCountries(results);
                } catch (error) {
                    console.error('Region search failed:', error);

                    this.countryGrid.showError(
                        'Unable to load countries. Please try again.'
                    );
                }
            });
        }
    }
}
