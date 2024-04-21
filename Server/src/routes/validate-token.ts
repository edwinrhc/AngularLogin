import {Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const ValidateToken = (req:Request,res:Response,next:NextFunction) => {
    
    const headerToken = req.headers['authorization']
   

    if(headerToken != undefined && headerToken.startsWith('Bearer ')){

        try {
            //Extrear Token de barer
            const bearerToken = headerToken.slice(7,headerToken.length);
            console.log(bearerToken);
            
            jwt.verify(bearerToken,process.env.SECRET_KEY || 'secretKey123');
                
                next();
        } catch (error) {
            res.status(401).json({msg:'Token no válido'});
        }

     
    }else{
        res.status(401).json({msg:'Acceso no autorizado'});
    }


}

export default ValidateToken;