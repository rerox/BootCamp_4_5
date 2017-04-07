"use strict";
/**
 * Created by Kamil on 2016-12-11.
 */
var Product = (function () {
    function Product(id, name, quantity) {
        if (quantity === void 0) { quantity = 0; }
        this.name = name;
        this.quantity = quantity;
        this.id = id;
    }
    Product.prototype.getId = function () {
        return this.id;
    };
    Product.prototype.updateQuantity = function (newQuantity) {
        this.quantity = newQuantity;
    };
    Product.prototype.getName = function () {
        return this.name;
    };
    Product.prototype.addProducts = function (addedQuantity) {
        this.quantity += addedQuantity;
    };
    Product.prototype.substractProducts = function (substractedQuantity) {
        this.quantity -= substractedQuantity;
    };
    return Product;
}());
exports.Product = Product;
//# sourceMappingURL=product.js.map