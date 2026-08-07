/* ==========================================================
Favorites Manager Test
Purpose:
---------
Tests the FavoritesManager module.
Responsibilities:
-----------------
- Add a favorite country
- Verify favorites are stored
- Verify localStorage is working

Author:
Enssah Fayia Momoh

Course:
WDD330 Final Project - Country Explorer App

========================================================== */

import FavoritesManager from './modules/FavoritesManager.mjs';

// Create the manager
const favoritesManager = new FavoritesManager();

// Sample country
const canada = {
    name: 'Canada',
    capital: 'Ottawa'
};

// Add Canada
favoritesManager.addFavorite(canada);

// Display favorites
console.log('Favorite Countries:');
console.log(favoritesManager.getFavorites());
