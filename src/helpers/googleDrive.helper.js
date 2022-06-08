const path = require('path');
const fs = require('fs');
const { google } = require('googleapis');
const KEYPATH = path.join(__dirname, '..', '..', 'credentials.json');
const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYPATH,
  scopes: SCOPES,
});

async function upload(
  filename,
  newFilename,
  mimeType,
  parents,
  rootFolder = 'uploads'
) {
  try {
    const driveService = google.drive({
      version: 'v3',
      auth,
    });

    const fileMetadata = {
      name: newFilename,
      parents: [parents],
    };
    const media = {
      mimeType: mimeType,
      body: fs
        .createReadStream(path.join(rootFolder, filename))
        .on('error', (error) => {
          console.log(error);
        }),
      size: 10240,
    };

    const response = await driveService.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });

    if (response.status === 200) return response.data.id;
  } catch (error) {
    console.log(error);
    // console.log('error: cannot upload file to google drive');
  }
}

async function getFile(filename, fileId) {
  const driveService = google.drive({
    version: 'v3',
    auth,
  });

  const dest = fs.createWriteStream(`temp/${filename}`);
  driveService.files.get(
    { fileId: fileId, alt: 'media' },
    { responseType: 'stream' },
    (err, { data }) => {
      if (err) {
        console.log(err);
        return;
      }

      data
        .on('end', () => console.log('Done.'))
        .on('error', (err) => {
          console.log(err);
          return process.exit();
        })
        .pipe(dest);
    }
  );
}

module.exports = {
  upload,
  getFile,
};
