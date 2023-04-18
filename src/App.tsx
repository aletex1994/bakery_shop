import { HashRouter, Route, Routes } from "react-router-dom";
import { ProductsPage } from "./pages/Products";
import { AdminAreaPage } from "./pages/AdminArea";
import { Layout } from "./components/Layout";
import { SnackbarProvider } from "notistack";
import { AuthContextProvider } from "./context";
import "./App.css";
function App() {
  return (
    <HashRouter>
      <AuthContextProvider>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <Layout>
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/admin" element={<AdminAreaPage />} />
            </Routes>
          </Layout>
        </SnackbarProvider>
      </AuthContextProvider>
    </HashRouter>
  );
}

export default App;
