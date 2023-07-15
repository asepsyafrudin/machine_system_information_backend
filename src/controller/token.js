import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createToken = async (req, res) => {
  try {
    const data = req.body;
    const token = JWT.sign(data, process.env.SECRET, { expiresIn: "60s" });

    res.status(200).json({
      msg: "token berhasil",
      data: token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "gagal create",
      errMsg: error,
    });
  }
};

export const getValidationToken = async (req, res) => {
  let permission = false;
  try {
    const token = req.body.token;
    if (token) {
      const validation = JWT.verify(token, process.env.SECRET);
      if (validation) {
        permission = true;
      }
    }
    res.status(200).json({
      msg: "token berhasil",
      data: permission,
    });
  } catch (error) {
    res.status(200).json({
      msg: "gagal create",
      errMsg: error,
      data: permission,
    });
  }
};
