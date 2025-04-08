import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import { ModalProvider } from "./ui/useModalContext";
import GlobalStyles from "./styles/GlobalStyles";
import Homepage from "./pages/Homepage";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Modal from "./ui/Modal";

import Orders from "./pages/Orders";
import FoodProductPage from "./pages/FoodPage";
import FAQ from "./pages/FAQ";

// ! to improve:
// * HPAGE - UNTIL IMAGE IS LOADED DON'T SHOW ANYTHING!
// ! ALL BTNS TO HAVE SAME HOVER EFFECT
// ! FAQ - clik on button - scroll margin top!
// * REACT QUERY LOADING!!! DOESN'T WORK AT ALL

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <ModalProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" index element={<Homepage />} />
              <Route path="loginAdmin" element={<Modal type="loginAdmin" />} />
              <Route
                path="loginCustomer"
                element={<Modal type="loginCustomer" />}
              />
              <Route path="signup" element={<Modal type="signup" />} />

              <Route
                path="pizza"
                element={<FoodProductPage queryKey="pizza" />}
              />
              <Route
                path="pasta"
                element={<FoodProductPage queryKey="pasta" />}
              />
              <Route
                path="mediterranean"
                element={<FoodProductPage queryKey="mediterranean" />}
              />

              <Route path="cart" element={<Cart />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="order/:orderID" element={<Order />} />
              <Route path="orders" element={<Orders />}></Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ModalProvider>
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={50}
        containerStyle={{ margin: "50px" }}
        toastOptions={{
          // Define default options
          style: {
            background: "var(--color-brand-200)",
            color: "var(--color-grey-700)",
            fontWeight: 600,
          },

          // Default options for specific types
          success: {
            duration: 2000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 5000,
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
