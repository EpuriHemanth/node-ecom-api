import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";
export default class ProductController{
    constructor(){
       this.productRepository= new ProductRepository();
    }

    //API required
    async getAllProducts(req,res){
        console.log(req.userId);
        try{
            const products= await this.productRepository.getAllProducts();
            
            res.send(products);
        }
        catch(err){
            console.log(err);
        }
    }
    async addProduct(req,res){
        const {name,desc,price,sizes,categories}=req.body;
      
        const imageUrl=req?.file?.filename;
        const product= new ProductModel(name,desc,price,imageUrl,categories,sizes)
        try{
            const uploadedProduct=await this.productRepository.addProduct(product);
       
        res.status(201).send(uploadedProduct);


        }
        catch(err){
            console.log(err);
        }
        
    }
    async getOne(req,res){
        const id= req.params.id;
        try{
            const product= await this.productRepository.getById(id);
            if(product){
                res.status(201).send(product);
            }
            else{
                res.status(401).send("No product found with this id");
            }
        }
        catch(err){
            console.log(err);
        }
    }

    async filterProducts(req,res){
        
        const minPrice= req.query.minPrice;
        const maxPrice= req.query.maxPrice;
        const category= req.query.category;
        try{
            const products= await this.productRepository.filter(minPrice,maxPrice,category);
            if(products){
                res.status(201).send(products);
            }
            else{
                res.status(401).send("No Products found with this specifications");
            }
        }
        catch(err){
            console.log(err);
        }
    }

    async rateProduct(req,res){
        const userId= req.userId;
       const {productId,rating} =req.body;
        
        try{
           await this.productRepository.rate(userId,productId,rating);
            res.status(201).send("rating added successfully");

        }
        catch(err){
            console.log(err);
        }
    }

    async understandingLogicalOperators(req,res){

        const minPrice= req.query.minPrice;
        const category=req.query.category;
        try{

            const result = await this.productRepository.undersatingLogicalOperators(minPrice,category);
            res.status(201).send(result);

        }
        catch(err){
            console.log(err);
        }
    }

    //understanding $in operator

    async inOperator(req,res){
        const categories=req.query.categories;
        try{

            const result= await this.productRepository.inOperator(categories);
            res.status(201).send(result);

        }
        catch(err){
            console.log(err);
        }
    }

    async averagePrice(req,res){
        try{

           const result= await this.productRepository.averagePriceForCategory();
           res.status(201).send(result)

        }
        catch(err){
            console.log(err);
        }
    }

    
    }
    
    
