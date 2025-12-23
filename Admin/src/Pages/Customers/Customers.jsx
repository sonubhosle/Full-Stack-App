import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, AvatarGroup, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Customers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/user/all-users');
        const data = response.data;
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('Users Not Found');
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className='product-section' >
      <Card style={{ backgroundColor: "#1E201E" }} >
        <CardHeader title="Customers" style={{ color: "#969696" }} />
        <TableContainer component={Paper} style={{ backgroundColor: "#1E201E" }} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "white" }}>Image</TableCell>
                <TableCell style={{ color: "white" }}>Name</TableCell>
                <TableCell style={{ color: "white" }}>Id</TableCell>
                <TableCell style={{ color: "white" }}>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow
                  key={user._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align='left'>
                    <AvatarGroup sx={{ justifyContent: "start" }}>
                      <Avatar
                        key={index}
                        src={user.photo}
                        alt={user.name}
                      />
                    </AvatarGroup>
                  </TableCell>
                  <TableCell component="th" scope="row" style={{ color: "#969696" }}>
                    <p>{user.name} {user.surname}</p>
                  </TableCell>
                  <TableCell component="th" scope="row" style={{ color: "#969696" }}>
                      <p >{user._id}</p>
                  </TableCell>
                  <TableCell style={{ color: "#969696" }}>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}

export default Customers;
