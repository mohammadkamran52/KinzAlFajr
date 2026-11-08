// Route table. Every page sits inside Layout (navbar and footer). Routes follow 02.
import { Route, Routes } from "react-router";
import Layout from "@/components/layout/Layout";
import ContactPage from "@/pages/Contact/ContactPage";
import HomePage from "@/pages/Home/HomePage";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";
import ServicesPage from "@/pages/Services/ServicesPage";
import TeamPage from "@/pages/Team/TeamPage";
import WhoWeArePage from "@/pages/WhoWeAre/WhoWeArePage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/who-we-are" element={<WhoWeArePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}