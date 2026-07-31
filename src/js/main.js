/* ==========================================================
Country Explorer App

Main JavaScript Entry File

Purpose:
This file starts our application.
Every other JavaScript module will eventually
be imported here.
========================================================== */
import CountryExplorerApp from './CountryExplorerApp.mjs';

/* ==========================================================
Create the Application Object
========================================================== */
const app = new CountryExplorerApp();

/* ==========================================================
Start the Application
========================================================== */
app.initialize();
