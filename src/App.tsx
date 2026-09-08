import { AppProvider, useApp } from "./context/AppContext";
import PublicSite from "./pages/PublicSite";
import AdminPanel from "./pages/AdminPanel";

function AppRouter() {
  const { currentView } = useApp();
  return currentView === "admin" ? <AdminPanel /> : <PublicSite />;
}

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
