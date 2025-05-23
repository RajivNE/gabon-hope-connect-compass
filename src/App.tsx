
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import Alerts from "./pages/Alerts";
import Donate from "./pages/Donate";
import OrphanageDetail from "./pages/OrphanageDetail";
import NotFound from "./pages/NotFound";
import DonorSpace from "./pages/DonorSpace";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/orphanage/:id" element={<OrphanageDetail />} />
          <Route path="/donor" element={<DonorSpace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
