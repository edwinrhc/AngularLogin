import { Request, Response } from "express";
import bcrypt  from 'bcrypt';
import { User } from "../models/user";
import jwt from 'jsonwebtoken';


export const newUser = async (req: Request,res: Response)=> {

    const  {username, password}  = req.body;

    //Validamos si el usuario existe en la bd
   const user =  await User.findOne({where: { username:username  }})
      if(user){
       return  res.status(400).json({
            msg: `Ya existe un usuario con el nombre ${username}`
         })
      } 

    const hashedPassword = await bcrypt.hash(password,10);

    try {
        //Guardamos usuarios en BD
        await User.create({
            username: username,
            password: hashedPassword
        })
        
    } catch (error) {
        res.status(400).json({
            msg: 'Upps ocurrio un error',
            error
        })
    }
    res.json({
        msg:`Usuario: ${username} creado exitosamente`
        
    })
}


export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Validamos si el usuario existe en la base de datos
        const user:any = await User.findOne({ where: { username: username } });

        if (!user) {
            return res.status(400).json({
                msg: `No existe un usuario con el nombre ${username} en la base de datos`
            });
        }

        // Validamos el password
        const passwordValido = await bcrypt.compare(password, user.password);

        if (!passwordValido) {
            return res.status(400).json({
                msg: 'La contraseña proporcionada es incorrecta'
            });
        }

        // Generamos el token
        const token = jwt.sign({ username: user.username }, process.env.SECRECT_KEY || 'secretKey123', { expiresIn: '1h' }); // Cambia 'secretKey' por tu propia clave secreta

        res.json({
            msg: '¡Inicio de sesión exitoso!',
            token: token
        });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ msg: 'Error al iniciar sesión, por favor inténtalo de nuevo más tarde' });
    }
};