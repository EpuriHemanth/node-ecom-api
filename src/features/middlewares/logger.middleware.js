
import winston from 'winston';
import fs from 'fs';

const fsPromise= fs.promises;

// async function log(logData){
    
//     try{
//         logData= `\n ${new Date().toString()}+logData: ${logData}`;
//         await fsPromise.appendFile('log.txt',logData);

//     }
//     catch(err){
//         console.log(err);
//     }
// }
const logger= winston.createLogger({
    level:"info",
    format: winston.format.json(),
    transports:[
        new winston.transports.File({filename:'log.txt'})
    ]
});
 const  loggingMiddleware = async (req,res,next)=>{
    
    const logData= ` for the url ${req.url}-${JSON.stringify(req.body)}`;

   logger.info(logData);
    next();
}
export default loggingMiddleware;