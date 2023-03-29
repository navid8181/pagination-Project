const mongoose= require('mongoose');

const payMentShema = new mongoose.Schema({

    name: {
        type: String,

    },

    success: {
        type: Boolean
    },

    money: {

        type: String

    },

    datePayment: {
        type: Date
    }

})


payMentShema.index({name: 'text',success : 1});

const paymentModel =  mongoose.model("payment", payMentShema);

module.exports = {
    paymentModel
}
