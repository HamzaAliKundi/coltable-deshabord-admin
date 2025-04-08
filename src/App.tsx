import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import PublicRoutes from "./pages/publicRoutes";
import ProtectedRoutes from "./pages/protextedRoutes";
import Layout from "./pages/layout";
import { Toaster } from "react-hot-toast";
import AddTask from "./components/tasks/addTask";
import EditTask from "./components/tasks/editTask";
import Tasks from "./pages/tasks";
import Signup from "./pages/auth/signUp";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Layout />}>
            
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="tasks" element={<Tasks />} />
            <Route path="task/add" element={<AddTask />} />
            <Route path="task/edit/:id" element={<EditTask />} />
            
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
