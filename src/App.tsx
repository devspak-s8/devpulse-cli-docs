import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import { DocsLayout } from "./layouts/DocsLayout";
import DocsHome from "./pages/docs/DocsHome";
import Installation from "./pages/docs/Installation";
import QuickStart from "./pages/docs/QuickStart";
import Commands from "./pages/docs/Commands";
import ApiReference from "./pages/docs/ApiReference";
import ErrorHandling from "./pages/docs/ErrorHandling";
import Configuration from "./pages/docs/Configuration";
import Examples from "./pages/docs/Examples";
import Index from "./pages/Index";
import Terminal from "./pages/Terminal";
import ServiceDetail from "./pages/ServiceDetail";
import Settings from "./pages/Settings";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnalyticsTracker />
        <Routes>
          <Route path="/" element={<Landing />} />

          {/* Documentation routes */}

          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<DocsHome />} />
            <Route path="installation" element={<Installation />} />
            <Route path="quick-start" element={<QuickStart />} />
            <Route path="commands" element={<Commands />} />
            <Route path="commands/:group" element={<Commands />} />
            <Route path="api-reference" element={<ApiReference />} />
            <Route path="api-reference/:section" element={<ApiReference />} />
            <Route path="error-handling" element={<ErrorHandling />} />
            <Route path="configuration" element={<Configuration />} />
            <Route path="examples" element={<Examples />} />
   
          </Route>
         <Route path="/terminal" element={<Terminal />} />
            <Route path="/service/:serviceId" element={<ServiceDetail />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/index" element={<Index />} />
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
