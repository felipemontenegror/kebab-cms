const mongoose = require('mongoose');

const HomeContentSchema = new mongoose.Schema({
    banner : [
        {
            photo : {
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
                enum : ["LEFT", "RIGHT"],
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
            photo: {
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
    },
    last_modification_date: { //ordenacao
        type: Date,
        default: Date.now
    }
}, { autoCreate : true })

module.exports = mongoose.model('content', HomeContentSchema);
