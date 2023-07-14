// const AWS = require('aws-sdk');
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand} = require("@aws-sdk/client-s3");

const options = {
  region: process.env.LINODE_REGION,
  credentials: {
    accessKeyId: process.env.LINODE_ACCESS_KEY_ID,
    secretAccessKey: process.env.LINODE_SECRET_ACCESS_KEY,
  },
  endpoint: `https://${process.env.LINODE_CLUSTER_ID}.linodeobjects.com`,
  forcePathStyle: true,
};


const s3 = new S3Client(options);

const uploadImage = async (name, base64) => {
  const buf = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""),'base64');

  const params = {
    Bucket: process.env.LINODE_BUCKET,
    Key: name,
    Body: buf,
    ContentType: 'image/jpeg',
    ContentEncoding: 'base64',
  };

  try {

    const command = new PutObjectCommand(params);
    await s3.send(command);
    return name;

  } catch (err) {
    console.log(err);
  }
}

const getImage = async (name) => {
  const params = {
    Bucket: process.env.LINODE_BUCKET,
    Key: name,
  };
  try {
    const command = new GetObjectCommand(params);
    const response = await s3.send(command);
    return Buffer.from(response.Body).toString('base64');
  } catch (err) {
    console.log(err);
  }
}

const deleteImage = async (name) => {
  const params = {
    Bucket: process.env.LINODE_BUCKET,
    Key: name,
  };
  try {
    const command = new DeleteObjectCommand(params);
    await s3.send(command);

  } catch (err) {
    console.log(err);
  }
}

module.exports = { s3, uploadImage, getImage, deleteImage };
