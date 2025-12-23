import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import SearchCard from "./SearchCard"; 
import ProductError from "../Products/Product_Error";
import { findProducts } from "../../State/Products/Action";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search)?.get("query")?.toLowerCase();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  // Fetch products if not already
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(findProducts());
    }
  }, [dispatch, products]);

  // Flatten products + variants for search
  const allItems = products.flatMap((product) => {
    const mainProduct = { ...product, isVariant: false };
    const variants = product.variants?.map((v, idx) => ({
      _id: v._id || `${product._id}-${v.color}-${idx}`,
      ...v,
      productId: product._id, // reference main product
      title: v.title || product.title,
      brand: product.brand,
      category: product.category,
      isVariant: true,
    })) || [];
    return [mainProduct, ...variants];
  });

  const normalizedQuery = query?.trim().toLowerCase() || "";

  // If query matches a color exactly, show only matching variants
  const colorMatchedItems = allItems.filter(
    (item) => item.color?.toLowerCase() === normalizedQuery
  );

  let results;

  if (colorMatchedItems.length > 0) {
    results = colorMatchedItems;
  } else {
    results = allItems.filter((item) => {
      const title = item.title?.toLowerCase() || "";
      const category = item.category?.toLowerCase() || "";
      const brand = item.brand?.toLowerCase() || "";

      return title.includes(normalizedQuery) ||
             category.includes(normalizedQuery) ||
             brand.includes(normalizedQuery);
    });
  }

  return (
    <div className="px-5 py-10">
      <h2 className="text-2xl font-semibold mb-4">
        Search results for: <span className="text-emerald-700">{query}</span>
      </h2>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((item) => (
            <SearchCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <ProductError name="Search" message="No products found." />
      )}
    </div>
  );
};

export default SearchResults;
