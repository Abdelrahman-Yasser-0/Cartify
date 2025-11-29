import { Route, Routes } from "react-router-dom";

import ProductDetailes from "./pages/home/ProductDetailes";
import ProductListing from "./pages/home/ProductListing";
import Cart from "./pages/home/Cart";
import Admin_Analytics from "./pages/admin Account Hub/Admin_Analytics";
import Admin_Categories from "./pages/admin Account Hub/Admin_Categories";
import Admin_Customers from "./pages/admin Account Hub/Admin_Customers";
import Admin_Inventory from "./pages/admin Account Hub/Admin_Inventory";
import Admin_Order_Detail from "./pages/admin Account Hub/Admin_Order_Detail";
import Admin_Orders from "./pages/admin Account Hub/Admin_Orders";
import Admin_Overview from "./pages/admin Account Hub/Admin_Overview";
import Admin_Payments from "./pages/admin Account Hub/Admin_Payments";
import Admin_Product_Add_Edit from "./pages/admin Account Hub/Admin_Product_Add_Edit";
import Admin_Products from "./pages/admin Account Hub/Admin_Products";
import Admin_Roles_and_Permissions from "./pages/admin Account Hub/Admin_Roles_and_Permissions";
import Admin_Settings from "./pages/admin Account Hub/Admin_Settings";
import Account_Addresses from "./pages/user Account Hub/Account_Addresses";
import Account_Order_Detail from "./pages/user Account Hub/Account_Order_Detail";
import Account_Orders from "./pages/user Account Hub/Account_Orders";
import Account_Overview from "./pages/user Account Hub/Account_Overview";
import Account_Payment_Methods from "./pages/user Account Hub/Account_Payment_Methods";
import Account_Preferences from "./pages/user Account Hub/Account_Preferences";
import Account_Profile from "./pages/user Account Hub/Account_Profile";
import Account_Security from "./pages/user Account Hub/Account_Security";
import Track_Order from "./pages/user Account Hub/Track_Order";
import Auth_Login from "./pages/authentication/Auth_Login";
import Auth_Signup from "./pages/authentication/Auth_Signup";
import Accessibility from "./pages/support and Legal/Accessibility";
import ContactUs from "./pages/support and Legal/ContactUs";
import CookiePolicy from "./pages/support and Legal/CookiePolicy";
import FAQs from "./pages/support and Legal/FAQs";
import LegalHub from "./pages/support and Legal/LegalHub";
import PrivacyPolicy from "./pages/support and Legal/PrivacyPolicy";
import ShippingReturns from "./pages/support and Legal/ShippingReturns";
import TermsOfService from "./pages/support and Legal/TermsOfService";
import Home from "./pages/home/Home";
import Admin_Customer_Detail from "./pages/admin Account Hub/Admin_Customer_Detail";
import NotFound from "./pages/NotFound";
<<<<<<< HEAD
=======
import Forgot_pass from "./pages/authentication/Forgot_pass";
import Checkout from "./pages/home/Checkout";
import OrderPlaced from "./pages/home/OrderPlaced";
>>>>>>> main

const App = () => {
  return (
    <div>
      <Routes>
        //-----------------------------------------------------Home-----------------------------------------------------//
        <Route path="/" element={<Home />} />
        <Route path="/product_detailes/:id" element={<ProductDetailes />} />
        <Route path="/product_listing" element={<ProductListing />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order_placed" element={<OrderPlaced />} />
        //-----------------------------------------------------Admin-----------------------------------------------------//
        <Route path="/admin/analytics" element={<Admin_Analytics />} />
        <Route path="/admin/categories" element={<Admin_Categories />} />
        <Route
          path="/admin/customer-detail"
          element={<Admin_Customer_Detail />}
        />
        <Route path="/admin/customers" element={<Admin_Customers />} />
        <Route path="/admin/inventory" element={<Admin_Inventory />} />
        <Route path="/admin/order-detail" element={<Admin_Order_Detail />} />
        <Route path="/admin/orders" element={<Admin_Orders />} />
        <Route path="/admin/overview" element={<Admin_Overview />} />
        <Route path="/admin/payments" element={<Admin_Payments />} />
        <Route
          path="/admin/product-add-edit"
          element={<Admin_Product_Add_Edit />}
        />
        <Route path="/admin/products" element={<Admin_Products />} />
        <Route
          path="/admin/roles-permissions"
          element={<Admin_Roles_and_Permissions />}
        />
        <Route path="/admin/settings" element={<Admin_Settings />} />
        //-----------------------------------------------------User-----------------------------------------------------//
        <Route
          path="/account/order-detail"
          element={<Account_Order_Detail />}
        />
        <Route path="/account/orders" element={<Account_Orders />} />
        <Route path="/account/overview" element={<Account_Overview />} />
        <Route
          path="/account/payment-methods"
          element={<Account_Payment_Methods />}
        />
        <Route path="/account/preferences" element={<Account_Preferences />} />
        <Route path="/account/profile" element={<Account_Profile />} />
        <Route path="/account/security" element={<Account_Security />} />
        <Route path="/track-order" element={<Track_Order />} />
        //-----------------------------------------------------Auth-----------------------------------------------------//
        <Route path="/auth/login" element={<Auth_Login />} />
        <Route path="/auth/signup" element={<Auth_Signup />} />
        //-----------------------------------------------------Support_Legal--------------------------------------------------//
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/legal-hub" element={<LegalHub />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/shipping-returns" element={<ShippingReturns />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
