import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  searchProduct,
  updateProductName,
  updateProductStatus,
} from "../controller/product.js";

const router = express.Router();

router.post("/create", createProduct);
router.get("/getAll", getAllProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/:searchValue", searchProduct);
router.patch("/updateProductName", updateProductName);
router.patch("/updateStatus", updateProductStatus);

export default router;
