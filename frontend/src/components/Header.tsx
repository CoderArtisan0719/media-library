import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;
  
    return (
      <AppBar position="static" sx={{ backgroundColor: '#24252a' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'left' }}>
            Media Library
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              component={Link}
              to="/upload"
              sx={{
                color: isActive('/upload') ? 'white' : '#bbb',
                backgroundColor: isActive('/upload') ? '#1976d2' : 'transparent',
                '&:hover': {
                  backgroundColor: isActive('/upload') ? '#115293' : 'rgba(255, 255, 255, 0.1)',
                },
                borderRadius: '8px',
                padding: '8px 16px',
                transition: 'all 0.3s ease',
              }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/"
              sx={{
                color: isActive('/') ? 'white' : '#bbb',
                backgroundColor: isActive('/') ? '#1976d2' : 'transparent',
                '&:hover': {
                  backgroundColor: isActive('/') ? '#115293' : 'rgba(255, 255, 255, 0.1)',
                },
                borderRadius: '8px',
                padding: '8px 16px',
                transition: 'all 0.3s ease',
              }}
            >
              Video List
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
  };

  export default Header;
