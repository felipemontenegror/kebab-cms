//modelagem de dados/regra de negócio
const mongoose = require('mongoose');  //cardápio(produto) 

const ProductSchema = new mongoose.Schema({
    photo: {
        type : String, //só guardou o caminho final do endereço, dxando a porta autonoma 
        required : true
    },
    title: {
        type : String,
        required : true
    },
    category:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required : true
    },
    highlight: {
        type : Boolean,
        default: false
    },
    description: {
        type : String,
        required : true
    },
    complete_description: {
        type : String
    },
    price: {
        type : Number,
        min: 1,
        required : true
    },
    discount_price: {
        type : Number,
        min: 1
    },
    discount_price_percent: {
        type : Number,
        min: 1
    },
    last_modified_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    last_modification_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type : Boolean,
        default : true
    }
}, { autoCreate : true })

module.exports = mongoose.model('product', ProductSchema);
