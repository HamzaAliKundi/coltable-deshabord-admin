import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoutes from "./pages/publicRoutes";
import ProtectedRoutes from "./pages/protextedRoutes";
import Layout from "./pages/layout";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/auth/signUp";
import UsersPage from "./pages/users";
import EventsPage from "./pages/events";
import SettingsPage from "./pages/settings";
import ActivitiesPage from "./pages/activities";
import VenuesPage from "./pages/venues";

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
            <Route path="users" element={<UsersPage />} /> 
            <Route path="events" element={<EventsPage />} />
            <Route path="venues" element={<VenuesPage />} />  
            <Route path="settings" element={<SettingsPage />} />  
            <Route path="activities" element={<ActivitiesPage />} /> 
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
