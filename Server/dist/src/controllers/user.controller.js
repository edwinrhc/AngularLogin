"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //Validamos si el usuario existe en la bd
    const user = yield user_1.User.findOne({ where: { username: username } });
    if (user) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`
        });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        //Guardamos usuarios en BD
        yield user_1.User.create({
            username: username,
            password: hashedPassword
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        });
    }
    res.json({
        msg: `Usuario: ${username} creado exitosamente`
    });
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Validamos si el usuario existe en la base de datos
        const user = yield user_1.User.findOne({ where: { username: username } });
        if (!user) {
            return res.status(400).json({
                msg: `No existe un usuario con el nombre ${username} en la base de datos`
            });
        }
        // Validamos el password
        const passwordValido = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordValido) {
            return res.status(400).json({
                msg: 'La contraseña proporcionada es incorrecta'
            });
        }
        // Generamos el token
        const token = jsonwebtoken_1.default.sign({ username: user.username }, process.env.SECRECT_KEY || 'secretKey123', { expiresIn: '1h' }); // Cambia 'secretKey' por tu propia clave secreta
        res.json({
            msg: '¡Inicio de sesión exitoso!',
            token: token
        });
    }
    catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ msg: 'Error al iniciar sesión, por favor inténtalo de nuevo más tarde' });
    }
});
exports.loginUser = loginUser;
