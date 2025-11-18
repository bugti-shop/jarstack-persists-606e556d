import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { WelcomeProvider, useWelcome } from "@/contexts/WelcomeContext";
import { BottomNav } from "@/components/BottomNav";
import OnboardingFlow from "@/components/OnboardingFlow";
import Index from "./pages/Index";
import Reports from "./pages/Reports";
import Pro from "./pages/Pro";
import Settings from "./pages/Settings";
import Folders from "./pages/Folders";
import FolderDetail from "./pages/FolderDetail";
import Tools from "./pages/Tools";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { hasSeenWelcome, completeWelcome } = useWelcome();

  if (!hasSeenWelcome) {
    return <OnboardingFlow onComplete={completeWelcome} />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/pro" element={<Pro />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/folders" element={<Folders />} />
        <Route path="/folder/:folderId" element={<FolderDetail />} />
        <Route path="/tools" element={<Tools />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BottomNav />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SubscriptionProvider>
      <WelcomeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </WelcomeProvider>
    </SubscriptionProvider>
  </QueryClientProvider>
);

export default App;
