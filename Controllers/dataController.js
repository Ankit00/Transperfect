const Accessories = require("../Model/dataModel");
const fs = require('fs');

const newEntry = async (req,res,next) => {
    const data = JSON.parse(fs.readFileSync("./Utils/data.json","utf-8"));
    try {
        const newdata = await Accessories.insertMany(data);
        if(newdata){
            res.status(200).json({
                message : 'success',
                newdata
            })
        }
    } catch(error) {
        res.status(400).json({
            message : 'Insertion Failed',
            error : error.stack
        })
    }
}

const getProduct = (async(req,res,next) => {
    try {
        const key = req.query.locale;
        const data = await Accessories.find({});
        if(data){
            refinedData = await dataRefining(data,key);
            res.status(200).json({
                message : "success",
                refinedData
            })
        }
    } catch (error) {
        res.status(400).json({
            message : "Unable to complete this request",
            error : error.stack
        })
    }
});

const updateProduct =(async(req,res,next) => {
    try {
        const id =  req.query.identifier;
        const product = await Accessories.updateOne({"identifier" : id},req.body,{
            new : true
        });
        if(product){
            res.status(200).json({
                message : "success",
                product
            })
        }
    } catch (error) {
            res.status(400).json({
            message : "Unable to complete this request",
            error : error.stack
        })
    }
})

const deleteProduct = (async(req,res,next) => {
    try {
        const id =  req.query.identifier;
        const product = await Accessories.deleteOne({"identifier" : id});
        if(product){
            res.status(200).json({
                message : "success",
                product : null
            })
        }
    } catch (error) {
            res.status(400).json({
            message : "Unable to complete this request",
            error : error.stack
        })
    }
})

const dataRefining = (data,id) => {
    return new Promise((res,rej)=>{
        let newData = [];
        newData = data.map(el => el.values);
        newData.map( (el) =>{
            keyItems = Object.keys(el[0]);
            for(i=0;i<keyItems.length;i++){
                property = keyItems[i];
                for(j=0;j<el[0][property].length;j++){
                    if(el[0][property][j].locale != id){
                        delete el[0][property];
                        break;
                    }
                    else{
                        break;
                    }
                }
            }
        })
        refinedData = newData.filter((el) => Object.keys(el[0]).length >= 1);
        res(refinedData);
    })
}

module.exports = {
    newEntry,getProduct,updateProduct,deleteProduct
}
