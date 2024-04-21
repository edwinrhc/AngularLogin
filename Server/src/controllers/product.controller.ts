import {Request,Response}  from 'express';
import { Product } from '../models/product';


// Ruta
export const getProducts = async (req:Request,res:Response) => {
    const listProducts = await Product.findAll();   
    res.json(listProducts)
}
