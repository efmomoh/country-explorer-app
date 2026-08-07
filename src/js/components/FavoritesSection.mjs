/*
==========================================================

Favorites Section Component

Purpose:
---------
Displays the user's favorite countries.

Responsibilities:
-----------------
- Render the Favorites section
- Display saved favorite countries
- Display an empty message when no favorites exist
- Notify the application when a favorite is selected

Author:
Enssah Fayia Momoh

Course:
WDD330 Final Project - Country Explorer App

==========================================================
*/

export default class FavoritesSection {
    constructor(container) {
        this.container = container;

        this.list = null;

        // Callback supplied by CountryExplorerApp
        this.onFavoriteSelected = null;
    }

    /*
    Render the Favorites section.
    */

    render() {
        this.container.innerHTML = `
            <section
                class="favorites-section"
                id="favorites"
                aria-labelledby="favorites-title">

                <h2 id="favorites-title">

                    Favorite Countries

                </h2>

                <div class="favorites-list">

                    <p class="empty-message">

                        No favorite countries yet.

                    </p>

                </div>

            </section>
        `;

        this.list = this.container.querySelector('.favorites-list');
    }

    /*
    Allows the application to respond
    when a favorite country is clicked.
    */

    setFavoriteSelectedCallback(callback) {
        this.onFavoriteSelected = callback;
    }

    /*
    Display favorite countries.
    */

    displayFavorites(favorites) {
        if (!favorites.length) {
            this.list.innerHTML = `
                <p class="empty-message">

                    No favorite countries yet.

                </p>
            `;

            return;
        }

        this.list.innerHTML = favorites
            .map((country, index) => {
                return `
                    <button
                        class="favorite-country"
                        data-index="${index}">

                        ${country.name}

                    </button>
                `;
            })
            .join('');

        this.addFavoriteEvents(favorites);
    }

    /*
    Attach click events to favorites.
    */

    addFavoriteEvents(favorites) {
        const buttons = this.list.querySelectorAll('.favorite-country');

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const index = button.dataset.index;

                const country = favorites[index];

                if (this.onFavoriteSelected) {
                    this.onFavoriteSelected(country);
                }
            });
        });
    }
}
