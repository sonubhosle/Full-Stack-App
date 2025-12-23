import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createProduct } from "../../State/Admin_Products/Action";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.products);

  const [product, setProduct] = useState({
    title: "",
    brand: "",
    category: "",
    price: "",
    discountedPrice: "",
    discountPercent: "",
    quantity: "",
    stock: "",
    description: "",
    color: "",
    sizes: [""],
    offersInput: "",
    images: [],
    variants: [
      {
        title: "",
        color: "",
        sizes: [""],
        price: "",
        discountedPrice: "",
        discountPercent: "",
        stock: "",
        images: [],
      },
    ],
  });

  // ===== Handlers =====
  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSizesChange = (value) =>
    setProduct({ ...product, sizes: value.split(",").map((s) => s.trim()) });

  const handleOffersChange = (e) =>
    setProduct({ ...product, offersInput: e.target.value });



  const handleVariantChange = (index, e) => {
    const newVariants = [...product.variants];
    newVariants[index][e.target.name] = e.target.value;
    setProduct({ ...product, variants: newVariants });
  };

  const handleVariantSizesChange = (index, value) => {
    const newVariants = [...product.variants];
    newVariants[index].sizes = value.split(",").map((s) => s.trim());
    setProduct({ ...product, variants: newVariants });
  };

// Main Product Images (append, max 5, avoid duplicates)
const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  setProduct((prev) => {
    const existingNames = prev.images.map(f => f.name);
    const newFiles = files.filter(f => !existingNames.includes(f.name));
    return {
      ...prev,
      images: [...prev.images, ...newFiles].slice(0, 5),
    };
  });
};

