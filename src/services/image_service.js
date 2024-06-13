import multer from "multer";
import { Storage } from "@google-cloud/storage";
import dotenv from 'dotenv';

dotenv.config();

const upload = multer({
  storage: multer.memoryStorage(),
});

// Konfigurasi Google Cloud Storage
const bucketName = process.env.GCS_BUCKET_NAME;
const storage = new Storage();
const bucket = storage.bucket(bucketName);

// Fungsi untuk mengunggah file ke GCS
async function uploadFileToGCS(file, folderName) {
  const blob = bucket.file(`${folderName}/${Date.now()}-${file.originalname}`);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  return new Promise((resolve, reject) => {
    blobStream.on('error', (err) => {
      console.error('Error uploading to GCS:', err);
      reject(err);
    });

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
      console.log(`${file.originalname} uploaded to ${bucketName}/${folderName}`);
      resolve(publicUrl);
    });

    blobStream.end(file.buffer);
  });
}

// Fungsi untuk menghapus file dari GCS
async function deleteFileFromGCS(fileUrl) {
  const fileName = fileUrl.split(`https://storage.googleapis.com/${bucketName}/`)[1];
  const file = bucket.file(fileName);

  return new Promise((resolve, reject) => {
    file.delete((err, apiResponse) => {
      if (err) {
        console.error('Error deleting file from GCS:', err);
        reject(err);
      } else {
        console.log(`File ${fileName} deleted from ${bucketName}`);
        resolve(apiResponse);
      }
    });
  });
}

// Middleware untuk pengunggahan file
const uploadMiddleware = upload.single('image');

export { uploadMiddleware, uploadFileToGCS, deleteFileFromGCS };
