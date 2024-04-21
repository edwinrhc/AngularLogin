"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ValidateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        try {
            //Extrear Token de barer
            const bearerToken = headerToken.slice(7, headerToken.length);
            console.log(bearerToken);
            jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || 'secretKey123');
            next();
        }
        catch (error) {
            res.status(401).json({ msg: 'Token no válido' });
        }
    }
    else {
        res.status(401).json({ msg: 'Acceso no autorizado' });
    }
};
exports.default = ValidateToken;
