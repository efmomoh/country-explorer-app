/* ==========================================================
Hero Component Module

Purpose:
---------
Creates the homepage hero section.

Responsibilities:
-----------------
- Display application introduction
- Provide a call-to-action area
- Create the homepage first impression

Author: Enssah Fayia Momoh
Course: WDD330 Final Project - Country Explorer App
========================================================== */

export default class Hero {
    /* Constructor receives the hero container element */
    constructor(container) {
        this.container = container;
    }

    /* Render hero content dynamically */

    render() {
        this.container.innerHTML = `
            <section class="hero-content" aria-labelledby="hero-title">
                <div class="hero-text">
                    <h1 id="hero-title">Explore The World One Country at a Time With Country Explorer</h1>
                    <p>
                        Discover information about countries,
                        including capitals, population,
                        languages, currencies, and more.
                    </p>
                    <a href="#search" class="hero-button">Start Exploring</a>
                </div>

                <div class="hero-image" aria-hidden="true">🌎</div>
            </section>
        `;
    }
}
