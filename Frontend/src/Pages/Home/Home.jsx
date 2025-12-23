
import Products from '../../Components/Products/Products'
import Features from '../../Components/Features/Features'
import Categories from '../../Components/Categories/Categories'
import { categories } from '../../Components/Data/categories'
import Banner from '../../Components/Banner/Banner'
import Newsletter from '../../Components/Banner/Newsletter'
import HeroSection from '../../Components/Banner/HeroSection'

const Home = () => {

 

  return (
    <>
  
      <HeroSection />
      <Categories category={categories} />
      <Products />
      <Banner />
       <div className="px-5">
        <Features/>
       </div>
      <Newsletter />
  
    </>
  )
}

export default Home