// DotEnv is a lightweight npm package that automatically loads environment variables from a . env file into the process.
//require('dotenv').config()

// imports statement 
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

// KEYS 


// PDF https://stackoverflow.com/questions/34257185/upload-pdf-generated-to-aws-s3-using-nodejs-aws-sdk
// const bucketName=process.env.AWS_BUCKET_NAME
// const region=process.env.AWS_BUCKET_REGION 
// const accessKeyId= process.env.AWS_ACCESS_KEY 
// const secretAccessKey= process.env.AWS_SECRET_KEY



const bucketName = "spm-files-upload"
const region = "ap-southeast-1"
const accessKeyId = "AKIARW74HBZIRY7PNJ5G"
const secretAccessKey = "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"

// s3 init
const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})


// upload function
function uploadFile(file, extension) {
    // parse in file object from multer which contain the filepath and the unique key from S3 
    console.log("file object", file);
    const fileStream = fs.createReadStream(file.path);


    console.log("key HERE", file.filename)
    var pdfkey = file.filename + ".pdf";
    var filekey = file.filename + extension;

    var specifiedContentType="";
    
    
    if(extension==".pdf"){
        specifiedContentType="application/pdf";
    }else if(extension==".docx"){
        specifiedContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    }
    else if(extension=="image"){
        specifiedContentType="image/jpeg"
    }
    else{
        specifiedContentType="application/octet-stream"
    }
    
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        //   Key: file.filename,
        Key: filekey,
        ACL: 'public-read',
        ContentType: specifiedContentType

    }
    return s3.upload(uploadParams).promise()
}

exports.uploadFile = uploadFile
    // download form s3 

// takes in a file key & return a read stream 
function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
}
exports.getFileStream = getFileStream