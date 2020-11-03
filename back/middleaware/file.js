const MSGS = require('../messages');
const AWS = require('aws-sdk');
const config = require('config');
const fs = require('fs');
const slugfy = require('../service/slugfy')

module.exports = async function (req, res, next) {
    try{
        const BUCKET_NAME = process.env.S3_BUCKET_NAME || config.get('S3_BUCKET_NAME') // porta via Heroku ou via Json

        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID || config.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || config.get('AWS_SECRET_ACCESS_KEY')
        });
        const folder = req.baseUrl.replace("/", "")

        if(!req.files) { 
            if (req.method == 'PATCH') {
                next()
            } else {
                res.status(204).send({ error: MSGS.FILE_NOT_SENT });
            }

        } else { 
            let photo = req.files.photo  // controle de enviar arquivo
            const name = slugfy(photo.name) 
            req.body.photo_name = name

            if (photo.mimetype.includes('image/')){

                const file = await photo.mv(`./uploads/${name}`)

                const params = {   // como eu quero subir o arquivo S3
                    Bucket: BUCKET_NAME,
                    ACL: 'public-read',
                    Key: `${folder}/${name}`, // File name you want to save as in S3
                    Body: fs.createReadStream(`./uploads/${name}`)
                };
                s3.upload(params, function (err, data) {  // Ordem para subir o arquivo
                    if (err) { //em caso de erro...
                        console.error(err);
                        res.status(500).send(err);
                    } else { //caso nao de erro...
                        console.log(`File uploaded successfully. ${data.Location}`);
                        fs.unlinkSync(`./uploads/${name}`)   //apaga da pasta assim que enviar
                        next()
                    }
                })

        }else{
            res.status(400).end({ error: MSGS.FILE_INVALID_FORMAT})
        }

    }

    }catch(err) {
        res.status(500).send({ "error": err.message })
    }
}