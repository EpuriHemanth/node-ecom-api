 import { getDB } from "../../config/mongodb.js";
 export class UserModel{

   constructor(name,email,password,type){
    this.name=name;
    this.email=email;
    this.password=password;
    this.type=type;
   }
   
  
   static getAll(){
    return users;
   }
   
   
 }
 let users=[
    {
      id:1,
    name: "selling user",
    email: "seller@gmail.com",
    password : "password1",
    type: "seller"
   },
   {
    id:2,
    name: "customer user",
    email: "customer@gmail.com",
    password : "password1",
    type: "customer"

   }
  ];