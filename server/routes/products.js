"use strict";
/**
 * Created by Kamil on 2016-12-11.
 */
var express = require("express");
var Product = require("../model/product");
var ProductsModel = require("../model/products");
var Products = (function () {
    function Products() {
        this.productList = new ProductsModel.Products([
            new Product.Product(1, 'ABC', 1),
            new Product.Product(2, 'DEF', 4),
            new Product.Product(3, 'GHI')
        ]);
    }
    Products.routes = function () {
        var router = express.Router();
        var productsRoute = new Products();
        router.get('/products/', productsRoute.index.bind(productsRoute));
        router.post('/products/', productsRoute.create.bind(productsRoute));
        router.delete('/products/:product_id', productsRoute.delete.bind(productsRoute));
        router.get('/products/:product', productsRoute.find.bind(productsRoute));
        router.post('/products/delete/:product_id', productsRoute.delete.bind(productsRoute));
        return router;
    };
    Products.prototype.index = function (req, res) {
        res.json(this.productList);
    };
    Products.prototype.create = function (req, res) {
        var productName = req.body.product_name;
        var productQuantity = parseInt(req.body.quantity) || 0;
        if (!productName) {
            res.status(500).send("Product name not found");
            return;
        }
        res.json(this.productList.add(productName, productQuantity));
    };
    Products.prototype.delete = function (req, res) {
        var productId = parseInt(req.params.product_id);
        var wasDeleted = this.productList.delete(productId);
        if (!wasDeleted) {
            res.status(404).send("Product not found");
            return;
        }
        else {
            res.json({ success: true });
        }
    };
    Products.prototype.find = function (req, res) {
        var productQuery = req.params.product;
        var product = this.productList.find(productQuery);
        if (!product) {
            res.status(404).send("Product not found");
            return;
        }
        res.json(product);
    };
    return Products;
}());
exports.Products = Products;
//# sourceMappingURL=products.js.map