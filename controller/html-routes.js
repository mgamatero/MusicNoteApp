// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");


// Routes
// =============================================================
module.exports = function (app) {
    app.get("/", function (req, res) {
        // res.sendFile(path.join(__dirname, '../views/index.html'));
        res.render('index.hbs')
     });
    app.get("/active", function (req, res) {
        // res.sendFile(path.join(__dirname, '../views/active.html')); -- keep?
        res.render('active.hbs')
    });
    app.get("/archived", function (req, res) {
        // res.sendFile(path.join(__dirname, '../views/archived.html')); 
        res.render('archived.hbs')
    });
    app.get("/about", function (req, res) {
        // res.sendFile(path.join(__dirname, '../views/about.html'));   -- keep?
        res.render('about.hbs')
    });
    // app.get("/about", function (req, res) {
    //     res.sendFile(path.join(__dirname, '../views/partials/header.hbs')); 
    // });
};