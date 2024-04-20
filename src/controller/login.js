import { comparePassword } from "../config/hashPassword.js";
import { loginModels } from "../models/login.js";

const login = async (req, res) => {
  try {
    const result = (await loginModels(req.body.npk)).recordset;

    let data = [];
    if (result.length > 0) {
      const checkPassword = comparePassword(
        req.body.password,
        result[0].password
      );

      if (checkPassword) {
        data.push(result[0]);
      } else {
        data.push({});
      }
    }

    let newData = {
      ...data,
      expired: new Date(new Date().getTime() + 30 * 60000),
    };
    res.status(200).json({
      msg: "login request berhasil",
      data: newData,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Login Gagal",
      errMsg: error,
    });
  }
};

export default login;
