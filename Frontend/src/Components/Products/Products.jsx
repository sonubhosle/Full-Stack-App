import React, { useEffect } from 'react';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { findProducts } from '../../State/Products/Action';
import { useNavigate } from 'react-router-dom';
import ProductError from './Product_Error';
import Heading from '../Section_Heading/Heading';
import { Package } from 'lucide-react';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(findProducts());


  }, [dispatch]);

  // Show only first 5 products
  const limitedProducts = products?.slice(0, 8) || [];

  return (
    <div className="px-5 py-10">
      <div className="flex justify-between items-center mb-6">
       <Heading  heading={'Our'} headingcolor={'Products'} subtitle={'Products'} icon={<Package/>}/>
        {/* View More Button */}
        {products?.length > 8 && (
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/all-products')}
              className="bg-pink-600 text-white px-8 py-3 rounded-full font-medium hover:bg-pink-700 transition duration-300"
            >
              View More
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          limitedProducts.map((item) => <Card item={item} key={item._id} />)
        }
      </div>

     {limitedProducts.length === 0 && <ProductError />}

    </div>
  );
};

export default Products;
