"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = void 0;
// Ruta
const getProducts = (req, res) => {
    res.json({
        msg: 'Get Products'
    });
};
exports.getProducts = getProducts;
