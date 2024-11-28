import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/layout/layout";
import { HomePage } from "./pages/home";
import SignIn from "./pages/auth/signin";
import { RecoilRoot } from "recoil";
import ProtectedRoute from "./pages/auth/protected-route";
import UserPage from "./pages/user";
import CreatePage from "./pages/user/create";
import CreateProductPage from "./pages/product/create";
import PermissionPage from "./pages/permission";
import EditPage from "./pages/permission/edit";
import ProductPage from "./pages/product";
import NotFound from "./pages/not-found";

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route
              path="/"
              element={
                <ProtectedRoute perm="">
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<HomePage />}></Route>

              <Route path="/users">
                <Route
                  index
                  element={
                    <ProtectedRoute perm="listing-users">
                      <UserPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="create"
                  element={
                    <ProtectedRoute perm="create-users">
                      <CreatePage />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="/products">
                <Route
                  index
                  element={
                    <ProtectedRoute perm="listing-products">
                      <ProductPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="create"
                  element={
                    <ProtectedRoute perm="create-products">
                      <CreateProductPage />
                    </ProtectedRoute>
                  }
                />
              </Route>

              <Route path="permission">
                <Route
                  index
                  element={
                    <ProtectedRoute perm="admin">
                      <PermissionPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=":id/edit"
                  element={
                    <ProtectedRoute perm="admin">
                      <EditPage />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
