import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import React from 'react';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { lightTheme } from '@src/main';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@src/hooks/useAuth';
import { gradientBackGround } from '@src/styles/globalMuiStyls';

const SideMenuList = [
  {
    title: 'Filialen',
    roles: ['admin'],
    icon: <StorefrontIcon color="inherit" />,
    path: '/branches',
  },
  {
    title: 'Lieferanten',
    roles: ['admin'],
    icon: <PrecisionManufacturingIcon color="inherit" />,
    path: '/suppliers',
  },
  {
    title: 'Produkte',
    roles: ['admin', 'branch', 'supplier'],
    icon: <FastfoodIcon color="inherit" />,
    path: '/products',
  },
  {
    title: 'Überblick',
    roles: ['admin'],
    icon: <BarChartIcon color="inherit" />,
    path: '/overview',
  },
  {
    title: 'Einstellungen',
    roles: ['admin'],
    icon: <SettingsIcon color="inherit" />,
    path: '/settings',
  },
];

function SideMenu() {
  const { pathname } = useLocation();
  const { GetUserData } = useAuth();

  return (
    <div className=" h-full min-h-[calc(100vh-60px)] max-h-[100vh] sticky top-0 ">
      <Paper className=" h-full px-1 lg:px-3" elevation={3}>
        <List>
          {SideMenuList.filter((item) =>
            item.roles.includes(GetUserData()?.role)
          ).map((item, index) => {
            return (
              <ListItem
                disablePadding
                key={index}
                sx={{
                  backgroundImage: pathname.startsWith(item.path)
                    ? gradientBackGround
                    : '',
                  color: pathname.startsWith(item.path) ? '#fff' : '',
                  fontWeight: pathname.startsWith(item.path) ? 800 : '',
                  borderRadius: '9px',
                }}
              >
                <Link to={item.path} className=" w-full">
                  <ListItemButton sx={{ borderRadius: '9px' }}>
                    <ListItemIcon>
                      <span
                        className={`${
                          pathname.startsWith(item.path) ? 'text-white' : ''
                        } `}
                      >
                        {item.icon}
                      </span>
                    </ListItemIcon>
                    <span className=" hidden md:block">
                      <ListItemText
                        primary={item.title}
                        sx={{
                          fontWeight: pathname.startsWith(item.path) ? 800 : '',
                        }}
                      />
                    </span>
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </div>
  );
}

export default SideMenu;
