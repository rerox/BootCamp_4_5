"use strict";
/**
 * Created by Kamil on 2016-12-11.
 */
var ProductModel = require("./product");
var Products = (function () {
    function Products(products) {
        if (products === void 0) { products = []; }
        var _this = this;
        this.productsList = new Array();
        products.forEach(function (product) { return _this.productsList.push(product); });
    }
    Products.prototype.list = function () {
        return this.productsList;
    };
    Products.prototype.add = function (productName, productQuantity) {
        var productIds = this.productsList.map(function (product) { return product.getId(); });
        var productId = Math.max.apply(Math, productIds) + 1;
        var product = new ProductModel.Product(productId, productName, productQuantity);
        this.productsList.push(product);
        return this.productsList;
    };
    Products.prototype.delete = function (productId) {
        var deleted = false;
        this.productsList = this.productsList.filter(function (product) {
            deleted = deleted || product.getId() === productId;
            return product.getId() !== productId;
        });
        return deleted;
    };
    Products.prototype.fetch = function (productId) {
        return productId && this.productsList.filter(function (product) { return product.getId() === productId; }).shift();
    };
    Products.prototype.find = function (productQuery) {
        var productId = parseInt(productQuery);
        productQuery = productQuery.toLowerCase();
        return this.productsList.filter(function (product) { return product.getId() === productId
            || product.getName().toLowerCase() === productQuery; }).shift();
    };
    return Products;
}());
exports.Products = Products;
//# sourceMappingURL=products.js.map