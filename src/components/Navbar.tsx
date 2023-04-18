import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import CakeIcon from "@mui/icons-material/Cake";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import LogoutIcon from "@mui/icons-material/Logout";

import { NavBarPages } from "../common/types";
import { LoginModal } from "./LoginModal";
import { AuthContext } from "../context";
import { useSnackbar } from "notistack";

const pages: NavBarPages[] = [
  {
    title: "Products",
    path: "/products",
    level: "user",
  },
  {
    title: "Manage Products",
    path: "/admin",
    level: "admin",
  },
];

const menuItemStyle = {
  textDecoration: "none",
  marginRight: "20px",
  color: "inherit",
};

export const MenuItem = (page: NavBarPages) => {
  return (
    <Link to={page.path} key={page.title} style={menuItemStyle}>
      {page.title}
    </Link>
  );
};

export const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const [openLogin, setOpenLogin] = React.useState<boolean>(false);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const openModalLogin = () => {
    setOpenLogin(true);
  };

  const logOut = () => {
    logout();
    enqueueSnackbar("Logged out", {
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "top" },
    });
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <CakeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {isLoggedIn ? (
                  <div>
                    {pages
                      .filter(
                        (page) =>
                          page.level === "user" || page.level === "admin"
                      )
                      .map((page) => (
                        <MenuItem
                          path={page.path}
                          level={page.level}
                          title={page.title}
                        />
                      ))}
                  </div>
                ) : (
                  <div>
                    {pages
                      .filter((page) => page.level === "user")
                      .map((page) => (
                        <MenuItem
                          path={page.path}
                          level={page.level}
                          title={page.title}
                        />
                      ))}
                  </div>
                )}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {isLoggedIn ? (
                <div>
                  {pages
                    .filter(
                      (page) => page.level === "user" || page.level === "admin"
                    )
                    .map((page) => (
                      <MenuItem
                        path={page.path}
                        level={page.level}
                        title={page.title}
                      />
                    ))}
                </div>
              ) : (
                <div>
                  {pages
                    .filter((page) => page.level === "user")
                    .map((page) => (
                      <MenuItem
                        path={page.path}
                        level={page.level}
                        title={page.title}
                      />
                    ))}
                </div>
              )}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {!isLoggedIn ? (
                <Tooltip title="Admin Area">
                  <IconButton onClick={openModalLogin} sx={{ p: 0 }}>
                    <LockPersonIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Log Out">
                  <IconButton onClick={logOut} sx={{ p: 0 }}>
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <LoginModal open={openLogin} setOpenState={setOpenLogin} />
    </>
  );
};
