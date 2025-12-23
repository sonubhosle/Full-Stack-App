import { Avatar, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import {findProducts } from '../../State/Admin_Products/Action';
import { useDispatch, useSelector } from 'react-redux';


const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);

    useEffect(() => {
        dispatch(findProducts());
    }, [dispatch]);


    return (
        <div className='product-section-2'>
            <Card className='mt-2' style={{ backgroundColor: "#1E201E" }}>
                <CardHeader title={'All Products'} style={{ color: "#969696" }} />
                <TableContainer component={Paper} style={{ backgroundColor: "#1E201E" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ color: "white" }}>Image</TableCell>
                                <TableCell style={{ color: "white" }}>Title</TableCell>
                                <TableCell style={{ color: "white" }}>Category</TableCell>
                                <TableCell style={{ color: "white" }}>Price</TableCell>
                                <TableCell style={{ color: "white" }}>Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.products?.content?.map((item) => (
                                <TableRow
                                    key={item._id} // Use a unique identifier for the key prop
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right">
                                        <Avatar src={item.image} />
                                    </TableCell>
                                    <TableCell component="th" scope="row" style={{ color: "#969696" }}>
                                        {item.title}
                                    </TableCell>
                                    <TableCell style={{ color: "#969696" }} >{item.category}</TableCell>
                                    <TableCell style={{ color: "#969696" }}>{item.price}</TableCell>
                                    <TableCell style={{ color: "#969696" }}>{item.quantity}</TableCell>
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
