//Import Dependencies
const { getDownloadLinkMaker } = require("./getDownloadLink");
const {
  S3Client,
  GetObjectCommand,
  HeadObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { checkFileExistsMaker } = require("./checkFileExists");

//Make getDownloadLink Usecase
const s3GetSignedURL = async (key) => {
  try {
    const bucketName = process.env.BUCKET_NAME;
    const bucketRegion = process.env.BUCKET_REIGION;
    const accessKey = process.env.ACCESS_KEY;
    const secretAccessKey = process.env.SECRET_ACCESS_KEY;

    console.log(bucketRegion);
    console.log(key);

    const s3 = new S3Client({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      },
      region: bucketRegion,
    });
    const getObject = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    const url = await getSignedUrl(s3, getObject, { expiresIn: 3600 });
    console.log(url);
    return url;
  } catch (error) {
    throw error;
  }
};

const getDownloadLink = getDownloadLinkMaker(s3GetSignedURL);

//Make checkFileExists Usecase
const s3CheckKeyExists = async (key) => {
  try {
    const bucketName = process.env.BUCKET_NAME;
    const bucketRegion = process.env.BUCKET_REIGION;
    const accessKey = process.env.ACCESS_KEY;
    const secretAccessKey = process.env.SECRET_ACCESS_KEY;
    console.log(`Key is: ${key}`);
    console.log(`Reaching Out To - ${bucketName} for Checking`);

    const s3 = new S3Client({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      },
      region: bucketRegion,
    });

    const command = new HeadObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const response = await s3.send(command);

    console.log(response);
    const statusCode = response["$metadata"]["httpStatusCode"];
    return statusCode == "200";
  } catch (error) {
    throw error;
  }
};

const checkFileExists = checkFileExistsMaker(s3CheckKeyExists);

//Make uploadFileStream Usecase
const { uploadFileStreamMaker } = require("./uploadFileStream");
const AWS = require("aws-sdk");
const Busboy = require("busboy");

const s3UploadBusboy = (readStream, key) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(key);

      const bucketName = process.env.BUCKET_NAME;
      const bucketRegion = process.env.BUCKET_REIGION;
      const accessKey = process.env.ACCESS_KEY;
      const secretAccessKey = process.env.SECRET_ACCESS_KEY;

      console.log(bucketName);
      const s3 = new AWS.S3({
        credentials: {
          accessKeyId: accessKey,
          secretAccessKey: secretAccessKey,
        },
        region: bucketRegion,
      });

      console.log("S3");

      const busboy = Busboy({ headers: readStream.headers });
      console.log(readStream.headers);
      busboy.on("error", (error) => {
        console.log(error);
        reject(error);
      });

      busboy.on(
        "file",
        (fieldName, fileStream, fileName, encoding, mimeType) => {
          console.log("file");
          s3.upload({
            Bucket: bucketName,
            Key: key,
            Body: fileStream,
          })
            .promise()
            .then(() => {
              console.log("busboy finished");
              resolve("busboy finished");
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
      readStream.pipe(busboy);
    } catch (error) {
      console.log(error);
    }
  });
};

const uploadFileStream = uploadFileStreamMaker(s3UploadBusboy);

module.exports = { getDownloadLink, checkFileExists, uploadFileStream };
