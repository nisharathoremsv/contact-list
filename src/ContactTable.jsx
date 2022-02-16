import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers, filterByAtoZ, filterByZtoA } from "./redux/user/action";
import {
  Box,
  Typography,
  Button,
  Avatar,
} from "@material-ui/core";
import { useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const UserTable = () => {
  const { users } = useSelector(state => state.userReducer)
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(getUsers())
  }, []);

  return (
    <div style={{ backgroundColor: "rgb(39, 163, 235)" }}>
      <Box style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        // width: "80%",
      }}>
        <div style={{ justifyContent: "center"}}>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ background: "aliceblue "}}
      >
        Filter
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => dispatch(filterByAtoZ())}>A to Z</MenuItem>
        <MenuItem onClick={() => dispatch(filterByZtoA())}>Z to A</MenuItem>
      </Menu>
    </div>
        {users.map((user) => (
          <Box
            key={user.id}
            display="flex"
            style={{
              height: "auto",
              marginBottom: 7,
              position: "relative",
              justifyContent: "center"
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                width: "50%",
                backgroundColor: "white",
                borderRadius: "16px",
                padding: "22px 20px"
              }}
            >
              <Avatar
                src={user.avatar}
                style={{ width: 48, height: 48, marginRight: 35 }}
              />
              <Box style={{ display: "flex", flexDirection: "column", width: "70%" }}>
                <Typography
                  style={{
                    color: "#081F32",
                    fontFamily: "Poppins",
                    fontWeight: 600,
                    fontSize: 18
                  }}
                >
                  {user.first_name}{''} {user.last_name}
                </Typography>
                <Typography
                  style={{
                    color: "#6E798C",
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: 15
                  }}
                >
                  {user.email}
                </Typography>
              </Box>
              <Button style={{ fontSize: "10px", background: "dodgerblue" }} onClick={() => dispatch(deleteUser(user.id))}>Delete</Button>
            </Box>
          </Box>
        ))}
      </Box>

    </div>
  );
}

export default UserTable