const { createReadStream } = require('fs');
const { ImgurClient } = require('imgur');

client = new ImgurClient({
  username: process.env.IMGUR_USERNAME,
  password: process.env.IMGUR_PASSWORD,
  clientId: process.env.IMGUR_CLIENTID,
});

async function uploadToImgur(imageUrl) {
  // client.on('uploadProgress', (progress) => console.log(progress));
  console.log(imageUrl);
  const response = await client.upload({
    image: createReadStream(imageUrl),
    type: 'stream',
  });
  return response;
}

module.exports = { uploadToImgur };
