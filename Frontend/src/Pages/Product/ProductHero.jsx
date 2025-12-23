import { useEffect, useState } from 'react';
import { Star, CheckCircle2, Gift, UserStar, Shirt } from 'lucide-react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findProductsById, getRelatedProducts } from '../../State/Products/Action';
import { addItemToCart } from '../../State/Carts/Action';
import { toast } from 'react-toastify';
import ImageGallery from './ImageGallery';
import Buttons from './Buttons';
import Reviews from '../../Components/Rating_Reviews/Reviews';
import Heading from '../../Components/Section_Heading/Heading';
import Card from '../../Components/Products/Card';
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';

const ProductHero = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const { relatedProducts,  } = useSelector((state) => state.products);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  // Get variantId from URL query
  const query = new URLSearchParams(location.search);
  const variantIdFromUrl = query.get('variantId');

  // Fetch product by ID
  useEffect(() => {
    dispatch(findProductsById({ productId }));
    dispatch(getRelatedProducts( productId ))
  }, [productId, dispatch]);

  // Set default variant & image after product load
  useEffect(() => {
    if (products.product) {
      const allVariants = [products.product, ...(products.product.variants || [])];
      const selected = variantIdFromUrl
        ? allVariants.find(v => v._id === variantIdFromUrl) || allVariants[0]
        : allVariants[0];

      setSelectedVariant(selected);
      setSelectedImage(selected.images?.[0] || '');
      setSelectedSize(selected.sizes?.[0] || '');
    }
  }, [products.product, variantIdFromUrl]);

  if (!products.product) return <p className="text-center py-20">Product not found</p>;

  const product = products.product;
  const allVariants = [product, ...(product.variants || [])];

  // Handle variant selection
  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setSelectedImage(variant.images[0]);
    setSelectedSize(variant.sizes?.[0] || '');
    // Update URL with variantId
    navigate(`/product/${productId}?variantId=${variant._id}`, { replace: true });
  };

  // Display helpers
  const displayValue = (key) => selectedVariant?.[key] ?? product[key];
  const displaySizes = () => selectedVariant?.sizes ?? product.sizes ?? [];
  const displayTitle = () => {
    if (!selectedVariant) return product.title;
    return selectedVariant.title || `${product.title}${selectedVariant.color ? ` - ${selectedVariant.color}` : ''}`;
  };

  // Check stock: main product uses quantity, variant uses stock
  const stockQty = selectedVariant?._id === product._id
    ? product.quantity ?? 0
    : selectedVariant?.stock ?? 0;



  // Add to cart
  const handleAddToCart = () => {
    if (displaySizes()?.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }

    if (stockQty === 0) {
      toast.error('This product is out of stock');
      return;
    }

    const data = selectedVariant._id !== product._id
      ? {
        productId: product._id,
        variantId: selectedVariant._id,
        size: selectedSize || selectedVariant.sizes?.[0] || '',
        color: selectedVariant.color || ''
      }
      : {
        productId: product._id,
        size: selectedSize || selectedVariant.sizes?.[0] || '',
        color: selectedVariant.color || ''
      };

    dispatch(addItemToCart(data))
      .then(() => toast.success('Added to cart!'))
      .catch(() => toast.error('Failed to add to cart.'));
  };


  return (
    <>
    
      <div className="py-10 bg-white ">
       
        <div className="grid pb-10 px-5 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Details */}
          <div className="order-2 lg:order-1">
             <Breadcrumb />
            <p className="text-emerald-700 font-semibold mt-5">{product.brand}</p>

            <h1 className="text-2xl mt-5 md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">
              {displayTitle()}
            </h1>
            <p className={`font-medium ${stockQty > 0
                ? 'border border-emerald-700/20 text-sm rounded-xl bg-emerald-600/10 px-2 py-[1px] text-emerald-700'
                : 'border border-red-400/20 text-sm rounded-xl bg-red-400/10 px-2 py-[1px] text-red-400'
              }`}>
              {stockQty > 0 ? 'In Stock' : 'Out of Stock'}
            </p>

            {/* Ratings */}
            <h1 className='text-gray-500 text-lg font-semibold mb-3'>Rating & Reviews</h1>
            <div className="flex gap-6 items-center my-4">
              <div className="flex items-center gap-2 text-lg py-1 bg-amber-500/10 text-amber-500 px-3 rounded-xl border border-amber-500/20">
                {displayValue('numRatings')} <Star className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2 text-lg bg-gray-50 py-1 text-gray-800 px-3 rounded-xl border border-gray-200">
                Reviews: {displayValue('numReviews')}
              </div>
            </div>

            {/* Price */}
            <h1 className='text-gray-500 text-lg font-semibold mb-3'>Price</h1>
            <div className="flex items-center gap-5 mb-5">
              <p className="text-4xl font-bold text-gray-900">₹{displayValue('discountedPrice')}</p>
              <p className="text-2xl text-gray-600 line-through">₹{displayValue('price')}</p>
              <p className="text-emerald-700 font-semibold">{displayValue('discountPercent')}% Off</p>
            </div>

            {/* Variant Thumbnails */}
            <h1 className='text-gray-500 text-lg font-semibold mb-3'>Colors</h1>
            {allVariants.length > 1 && (
              <div className="flex gap-2 mb-4">
                {allVariants.map((variant) => (
                  <div
                    key={variant._id}
                    className={`w-17 h-17 border-3 rounded-md overflow-hidden cursor-pointer ${selectedVariant?._id === variant._id ? 'border-emerald-700' : 'border-white'
                      }`}
                    onClick={() => handleVariantSelect(variant)}
                  >
                    <img src={variant.images[0]} alt={variant.title} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Sizes */}
            <h1 className='text-gray-500 text-lg font-semibold mb-3'>Sizes</h1>
            {displaySizes()?.length > 0 && (
              <div className="mb-10">
                <div className="flex gap-2 flex-wrap">
                  {displaySizes().map((size) =>
                    size.split(',').map((s) => (
                      <span
                        key={s}
                        className={`px-4 py-2 border-3 rounded-md text-lg cursor-pointer ${selectedSize === s
                            ? 'border-emerald-700 bg-emerald-700/10 text-emerald-700 font-semibold'
                            : 'border-gray-300 text-gray-700'
                          }`}
                        onClick={() => setSelectedSize(s)}
                      >
                        {s}
                      </span>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <Buttons cart={handleAddToCart} disabled={stockQty === 0} />

            {/* Description */}
            <div className="my-6">
              <h3 className="py-3 text-lg text-gray-600">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Offers */}
            {product.offers?.length > 0 && (
              <div className="rounded-xl mb-6">
                <div className="py-3 text-lg text-gray-600 flex gap-2 items-center">
                  <Gift className="w-6 h-6" /> Special Offers
                </div>
                <ul className="space-y-2">
                  {product.offers.map((offer, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-emerald-700 bg-emerald-700/10 p-3 rounded-xl border border-emerald-700/20 font-semibold"
                    >
                      <CheckCircle2 size={18} className="text-emerald-700 mt-0.5 flex-shrink-0" />
                      <span>{offer}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Image Gallery */}
          <div className="order-1 lg:order-2">
            <ImageGallery
              images={selectedVariant?.images || product.images}
              selectedImage={selectedImage}
              onImageSelect={setSelectedImage}
            />
          </div>


        </div>
      </div>

      {/* Reviews */}
      <div className="px-5 mt-5">
        <Heading  heading={'Ratings &'} headingcolor={'Reviews'} icon={<UserStar />}/>  
      </div>
      <Reviews />
       <div className="px-5">
        <Heading  heading={'Related'} headingcolor={'Products'} icon={<Shirt />}/>  
      </div>
     <div className="px-5 mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
              relatedProducts.map((item) => <Card item={item} key={item._id} />)
            }
          </div>
    </>
  );
};

export default ProductHero;
