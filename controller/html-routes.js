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
        res.sendFile(path.join(__dirname, '../views/index.html'));
        
    });
    app.get("/active", function (req, res) {
        res.sendFile(path.join(__dirname, '../views/active.html'));
        
    });
    app.get("/archived", function (req, res) {
        res.sendFile(path.join(__dirname, '../views/archived.html'));
        
    });
};