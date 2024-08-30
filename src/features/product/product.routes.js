//import express

import express from 'express';
import ProductController from './product.controller.js';
import { uploadFile } from '../middlewares/fileUpload.middleware.js';

const productController=new ProductController();

//intialise the router
const ProductRouter= express.Router();


//give the paths

ProductRouter.get('/average',(req,res)=>{
    productController.averagePrice(req,res);
})

ProductRouter.get('/',(req,res)=>{
    productController.getAllProducts(req,res);
});
ProductRouter.post('/',uploadFile.single('imageUrl'),(req,res)=>{
    productController.addProduct(req,res);
});
ProductRouter.get('/filter',(req,res)=>{
    productController.filterProducts(req,res);
});
ProductRouter.get('/:id',(req,res)=>{
    productController.getOne(req,res);
});
ProductRouter.post('/rate',(req,res)=>{
    productController.rateProduct(req,res);
});
ProductRouter.post('/and-or',(req,res)=>{
    productController.understandingLogicalOperators(req,res);
    
});
ProductRouter.post('/inOperator',(req,res)=>{
    productController.inOperator(req,res);
})



export default ProductRouter;