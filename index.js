const {default: mongoose} = require('mongoose');
const express = require('express');
const {paymentModel} = require('./payment.model');


const DB_Url = "mongodb://localhost:27017/Power"
mongoose.connect(DB_Url)

console.log("connect mongo db...");


const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.post("/payment/create", async (req, res, next) => {


    const {name, success, money, datePayment} = req.body;


    const paymentResult = await paymentModel.create({
        name,
        success: success == "true" ? true : false,
        money,
        datePayment
    })

    if (! paymentResult) 
        return res.json({message: "تراکنش ایجاد نشد"})


    


    return res.json({message: "تراکنش ایجاد شد"})
})


app.get("/", (req, res, next) => {
    return res.json({message: "start"})
})
app.get("/:index", async (req, res, next) => {


    try {
        let {name, success} = req.body


        const {index} = req.params;
        const documentCountInPage = 3;

        const query = []

        if (success && success != "") 
            query.push({success})


        


        if (name && name !== "") 
            query.push({
                name: {
                    $regex: name + ""
                }
            })

            if (query.length == 0)
            query.push({})



        const totalPage = await paymentModel.count({$or: query})

        const startIndex = Math.max(0, index - 1) * documentCountInPage;
        const endIndex = startIndex + documentCountInPage // Math.min(startIndex + documentCountInPage , totalPage);


        const result = await paymentModel.find({$or: query}) ?. skip(startIndex) ?. limit(documentCountInPage);

        return res.json({
            page: index + " / " + Math.round(totalPage / documentCountInPage),
            message: result
        })
    } catch (error) {
        console.log(error.message);
    }
})
app.listen(3000, () => {

    console.log("app run in http://localhost:3000");

})
