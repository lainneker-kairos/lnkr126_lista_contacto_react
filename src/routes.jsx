import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { ContactForm } from "./pages/ContactForm";
import { ContactCard } from "./components/ContactCard";
import { ContactList } from "./pages/ContactList";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/create" element={<ContactForm />} />
      {/* Ruta dinámica para poder editar el contacto usando el mismo componente */}
      <Route path="/edit/:id" element={<ContactForm />} /> 
      <Route path="/card" element={<ContactCard />} />
      <Route path="/list" element={<ContactList />} />
    </Route>
  )
);
