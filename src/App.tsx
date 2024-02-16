import Branches from '@components/Branches';
import Login from '@components/LogIn';
import ToastContainer from '@components/Toast/ToastContainer';
import MainLayout from '@components/layouts/MainLayout';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppDispatch, RootState } from '@store/store';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import useLang from './hooks/useLang';
import { darkTheme, lightTheme } from './main';
import { switchMode } from './reducers/AppSlice';
import RouteLayout from '@components/layouts/RouteLayout';
import Suppliers from '@components/Suppliers';
import Products from '@components/Products';
import OverViews from '@components/Processes';
import BranchDetails from '@components/Branches/BranchDetails';
import ProductDetails from '@components/Products/ProductDetails';
import AddAdminProcess from '@components/Processes/AddAdminProcess';
import Settings from '@components/Settings';
import DeleteContainer from '@components/shared/DeleteDialog/DeleteContainer';
import EditAdminProcess from '@components/Processes/EditAdminProcess';

function App() {
  const { t, i18n } = useTranslation();
  const { changeHtml } = useLang();
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useLocation();
  const { menuStatus, mode } = useSelector((state: RootState) => state.App);
  const handleBodyOverflow = React.useCallback(() => {
    document.body.style.overflow = menuStatus ? 'hidden' : 'auto';
  }, [menuStatus]);
  const { GetUserData, isLoggedIn } = useAuth();

  React.useEffect(() => {
    handleBodyOverflow();
  }, [handleBodyOverflow]);

  React.useEffect(() => {
    // Check for any existed theme mode and update it
    const siteMode = localStorage.getItem('site-mode');
    dispatch(switchMode(siteMode ? JSON.parse(siteMode) : 'dark'));

    // Chnage HTML dir onLaod
    changeHtml(i18n.language);
  }, [isLoggedIn()]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <>
      <ThemeProvider theme={mode == 'dark' ? darkTheme : lightTheme}>
        <CssBaseline />
        <div className=" relative  ">
          <DeleteContainer />
          <ToastContainer />
          <Routes>
            <Route
              path="/branches"
              element={
                <MainLayout>
                  <Branches />
                </MainLayout>
              }
            />
            <Route
              path="/branches/:id"
              element={
                <MainLayout>
                  <BranchDetails />
                </MainLayout>
              }
            />
            <Route path="/products" element={<Products />} />
            <Route
              path="/products/:id"
              element={
                <MainLayout>
                  <ProductDetails />
                </MainLayout>
              }
            />
            <Route
              path="/suppliers"
              element={
                <MainLayout>
                  <Suppliers />
                </MainLayout>
              }
            />
            <Route
              path="/suppliers/:id"
              element={
                <MainLayout>
                  <BranchDetails />
                </MainLayout>
              }
            />
            <Route
              path="/overview"
              element={
                <MainLayout>
                  <OverViews />
                </MainLayout>
              }
            />
            <Route
              path="/settings"
              element={
                <MainLayout>
                  <Settings />
                </MainLayout>
              }
            />
            <Route
              path="/adminProcess"
              element={
                <MainLayout>
                  <AddAdminProcess />
                </MainLayout>
              }
            />
            <Route
              path="/adminModifyProcess/:id"
              element={
                <MainLayout>
                  <EditAdminProcess />
                </MainLayout>
              }
            />
            <Route path="/signin" element={<Login />} />
            <Route path="/" element={<RouteLayout />} />
          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
