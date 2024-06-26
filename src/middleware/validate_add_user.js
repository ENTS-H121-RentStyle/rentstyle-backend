import { body } from "express-validator";
import { User } from "../models/user_model.js";

const validateAddUser = [
  body("id")
    .isString()
    .withMessage("ID harus berupa String.")
    .custom(async (value) => {
      const existingUser = await User.findByPk(value);
      if (existingUser) {
        throw new Error("ID sudah terdaftar.");
      }
    }),
  body("name").isString().notEmpty().withMessage("Nama tidak boleh kosong."),
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Email tidak valid.")
    .custom(async (value) => {
      const existingUser = await User.findOne({
        where: { email: value },
      });
      if (existingUser) {
        throw new Error("Email sudah terdaftar.");
      }
    }),
  
  body("image").custom((value, { req }) => {
    if (!req.file) {
      return true;
    }
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const fileExtension = req.file.originalname.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      throw new Error(
        "Format gambar tidak valid. Hanya file JPG, JPEG, PNG yang diperbolehkan."
      );
    }
    const fileSizeInBytes = req.file.size;
    const maxSizeInBytes = 1 * 1024 * 1024;
    if (fileSizeInBytes > maxSizeInBytes) {
      throw new Error("Ukuran gambar terlalu besar. Maksimal 1MB.");
    }
    return true;
  }),
];

export default validateAddUser;
