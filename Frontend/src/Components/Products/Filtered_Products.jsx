import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux'
import { findProducts } from '../../State/Products/Action';
import Product_Error from './Product_Error';
import Heading from '../Section_Heading/Heading';
import { Shirt } from 'lucide-react';

const Filtered_Products = () => {

  const { name } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.products);
  console.log(products)
  useEffect(() => {
    dispatch(findProducts())
  }, [])

  const filtered_Products = products?.filter(product => product.category === name);
  console.log(filtered_Products)

  return (
    <div className='px-5 py-10'>
     <Heading heading={'Products Of '} subtitle={'Filtered just for you'} headingcolor={name} icon={<Shirt/>} />
      {filtered_Products?.length > 0 ? (
        filtered_Products?.map((item, index) => <Card item={item} key={index} />)
      ) : (
        <Product_Error name={name} message={'Product For'} />
      )}
    </div>
  )
}

export default Filtered_Products