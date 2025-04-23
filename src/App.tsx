import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoutes from "./pages/publicRoutes";
import ProtectedRoutes from "./pages/protextedRoutes";
import Layout from "./pages/layout";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/auth/signUp";
import EventsPage from "./pages/events";
import SettingsPage from "./pages/settings";
import ActivitiesPage from "./pages/activities";
import VenuesPage from "./pages/venues";
import Privacy from './components/privacy';
import Terms from './components/terms';
import Media from "./components/media/media";
import BannerPage from "./pages/Banner";
import AdPage from "./pages/ad";
import ReviewsPage from "./pages/reviews";
import PerformerPage from "./pages/performers";
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
            <Route path="performers" element={<PerformerPage />} /> 
            <Route path="events" element={<EventsPage />} />
            <Route path="venues" element={<VenuesPage />} />  
            <Route path="settings" element={<SettingsPage />} />  
            <Route path="activities" element={<ActivitiesPage />} /> 
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="media" element={<Media />} />
            <Route path="banner" element={<BannerPage />} />
            <Route path="/ad" element={<AdPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
