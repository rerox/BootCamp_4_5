"use strict";
/**
 * Created by Kamil on 2016-12-10.
 */
var express = require("express");
var ProductsRoute = require("./routes/products");
var bodyParser = require("body-parser");
var path = require("path");
// import {Products} from "./routes/products";
var Server = (function () {
    function Server() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.setRoutes();
        this.setStaticRoutes();
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.setRoutes = function () {
        var router = express.Router();
        // router.use(IndexRoute.Index.routes());
        router.use(ProductsRoute.Products.routes());
        this.app.use(router);
    };
    Server.prototype.setStaticRoutes = function () {
        this.app.use('/node_modules', express.static(path.join(__dirname, '../../node_modules')));
        console.log('Ścieżka:' + path.join(__dirname, '../../node_modules'));
        this.app.use(express.static(path.join(__dirname, '../client')));
    };
    Server.prototype.startServer = function () {
        this.app.listen(3005, function () {
            console.log("Application listening on 3005");
        });
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=server.js.map