import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './redux/index';
import {
  HomePage,
  OrderPage,
  CategoryPage,
  BranchPage,
  CreationPage,
} from './pages';
import { NotFound } from 'components/common';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLayout from 'components/layout/Admin';
import { ThemeProvider } from 'react-bootstrap';

function App() {
  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    >
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={OrderPage} />
              <Route path="order" element={<OrderPage />} />
              <Route path="category" element={<CategoryPage />} />
              <Route path="branch" element={<BranchPage />} />
              <Route path="creation" element={<CreationPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <ToastContainer />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
