import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarGroup, Button, Card, CardHeader, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { confirmOrder, deleteOrder, deliverOrder, getOrder, shipOrder } from '../../State/Admin_Orders/Action';

const Orders = () => {
  const dispatch = useDispatch();
  const adminOrder = useSelector(state => state.adminOrder);
  console.log(adminOrder)

  useEffect(() => {
    dispatch(getOrder());
  }, [adminOrder.confirmed, adminOrder.shipped, adminOrder.delivered, adminOrder.deletedOrder]);


  const [anchorEl, setAnchorEl] = useState([]);
  const open = Boolean(anchorEl);

  const handleClick = (event, index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorEl(newAnchorElArray);
  };

  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = null
    setAnchorEl(newAnchorElArray);
  };


  const handleShipOrder = (orderId) => {
    dispatch(shipOrder(orderId))
  }
  const handleConfirmedOrder = (orderId) => {
    dispatch(confirmOrder(orderId))
  }

  const handleDeliveredOrder = (orderId) => {
    dispatch(deliverOrder(orderId))
  }

  const handleOrderDelete = (orderId) => {
    dispatch(deleteOrder(orderId))
  };




  return (
    <div className='product-section'>
      <Card className="mt-2" style={{ backgroundColor: "#1E201E" }} >
        <CardHeader title="All Products" style={{ color: "#969696" }} />
        <TableContainer component={Paper} style={{ backgroundColor: "#1E201E" }} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "white" }}>Image</TableCell>
                <TableCell style={{ color: "white" }}>Title</TableCell>
                <TableCell style={{ color: "white" }}>Id</TableCell>
                <TableCell style={{ color: "white" }}>Price</TableCell>
                <TableCell style={{ color: "white" }}>Update</TableCell>
                <TableCell style={{ color: "white" }}>Status</TableCell>
                <TableCell style={{ color: "white" }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrder?.orders.map((order, index) => (
                <TableRow
                  key={order._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align='left'>
                    <AvatarGroup sx={{ justifyContent: "start" }}>
                      {order.orderItems.map((orderItem) => (
                        <Avatar
                          key={orderItem.product._id}
                          src={orderItem.product?.image}
                          alt={orderItem.product?.title}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell component="th" scope="row" style={{ color: "#969696" }}>
                    {order.orderItems.map((orderItem) => (
                      <p key={orderItem.product._id}>{orderItem.product?.title}</p>
                    ))}
                  </TableCell>
                  <TableCell component="th" scope="row" style={{ color: "#969696" }}>
                    {order.orderItems.map((orderItem) => (
                      <p key={orderItem.product._id}>{orderItem.product?._id}</p>
                    ))}
                  </TableCell>
                  <TableCell style={{ color: "#969696" }}>{order.totalPrice}</TableCell>
                  <TableCell style={{ color: "#969696" }}><span className={` text-white px-5 py-1 rounded-full ${order.orderStatus === "CONFIRMED" ? "bg-[#00b894]" :
                    order.orderStatus === "SHIPPED" ? "bg-[blue]" :
                      order.orderStatus === "PLACED" ? "bg-[#44bd32]" :
                        order.orderStatus === "PENDING" ? "bg-[gray]" :
                          "bg-[green]"}`}>{order.orderStatus}</span></TableCell>
                  <TableCell >
                    <Button
                      id="basic-button"
                      area-controls={`basic-menu-${order._id}`}
                      aria-expanded={Boolean(anchorEl[index])}
                      aria-haspopup="true"
                      onClick={(event) => handleClick(event, index)} > Status</Button>
                    <Menu
                      id={`basic-menu-${order._id}`}
                      anchorEl={anchorEl[index]}
                      open={Boolean(anchorEl[index])}
                      onClose={() => handleClose(index)}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={() => handleConfirmedOrder(order._id)}>Confirmed Order</MenuItem>
                      <MenuItem onClick={() => handleShipOrder(order._id)}>Ship Order</MenuItem>
                      <MenuItem onClick={() => handleDeliveredOrder(order._id)}>Delivered Order</MenuItem>
                    </Menu>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => handleOrderDelete(order._id)}
                      variant="outlined"
                    >
                      Delete
                    </Button>
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

export default Orders;
