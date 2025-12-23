const Product = require("../Models/Product");

// ====================== CREATE PRODUCT ======================
const createProduct = async (reqData, files) => {
  try {
    // ----- Main Product Images -----
    const mainImages = files
      ?.filter((f) => f.fieldname === "product_images")
      .map((f) => f.path) || [];

    if (mainImages.length === 0) {
      throw new Error("Please upload at least 1 main product image");
    }

    // ----- Variants -----
    let variants = reqData.variants ? JSON.parse(reqData.variants) : [];
    variants.forEach((v, i) => {
      const variantImages = files
        .filter((f) => f.fieldname === `variant_${i}_images`)
        .map((f) => f.path);
      v.images = variantImages.length ? variantImages : [];

    });

    // ----- Product Object -----
    const product = new Product({
      title: reqData.title,
      brand: reqData.brand,
      category: reqData.category,
      color: reqData.color || "",
      sizes: reqData.sizes ? JSON.parse(reqData.sizes) : [],
      images: mainImages,
      price: reqData.price,
      discountedPrice: reqData.discountedPrice,
      discountPercent: reqData.discountPercent,
      quantity: reqData.quantity,
      description: reqData.description,
      offers: reqData.offers ? JSON.parse(reqData.offers) : [],
      variants: variants || [],
    });

    return await product.save();
  } catch (error) {
    throw new Error("Error creating product: " + error.message);
  }
};

// ====================== GET ALL PRODUCTS ======================
const getAllProducts = async () => {
  return await Product.find()
    .populate("ratings")
    .populate("reviews")
    .populate({
      path: "variants",
      populate: [
        { path: "ratings" },
        { path: "reviews" },
      ],
    });
};

// ====================== GET PRODUCT OR VARIANT BY ID ======================
const findProductById = async (id) => {
  // 1️⃣ Try to find product by ID
  let product = await Product.findById(id)
    .populate("ratings")
    .populate("reviews")
    .populate({
      path: "variants",
      populate: [
        { path: "ratings" },
        { path: "reviews" },
      ],
    })
    .exec();

  // 2️⃣ If not found, check if it's a variant ID
  if (!product) {
    // Search for product that has this variant ID
    product = await Product.findOne({ "variants._id": id })
      .populate("ratings")
      .populate("reviews")
      .populate({
        path: "variants",
        populate: [
          { path: "ratings" },
          { path: "reviews" },
        ],
      })
      .exec();

    if (!product) {
      throw new Error("Product or variant not found");
    }

    // Find which variant matched and attach separately
    const selectedVariant = product.variants.find(
      (v) => v._id.toString() === id
    );

    product = product.toObject();
    product.selectedVariant = selectedVariant || null;
  }

  return product;
};

// ====================== UPDATE PRODUCT ======================
const updateProduct = async (productId, reqData, files) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  // ----- Update main product images -----
  if (files && files.length > 0) {
    const newImages = files
      .filter((f) => f.fieldname === "product_images")
      .map((img) => img.path);
    if (newImages.length) reqData.images = newImages;
  }

  // ----- Handle variants update -----
  if (reqData.variants) {
    reqData.variants = JSON.parse(reqData.variants);

    reqData.variants.forEach((variant, i) => {
      const variantImages = files
        ?.filter((f) => f.fieldname === `variant_${i}_images`)
        ?.map((img) => img.path);

      if (variantImages?.length) variant.images = variantImages;
    });
  }

  // ----- Parse JSON fields -----
  if (reqData.offers) reqData.offers = JSON.parse(reqData.offers);
  if (reqData.sizes && typeof reqData.sizes === "string") reqData.sizes = JSON.parse(reqData.sizes);

  return await Product.findByIdAndUpdate(productId, reqData, {
    new: true,
    runValidators: true,
  });
};

// ====================== DELETE PRODUCT ======================
const deleteProduct = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");
  await Product.findByIdAndDelete(productId);
  return { message: "Product deleted successfully" };
};

// ====================== RELATED PRODUCTS ======================
const getRelatedProducts = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  return await Product.find({
    category: product.category,
    brand: product.brand,
    _id: { $ne: productId },
  });
};

// ====================== CATEGORY PRODUCTS ======================
const getProductsByCategory = async (category) => {

  if (!category) throw new Error("Category is required");

  const regex = new RegExp(`^${category}$`, "i"); 

  return await Product.find({ category: { $regex: regex } })
    .populate("ratings")
    .populate("reviews")
    .populate({
      path: "variants",
      populate: [
        { path: "ratings" },
        { path: "reviews" },
      ],
    });
};



module.exports = {
  createProduct,
  getAllProducts,
  findProductById,
  updateProduct,
  deleteProduct,
  getRelatedProducts,
  getProductsByCategory,
 
};
