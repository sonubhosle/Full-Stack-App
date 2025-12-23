import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, } from 'lucide-react';
import ProductCard from './ProductCard';
import Buttons from '../../UI/Buttons';
import { findProducts } from '../../State/Products/Action';
import { useDispatch, useSelector } from 'react-redux';



export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [direction, setDirection] = useState('right');
  const dispatch = useDispatch()
  const { products } = useSelector(state => state.products);
 
  useEffect(() => {
    dispatch(findProducts());
  }, [dispatch]);

  const getVisibleCards = () => {
    const prevIndex = (currentIndex - 1 + products.length) % products.length;
    const nextIndex = (currentIndex + 1) % products.length;
    return {
      prev: products[prevIndex],
      current: products[currentIndex],
      next: products[nextIndex],
    };
  };

  const handleNext = () => {
    if (isFlipping) return;
    setDirection('right');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
      setIsFlipping(false);
    }, 700);
  };

  const handlePrev = () => {
    if (isFlipping) return;
    setDirection('left');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
      setIsFlipping(false);
    }, 700);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isFlipping]);

  return (
    <section className="= bg-white flex items-center justify-center px-5 py-10">
      <div className="w-full py-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 ">
          {/* Left Side - Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span> Explore Something New</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 bg-clip-text text-transparent ">
                Shop Smart
                <span className="block bg-gradient-to-r from-purple-700 via-emerald-700 to-emerald-800 bg-clip-text text-transparent">
                  Live Better.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0">
                Shop top brands, exclusive deals, and latest trends across fashion, electronics, home, and more.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Buttons />
            </div>

            <div className="flex items-center gap-8 justify-center lg:justify-start pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">50K+</p>
                <p className="text-sm text-slate-600">Happy Customers</p>
              </div>
              <div className="h-12 w-px bg-slate-300"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">4.9</p>
                <p className="text-sm text-slate-600">Average Rating</p>
              </div>
              <div className="h-12 w-px bg-slate-300"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">1000+</p>
                <p className="text-sm text-slate-600">Products</p>
              </div>
            </div>
          </div>

          {/* Right Side - Product Cards Carousel */}
          <div className="relative sm-m">
            <div className="relative h-[400px] md:h-[500px] flex items-center justify-center" style={{ perspective: '1500px' }}>
              {/* Previous Card (Background Left) */}
              <ProductCard
                product={getVisibleCards().prev}
                position="prev"
                isFlipping={isFlipping && direction === 'left'}
                direction={direction}
              />

              {/* Current Card (Main) */}
              <ProductCard
                key={currentIndex}
                product={getVisibleCards().current}
                position="current"
                isFlipping={isFlipping}
                direction={direction}
              />

              {/* Next Card (Background Right) */}
              <ProductCard
                product={getVisibleCards().next}
                position="next"
                isFlipping={isFlipping && direction === 'right'}
                direction={direction}
              />
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
