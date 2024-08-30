
import { UserModel } from "../user/user.model.js";
export default class ProductModel{
    constructor( name, desc, price, imageUrl, categories, sizes){
       
        this.name=name;
        this.desc=desc;
        this.price=parseInt(price);
        this.imageUrl=imageUrl;
        this.categories=categories;
        this.sizes=sizes;
    }

    
    
    
  
} 

