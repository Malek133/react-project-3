
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PageNotFound from "../pages/PageNotFound";
import RootLayout from "../pages/Layout";
import ErrorHandler from "../components/errors/ErrorHandler";
import HomePage from "../pages";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import TodosAll from "../pages/TodosAll";



const storageKey = 'loggedIn';
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null
console.log(userData)


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} 
      errorElement={<ErrorHandler />}>
        <Route
          index
          element={
            <ProtectedRoute isAllowed={userData?.jwt} redirectPath="/login" 
            data={userData}>
               <TodosAll />
            </ProtectedRoute>
          }
        />
       
        {/* <Route
          path="/todos"
          element={
            <ProtectedRoute isAllowed={userData?.jwt} 
            redirectPath="/login" 
            data={userData}>
              <FirstPage />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAllowed={userData?.jwt} redirectPath="/login" 
            data={userData}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="login"
          element={
            <ProtectedRoute isAllowed={!userData?.jwt} redirectPath="/" 
            data={userData}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="register"
          element={
            <ProtectedRoute isAllowed={!userData?.jwt} 
            redirectPath="/login" data={userData?.jwt}>
              <RegisterPage />
            </ProtectedRoute>
          }
        />

      </Route>

      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
