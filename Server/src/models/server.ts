import express, {Application} from 'express';
import routersProduct from '../routes/product.route';
import routesUser from '../routes/user.route';
import cors from 'cors';

import { Product } from './product';
import { User } from './user';

class Servidor {
    private app: Application;
    private port: string;
   
    
    constructor(){
        this.app = express();
        this.port= process.env.PORT || '3000';
        this.listen();
        //Antes de la routes se agregar el midlewares
        this.middlewares();
        this.routes();
        this.dbConnect();
       
    }

    listen(){
        this.app.listen(this.port,()=> {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }

    routes(){
        this.app.use('/api/products',routersProduct);
        this.app.use('/api/users',routesUser);
    }


    middlewares(){
        // Parseo Body
        this.app.use(express.json());
        // Cors
        this.app.use(cors());
    }

    async dbConnect(){
        try{
            await Product.sync();
            await User.sync();
            console.log('Connection has been established seccessfully.');
        }catch(error){
            console.log('Unable to connect to the database',error);
        }
    }

}
export default Servidor;