import * as React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;
const navItems = [
  { name: 'Dashboard', path: '/' },
  {name: 'Create Ads', path: '/create-ad'}
];

function DrawerAppBar(props) {
  const history = useHistory();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  //   const handleClick = (path) => {
  //       console.log(path)
  //       history.push(`${path}`)
  //   }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        APP LOGO
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText
                onClick={() => {
                  history.push(item.path);
                }}
                primary={item.name}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar sx={{ backgroundColor: 'white', color: 'black', boxShadow: 1 }}>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant='h6'
              component='div'
              sx={{
                flexGrow: 1,
                fontWeight: 'bold',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              APP LOGO
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  sx={{ color: 'black' }}
                  onClick={() => {
                    history.push(item.path);
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
      <Box sx={{ p: 2, mt: 9 }}>
        {/* <Toolbar /> */}
        {props.children}
      </Box>
    </>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
