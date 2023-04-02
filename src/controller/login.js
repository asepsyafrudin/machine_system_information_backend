import { loginModels } from "../models/login.js";

const login = async (req, res) => {
  try {
    const data = await loginModels(req.body.npk, req.body.password);
    res.status(200).json({
      msg: "login request berhasil",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Login Gagal",
      errMsg: error,
    });
  }
};

export default login;
