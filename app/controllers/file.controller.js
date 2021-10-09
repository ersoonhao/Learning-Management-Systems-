var aws = require('aws-sdk')
var express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')

var s3 = new aws.S3({ 
    accessKeyId: "d788659e-d606-4e2b-9774-c20e6d29812f",
    secretAccessKey: IAM_USER_SECRET,
    Bucket: 'elasticbeanstalk-ap-southeast-1-118103674449'
})

const uploadFile = require("../middleware/upload");
const fs = require("fs");
const baseUrl = "http://localhost:8080/files/";



var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'elasticbeanstalk-ap-southeast-1-118103674449',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
  })




// const upload = async (req, res) => {
//   try {
//     await uploadFile(req, res);

//     if (req.file == undefined) {
//       return res.status(400).send({ message: "Please upload a file!" });
//     }

//     res.status(200).send({
//       message: "Uploaded the file successfully: " + req.file.originalname,
//     });
//   } catch (err) {
//     console.log(err);

//     if (err.code == "LIMIT_FILE_SIZE") {
//       return res.status(500).send({
//         message: "File size cannot be larger than 2MB!",
//       });
//     }

//     res.status(500).send({
//       message: `Could not upload the file: ${req.file.originalname}. ${err}`,
//     });
//   }
// };

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
};
