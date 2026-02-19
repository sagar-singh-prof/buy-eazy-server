import Product from "../models/Product.js";
import { uploadToAzure } from "../utils/azureUpload.js";

export async function allProductsController(req, res) {
  try {
    const products = await Product.find({});
    res.status(200).json({ status: "success", products });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

export async function filteredProductsController(req, res) {
  try {
    const { category, sPrice, ePrice } = req.query;

    const filter = {};

    // category filter
    if (category) {
      filter.category = category;
    }

    // price filter
    if (sPrice || ePrice) {
      filter.price = {};
      if (sPrice) filter.price.$gte = Number(sPrice);
      if (ePrice) filter.price.$lte = Number(ePrice);
    }

    const products = await Product.find(filter);

    console.log(products, "Length is", products.length);
    res
      .status(200)
      .json({ length: products.length, status: "success", products });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

export async function addProductCOntroller(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const imageUrl = await uploadToAzure(req.file);
    const { name, price, quantity, category, description } = req.body;

    const product = await Product.create({
      name,
      price,
      quantity,
      category,
      description,
      imageUrl,
    });
    console.log(imageUrl);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
