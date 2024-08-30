import multer from "multer"
import path from 'path';
const storageConfig= multer.diskStorage({
    destination:(req,file,cb)=>{

        cb(null,path.join(path.resolve(),'uploads'));// gives directory of uploads;

    },
    filename: (req,file,cb)=>{
        const name= new Date().toISOString().replace(/:/g, '_') +file.originalname
        cb(null,name);

    }
});

export const uploadFile= multer({storage:storageConfig});