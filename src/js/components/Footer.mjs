/* ==========================================================
Footer Component Module

Purpose:
---------
Creates and renders the application footer dynamically.

Responsibilities:
-----------------
- Generate footer HTML markup
- Display application information
- Provide accessibility-friendly footer content

Author: Enssah Fayia Momoh
Course: WDD330 Final Project - Country Explorer App

========================================================== */

export default class Footer {
    /* ======================================================
    Constructor: Receives the footer container element.
    ====================================================== */

    constructor(container) {
        this.container = container;
        this.appName = 'Country Explorer';
        this.year = new Date().getFullYear();
    }

    /* ======================================================
    Render Footer: Creates the footer markup dynamically.
    ====================================================== */
    render() {
        this.container.innerHTML = `
            <div class="footer-content">
                <section class="footer-brand">
                    <h2>
                    🌍 ${this.appName}
                    </h2>
                    <p>
                        Explore countries around the world
                        and discover information about
                        cultures, locations, currencies,
                        and more.
                    </p>
                </section>

                <section class="footer-links" aria-label="Footer navigation">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#explore">Explore Countries</a></li>
                        <li><a href="#favorites">Favorites</a></li>
                        <li><a href="#">About</a></li>
                    </ul>
                </section>

                <section class="footer-api">
                    <h3>Data Sources</h3>
                    <p>
                        Country information provided by
                        REST Countries API.
                    </p>

                    <p>
                        Currency conversion provided by
                        ExchangeRate API.
                    </p>
                </section>

            </div>
            <div class="footer-bottom">
                <p>
                    &copy; ${this.year}
                    ${this.appName}.
                    All rights reserved.
                </p>
                <p>MIT Licensed.</p>
            </div>
        `;
    }
}
