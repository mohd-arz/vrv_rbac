import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/layout/layout";
import { HomePage } from "./pages/home";
import SignIn from "./pages/auth/signin";
import { RecoilRoot } from "recoil";
import ProtectedRoute from "./pages/auth/protected-route";
import UserPage from "./pages/user";
import CreatePage from "./pages/user/create";

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
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<HomePage />}></Route>

              <Route path="/users">
                <Route index element={<UserPage />} />
                <Route path="create" element={<CreatePage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
