const Product_Service = require("../Services/Product-Service");

// ====================== CREATE PRODUCTS ======================
const createProduct = async (req, res) => {
  try {
    const files = req.files || [];
    const product = await Product_Service.createProduct(req.body, files);
    return res.status(201).json(product);
  } catch (error) {
    console.error("Create Product Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ====================== GET ALL PRODUCTS ======================
const getAllProducts = async (req, res) => {

    try {
 
     const products = await Product_Service.getAllProducts();
 
     return res.status(201).send(products);
     
    } catch (error) {
 
     return res.status(500).send({error:error.message});
     
    }
 }

// ====================== FIND PRODUCTS BY ID ======================
const findProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product_Service.findProductById(productId);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// ====================== UPDATATE PRODUCTS ======================
const updateProduct = async (req, res) => {
  try {
    const updated = await Product_Service.updateProduct(req.params.id, req.body, req.files);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ====================== DELETE PRODUCTS ======================
const deleteProduct = async (req, res) => {
  try {
    const result = await Product_Service.deleteProduct(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ====================== RELATED PRODUCTS ======================
const getRelatedProducts = async (req, res) => {
  try {
    const related = await Product_Service.getRelatedProducts(req.params.id);
    res.status(200).json(related);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ====================== GET CATEGORY PRODUCTS ======================
const filterProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product_Service.getProductsByCategory(category);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  findProductById,
  updateProduct,
  deleteProduct,
  getRelatedProducts,
  filterProductsByCategory
};
