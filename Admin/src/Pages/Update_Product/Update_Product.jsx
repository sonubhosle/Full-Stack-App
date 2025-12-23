import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { findProductsById, updateProduct } from "../../State/Admin_Products/Action";

const Update_Product = ({ productId }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);

  const [product, setProduct] = useState({
    title: "",
    brand: "",
    category: "",
    price: "",
    discountedPrice: "",
    discountPercent: "",
    quantity: "",
    description: "",
    images: [], // new main image
    variants: [], // existing variants
  });

  // Load existing product data
  useEffect(() => {
    const loadProduct = async () => {
      const res = await dispatch(findProductsById({ productId }));
      if (res && res.payload) {
        const existing = res.payload;
        setProduct({
          title: existing.title || "",
          brand: existing.brand || "",
          category: existing.category || "",
          price: existing.price || "",
          discountedPrice: existing.discountedPrice || "",
          discountPercent: existing.discountPercent || "",
          quantity: existing.quantity || "",
          description: existing.description || "",
          images: [], // user can upload a new image
          variants: existing.variants.map((v) => ({
            ...v,
            images: [], // user can upload new variant images
          })),
        });
      }
    };

    loadProduct();
  }, [dispatch, productId]);

  // Handlers
  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });
  const handleImageChange = (e) => setProduct({ ...product, images: Array.from(e.target.files) });

  const handleVariantChange = (index, e) => {
    const newVariants = [...product.variants];
    newVariants[index][e.target.name] = e.target.value;
    setProduct({ ...product, variants: newVariants });
  };

  const handleSizesChange = (index, value) => {
    const newVariants = [...product.variants];
    newVariants[index].sizes = value.split(",").map((s) => s.trim());
    setProduct({ ...product, variants: newVariants });
  };

  const handleVariantImageChange = (index, e) => {
    const newVariants = [...product.variants];
    newVariants[index].images = Array.from(e.target.files);
    setProduct({ ...product, variants: newVariants });
  };

  const addVariant = () => {
    setProduct({
      ...product,
      variants: [
        ...product.variants,
        {
          color: "",
          sizes: [""],
          images: [],
          price: "",
          discountedPrice: "",
          discountPercent: "",
          stock: "",
        },
      ],
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Main product fields
      formData.append("title", product.title);
      formData.append("brand", product.brand);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("discountedPrice", product.discountedPrice);
      formData.append("discountPercent", product.discountPercent);
      formData.append("quantity", product.quantity);
      formData.append("description", product.description);

      // Main image (if changed)
      if (product.images[0]) formData.append("image", product.images[0]);

      // Variants without images
      const variantsToSend = product.variants.map((v) => ({
        color: v.color,
        sizes: v.sizes,
        price: v.price,
        discountedPrice: v.discountedPrice,
        discountPercent: v.discountPercent,
        stock: v.stock,
        images: [],
      }));
      formData.append("variants", JSON.stringify(variantsToSend));

      // Append new variant images
      product.variants.forEach((v, idx) => {
        v.images.forEach((file) => formData.append(`variant_${idx}_images`, file));
      });

      // Dispatch update redux action
      dispatch(updateProduct(productId, formData));
      toast.success("Product update dispatched!");
    } catch (err) {
      toast.error("Error dispatching product update");
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="title" placeholder="Title" value={product.title} onChange={handleChange} className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" required />
          <input type="text" name="brand" placeholder="Brand" value={product.brand} onChange={handleChange} className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" required />
          <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" required />
          <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" required />
          <input type="number" name="discountedPrice" placeholder="Discounted Price" value={product.discountedPrice} onChange={handleChange} className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" />
          <input type="number" name="discountPercent" placeholder="Discount Percent" value={product.discountPercent} onChange={handleChange} className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" />
          <input type="number" name="quantity" placeholder="Quantity" value={product.quantity} onChange={handleChange} className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" />
        </div>

        <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400" />

        {/* Main image */}
        <div>
          <label className="block mb-1 font-semibold">Main Product Image</label>
          <input type="file" onChange={handleImageChange} className="border border-gray-300 rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400" />
        </div>

        {/* Variants */}
        <h3 className="text-xl font-semibold mt-4 text-gray-700">Variants</h3>
        {product.variants.map((variant, idx) => (
          <div key={idx} className="border border-gray-200 rounded-md p-4 mb-4 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="color" placeholder="Color" value={variant.color} onChange={(e) => handleVariantChange(idx, e)} className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" />
              <input type="text" placeholder="Sizes (comma separated)" value={variant.sizes.join(",")} onChange={(e) => handleSizesChange(idx, e.target.value)} className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" />
              <input type="file" multiple onChange={(e) => handleVariantImageChange(idx, e)} className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 col-span-1 md:col-span-2" />
              <input type="number" name="price" placeholder="Variant Price" value={variant.price} onChange={(e) => handleVariantChange(idx, e)} className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" />
              <input type="number" name="discountedPrice" placeholder="Variant Discounted Price" value={variant.discountedPrice} onChange={(e) => handleVariantChange(idx, e)} className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" />
              <input type="number" name="discountPercent" placeholder="Variant Discount Percent" value={variant.discountPercent} onChange={(e) => handleVariantChange(idx, e)} className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" />
              <input type="number" name="stock" placeholder="Variant Stock" value={variant.stock} onChange={(e) => handleVariantChange(idx, e)} className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>
        ))}

        <button type="button" onClick={addVariant} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">Add Variant</button>

        <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default Update_Product;
