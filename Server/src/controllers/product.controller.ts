import {Request,Response}  from 'express';


// Ruta
export const getProducts = (req:Request,res:Response) => {
    
    res.json(
        {
            msg:'Get Products'
        }
    )
}