// Variant Images (append, max 5, avoid duplicates)
const handleVariantImageChange = (index, e) => {
  const files = Array.from(e.target.files);
  setProduct((prev) => {
    const newVariants = [...prev.variants];
    const existingNames = newVariants[index].images.map(f => f.name);
    const newFiles = files.filter(f => !existingNames.includes(f.name));
    newVariants[index].images = [...newVariants[index].images, ...newFiles].slice(0, 5);
    return { ...prev, variants: newVariants };
  });
};



  const addVariant = () => {
    setProduct({
      ...product,
      variants: [
        ...product.variants,
        {
          title: "",
          color: "",
          sizes: [""],
          price: "",
          discountedPrice: "",
          discountPercent: "",
          stock: "",
          images: [],
        },
      ],
    });
  };

  // ===== Submit =====
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Main product fields
      formData.append("title", product.title);
      formData.append("brand", product.brand);
      formData.append("category", product.category);
      formData.append("color", product.color);
      formData.append("sizes", JSON.stringify(product.sizes));
      formData.append("price", product.price);
      formData.append("discountedPrice", product.discountedPrice);
      formData.append("discountPercent", product.discountPercent);
      formData.append("quantity", product.quantity);
      formData.append("stock", product.stock);
      formData.append("description", product.description);

      // Offers
      if (product.offersInput) {
        const offersArray = product.offersInput
          .split(",")
          .map((o) => o.trim())
          .filter((o) => o);
        formData.append("offers", JSON.stringify(offersArray));
      }

      // Main product images
      product.images.forEach((file) => formData.append("product_images", file));

      // Variants (without images)
      const variantsToSend = product.variants.map((v) => ({
        title: v.title,
        color: v.color,
        sizes: v.sizes,
        price: v.price,
        discountedPrice: v.discountedPrice,
        discountPercent: v.discountPercent,
        stock: v.stock,
        images: [], // images will be sent separately
      }));
      formData.append("variants", JSON.stringify(variantsToSend));

      // Variant images
      product.variants.forEach((v, idx) => {
        v.images.forEach((file) =>
          formData.append(`variant_${idx}_images`, file)
        );
      });

      dispatch(createProduct(formData));
      toast.success("Product creation dispatched!");
    } catch (err) {
      toast.error("Error dispatching product creation");
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="title" placeholder="Title" value={product.title} onChange={handleChange} className="border p-2 rounded-md" required />
          <input type="text" name="brand" placeholder="Brand" value={product.brand} onChange={handleChange} className="border p-2 rounded-md" required />
          <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} className="border p-2 rounded-md" required />
          <input type="text" name="color" placeholder="Color" value={product.color} onChange={handleChange} className="border p-2 rounded-md" />
          <input type="text" placeholder="Sizes (comma separated)" value={product.sizes.join(",")} onChange={(e) => handleSizesChange(e.target.value)} className="border p-2 rounded-md" />
          <input type="text" name="offersInput" placeholder="Offers (comma separated)" value={product.offersInput} onChange={handleOffersChange} className="border p-2 rounded-md" />
          <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} className="border p-2 rounded-md" required />
          <input type="number" name="discountedPrice" placeholder="Discounted Price" value={product.discountedPrice} onChange={handleChange} className="border p-2 rounded-md" />
          <input type="number" name="discountPercent" placeholder="Discount Percent" value={product.discountPercent} onChange={handleChange} className="border p-2 rounded-md" />
          <input type="number" name="quantity" placeholder="Quantity" value={product.quantity} onChange={handleChange} className="border p-2 rounded-md" />
          <input type="number" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} className="border p-2 rounded-md" />
        </div>

        <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} className="border p-2 rounded-md w-full" />

        {/* Main Product Images */}
        <div>
          <label className="block mb-1 font-semibold">Product Images (1-5)</label>
          <input type="file" multiple onChange={handleImageChange} className="border p-2 rounded-md w-full" />
          <div className="flex gap-2 mt-2">
            {product.images.map((file, idx) => (
              <div key={idx} className="relative">
                <img src={URL.createObjectURL(file)} alt={`Product ${idx}`} className="w-20 h-20 object-cover rounded-md" />
                <button type="button" onClick={() => setProduct((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs">x</button>
              </div>
            ))}
          </div>
        </div>

        {/* Variants */}
        <h3 className="text-xl font-semibold mt-4 text-gray-700">Variants</h3>
        {product.variants.map((variant, idx) => (
          <div key={idx} className="border p-4 mb-4 rounded-md bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="title" placeholder="Variant Title" value={variant.title} onChange={(e) => handleVariantChange(idx, e)} className="border p-2 rounded-md" />
              <input type="text" name="color" placeholder="Color" value={variant.color} onChange={(e) => handleVariantChange(idx, e)} className="border p-2 rounded-md" />
              <input type="text" placeholder="Sizes (comma separated)" value={variant.sizes.join(",")} onChange={(e) => handleVariantSizesChange(idx, e.target.value)} className="border p-2 rounded-md" />
              <input type="number" name="price" placeholder="Variant Price" value={variant.price} onChange={(e) => handleVariantChange(idx, e)} className="border p-2 rounded-md" />
              <input type="number" name="discountedPrice" placeholder="Variant Discounted Price" value={variant.discountedPrice} onChange={(e) => handleVariantChange(idx, e)} className="border p-2 rounded-md" />
              <input type="number" name="discountPercent" placeholder="Variant Discount Percent" value={variant.discountPercent} onChange={(e) => handleVariantChange(idx, e)} className="border p-2 rounded-md" />
              <input type="number" name="stock" placeholder="Variant Stock" value={variant.stock} onChange={(e) => handleVariantChange(idx, e)} className="border p-2 rounded-md" />

              {/* Variant Images */}
              <div className="col-span-1 md:col-span-2">
                <label className="block mb-1 font-semibold">Variant Images (1-5)</label>
                <input type="file" multiple onChange={(e) => handleVariantImageChange(idx, e)} className="border p-2 rounded-md w-full" />
                <div className="flex gap-2 mt-2">
                  {variant.images.map((file, i) => (
                    <div key={i} className="relative">
                      <img src={URL.createObjectURL(file)} alt={`Variant ${i}`} className="w-20 h-20 object-cover rounded-md" />
                      <button type="button" onClick={() => setProduct((prev) => {
                        const newVariants = [...prev.variants];
                        newVariants[idx].images = newVariants[idx].images.filter((_, j) => j !== i);
                        return { ...prev, variants: newVariants };
                      })} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs">x</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        <button type="button" onClick={addVariant} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">Add Variant</button>

        <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
