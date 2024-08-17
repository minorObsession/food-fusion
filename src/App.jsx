import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import toast, { Toaster } from "react-hot-toast";

import { ModalProvider } from "./ui/useModalContext";
import GlobalStyles from "./styles/GlobalStyles";
import Homepage from "./pages/Homepage";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Pizza from "./menu/pizza/Pizza";
import Pasta from "./menu/pasta/Pasta";
import Modal from "./ui/Modal";
import Mediterranean from "./menu/mediterranean/Mediterranean";
import Orders from "./pages/Orders";

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

              <Route path="pizza" element={<Pizza />} />
              <Route path="pasta" element={<Pasta />} />
              <Route path="mediterranean" element={<Mediterranean />} />

              <Route path="cart" element={<Cart />} />
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
        // containerClassName=""
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
