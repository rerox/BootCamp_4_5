"use strict";
/**
 * Created by Kamil on 2016-12-11.
 */
var express = require("express");
var Index = (function () {
    function Index() {
    }
    Index.routes = function () {
        var router = express.Router();
        var indexRoute = new Index();
        router.get('/', indexRoute.index.bind(indexRoute));
        return router;
    };
    Index.prototype.index = function (req, res) {
        res.send('This is Index site :-)');
    };
    return Index;
}());
exports.Index = Index;
//# sourceMappingURL=index.js.map