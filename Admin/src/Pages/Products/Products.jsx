import { Avatar, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import { deleteProduct, findProducts } from '../../State/Admin_Products/Action';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  console.log(products)
  useEffect(() => {
    dispatch(findProducts());
  }, [dispatch]);

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId))
      .then(() => {
        toast.success('Product deleted successfully!');
        dispatch(findProducts()); // Refetch the products list
      })
      .catch(error => {
        toast.error('Failed to delete product. Please try again.');
      });
  };

  const handleProductEdit = (productId) => {
    navigate(`/admin/update/product/${productId}`); // Navigate to the update page
  };

  return (
    <div className='product-section' >
      <Card className='mt-2' style={{backgroundColor:"#1E201E"}}  >
        <CardHeader title={'All Products'} style={{color:"#969696"}}/>
        <TableContainer component={Paper} style={{backgroundColor:"#1E201E"}}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" >
            <TableHead>
              <TableRow >
                <TableCell style={{color:"white"}}>Image</TableCell>
                <TableCell style={{color:"white"}}>Title</TableCell>
                <TableCell style={{color:"white"}}>Category</TableCell>
                <TableCell style={{color:"white"}}>Price</TableCell>
                <TableCell style={{color:"white"}}>Quantity</TableCell>
                <TableCell style={{color:"white"}}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.products?.map((item) => (
                <TableRow
                  key={item._id} // Use a unique identifier for the key prop
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell >
                    <Avatar src={item.image} />
                  </TableCell>
                  <TableCell component="th" scope="row" style={{color:"#969696"}}>
                    {item.title}
                  </TableCell>
                  <TableCell style={{color:"#969696"}} >{item.category}</TableCell>
                  <TableCell style={{color:"#969696"}} >{item.price}</TableCell>
                  <TableCell style={{color:"#969696"}}>{item.quantity}</TableCell>
                  <TableCell >
                    <Button onClick={() => handleProductEdit(item._id)} variant='outlined' style={{ marginRight: '8px' }}>Edit</Button>
                    <Button onClick={() => handleProductDelete(item._id)} variant='outlined'>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default Products;
