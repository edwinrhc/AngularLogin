import {Router} from 'express';
import { getProducts } from '../controllers/product.controller';
import ValidateToken from './validate-token';

const router = Router();

router.get('/',ValidateToken,getProducts);


export default router;