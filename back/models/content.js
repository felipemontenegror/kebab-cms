const mongoose = require('mongoose'); //conteudo do site (banner, infos,servicoes, about... )

const HomeContentSchema = new mongoose.Schema({
    banner : [
        {
            product_banner_photo : {
                type : String,
                required : true
            },
            product : {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required : true
            },
            direction : {
                type : String,
                enum : ["LEFT", "RIGHT"], //enum:só vale alguma das duas opçoes do array (left ou right), caso contrário, server error
                required : true
            },
            order : {
                type : Number,
                min: 1
            }
        }
    ],
    infos : [
        {
            icon: {
                type : String,
                required : true
            },
            text: {
                type : String
            },
            link: {
                type : String
            },
            order : {
                type : Number,
                min: 1
            }
        }
    ],
    about : {
        photo : {
            type : String
        },
        title: {
            type : String
        },
        description: {
            type : String
        },
        direction : {
            type : String,
            enum : ["LEFT", "RIGHT"],
            required : true
        }
    },
    services : {
        title : {
            type : String,
            required : true
        },
        description: {
            type : String,
            required : true
        },
        service  : [
            {
                photo: {
                    type : String,
                    required : true
                },
                description: {
                    type : String,
                    required : true
                },
                order : {
                    type : Number,
                    min: 1
                }
            }
        ],
        footer : [
             {
                title : {
                    type : String,
                    required : true
                },
                description : {
                    type : String,
                    required : true
                },
                order : {
                    type : Number,
                    min: 1
                }
            }
        ]
    }
}, { autoCreate : true })

module.exports = mongoose.model('content', HomeContentSchema);
