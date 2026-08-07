/*
==========================================================

Favorites Manager Module

Purpose:
---------
Manages the user's favorite countries.

Responsibilities:
-----------------
- Load favorites from localStorage
- Save favorites to localStorage
- Add countries to favorites
- Remove countries from favorites
- Check if a country is already a favorite
- Return the user's favorite countries

Author:
Enssah Fayia Momoh

Course:
WDD330 Final Project - Country Explorer App

==========================================================
*/

export default class FavoritesManager {
    /*
    Creates the Favorites Manager.

    A storage key is used so all favorite
    countries are stored under one location
    inside the browser's localStorage.
    */

    constructor() {
        // LocalStorage key
        this.storageKey = 'favoriteCountries';

        // Load any previously saved favorites
        this.favorites = this.loadFavorites();
    }

    /*
    Loads favorite countries from localStorage.

    Returns:
    --------
    Array of favorite countries.

    If no favorites exist yet,
    an empty array is returned.
    */

    loadFavorites() {
        const savedFavorites = localStorage.getItem(this.storageKey);

        if (!savedFavorites) {
            return [];
        }

        return JSON.parse(savedFavorites);
    }

    /* Saves the current favorites array into localStorage.
    This method is called automatically  whenever favorites are added or removed. */

    saveFavorites() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
    }

    /* Returns all favorite countries.
    Returns: Array of favorite country objects.  */

    getFavorites() {
        return this.favorites;
    }

    /* Determines whether a country already exists in favorites.

    Parameter:
    country : Country object

    Returns:
    --------
    true  -> already saved
    false -> not saved
    */

    isFavorite(country) {
        return this.favorites.some((favorite) => {
            return favorite.name === country.name;
        });
    }

    /* Adds a country to favorites.
    Duplicate countries are ignored.
    Parameter:
    country : Country object */

    addFavorite(country) {
        if (this.isFavorite(country)) {
            return;
        }
        this.favorites.push(country);
        this.saveFavorites();
    }

    /*  Removes a country from favorites.
    Parameter:
    country : Country object */

    removeFavorite(country) {
        this.favorites = this.favorites.filter((favorite) => {
            return favorite.name !== country.name;
        });
        this.saveFavorites();
    }

    /* Adds or removes a country depending on its current status.
    If the country already exists, it is removed.
    Otherwise, it is added.
    Parameter:
    country : Country object */

    toggleFavorite(country) {
        if (this.isFavorite(country)) {
            this.removeFavorite(country);
        } else {
            this.addFavorite(country);
        }
    }
}
