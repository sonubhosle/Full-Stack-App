import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 991);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const products = useSelector((state) => state.products.products || []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query.trim()) return setSuggestions([]);

    const allItems = products.flatMap((product) => {
      const mainProduct = {
        _id: product._id,
        title: product.title,
        category: product.category,
        brand: product.brand,
        color: product.color,
        image: product.poster || product.images?.[0],
        isVariant: false,
      };
      const variants =
        product.variants?.map((v) => ({
          _id: v._id || `${product._id}-${v.color}`,
          title: v.title || product.title,
          brand: product.brand,
          color: v.color,
          category: product.category,
          image: v.images?.[0] || product.poster || product.images?.[0],
          isVariant: true,
        })) || [];
      return [mainProduct, ...variants];
    });

    const matched = allItems.filter((item) => {
      return (
        item.title?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query) ||
        item.color?.toLowerCase().includes(query) ||
        item.brand?.toLowerCase().includes(query)
      );
    });

    setSuggestions(matched.slice(0, 8));
  };

  const handleSelect = (item) => {
    setSearchQuery("");
    setSuggestions([]);
    setOpen(false);
    const query = item.color?.toLowerCase() || item.title;
    navigate(`/search-results?query=${encodeURIComponent(query)}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSuggestions([]);
    setOpen(false);
    navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      {/* Mobile button (shown only below 991px) */}
      {isMobile && !open && (
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-3.5 text-gray-600 rounded-xl border border-gray-200 bg-gray-50 hover:text-emerald-800 hover:bg-emerald-800/10 hover:border-emerald-800/20 transition z-50 relative"
        >
          <Search className="w-6 h-6" />
        </button>
      )}

      {/* Mobile absolute search overlay */}
      <AnimatePresence>
        {isMobile && open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed w-full top-[80px] border-t border-gray-200 left-0 inset-0 z-50  flex justify-center items-start"
          >
            <div className="relative w-full ">
              <button
                onClick={() => setOpen(false)}
                className="absolute right-6 top-6 text-gray-800 z-10"
              >
                <X size={30} />
              </button>

              <form onSubmit={handleSubmit} className="bg-white w-full p-3">
                <input
                  type="text"
                  placeholder="Search products, colors, or brands..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  autoFocus
                  className="w-full  rounded-xl py-4 px-4 pr-10 outline-none border border-gray-200 focus:border-emerald-600"
                />
              </form>

              {searchQuery.trim() !== "" && (
                <motion.ul
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="w-full  bg-white rounded-xl  overflow-hidden max-h-80 overflow-y-auto"
                >
                  {suggestions.length > 0 ? (
                    suggestions.map((item) => (
                      <li
                        key={item._id}
                        onClick={() => handleSelect(item)}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50  cursor-pointer transition"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                        />
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800 text-sm mb-1">
                            {item.title}
                          </span>
                          <div className="flex gap-2 text-xs text-gray-500">
                            {item.brand && (
                              <span className="capitalize text-emerald-700 font-medium">
                                {item.brand.trim()}
                              </span>
                            )}
                            {item.color && (
                              <span className="capitalize text-gray-600">
                                {item.color}
                              </span>
                            )}
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-3 text-center text-gray-500 text-sm select-none">
                      No products found
                    </li>
                  )}
                </motion.ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop search */}
      {!isMobile && (
        <div className="relative w-full md:w-[400px]">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search products, colors, or brands..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full border border-gray-200 rounded-xl py-2.5 px-4 pr-10 outline-none focus:border-emerald-600 transition"
            />
            <Search className="absolute right-3 top-3 text-gray-500" size={20} />
          </form>

          {searchQuery.trim() !== "" && (
            <motion.ul
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden max-h-80 overflow-y-auto"
            >
              {suggestions.length > 0 ? (
                suggestions.map((item) => (
                  <li
                    key={item._id}
                    onClick={() => handleSelect(item)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer transition"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800 text-sm mb-1">
                        {item.title}
                      </span>
                      <div className="flex gap-2 text-xs text-gray-500">
                        {item.brand && (
                          <span className="capitalize text-emerald-700 font-medium">
                            {item.brand.trim()}
                          </span>
                        )}
                        {item.color && (
                          <span className="capitalize text-gray-600">
                            {item.color}
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-center text-gray-500 text-sm select-none">
                  No products found
                </li>
              )}
            </motion.ul>
          )}
        </div>
      )}
    </>
  );
};

export default SearchBar;
