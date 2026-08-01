/* ==========================================================

Header Component Module

Purpose:
---------
Creates the website navigation header.

Responsibilities:
-----------------
- Display application branding
- Display navigation links
- Provide accessible navigation structure

Author: Enssah Fayia Momoh
Course: WDD330 Final Project - Country Explorer App
========================================================== */

export default class Header {
    /* Constructor receivesthe header container element */
    constructor(container) {
        this.container = container;
    }

    /* Creates and displays the header markup */

    render() {
        this.container.innerHTML = `
            <div class="header-container">
                <a href="#home" class="logo" aria-label="Country Explorer Home">
                🌎<span> Country Explorer</span>
                </a>
                <nav class="navigation" aria-label="Main navigation">
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#countries">Countries</a></li>
                        <li><a href="#favorites">Favorites</a></li>
                        <li><a href="#about">About</a></li>
                    </ul>
                </nav>
            </div>
        `;
    }
}
