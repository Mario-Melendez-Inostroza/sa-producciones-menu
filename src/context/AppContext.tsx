import { createContext, useContext, useState, ReactNode } from "react";

export type AvisoType = "normal" | "importante" | "cerrado";

export interface Aviso {
  type: AvisoType;
  title: string;
  message: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  category: "principal" | "extra" | "ninos";
}

export interface MenuHistory {
  date: string;
  label: string;
  items: MenuItem[];
}

const initialMenuItems: MenuItem[] = [
  { id: "1", name: "Cazuela de Ave", description: "Sin agregados", price: 5500, available: true, category: "principal" },
  { id: "2", name: "Pollo al Horno", description: "Con 1 agregado a elección", price: 6000, available: true, category: "principal" },
  { id: "3", name: "Estofado de Cerdo", description: "Con 1 agregado a elección", price: 6000, available: true, category: "principal" },
  { id: "4", name: "Estofado de Ave", description: "Con 1 agregado a elección", price: 6000, available: true, category: "principal" },
  { id: "5", name: "Pescado Frito", description: "Con 1 agregado a elección", price: 6000, available: true, category: "principal" },
  { id: "6", name: "Cazuela de Vacuno", description: "Sin agregados", price: 6500, available: true, category: "extra" },
  { id: "7", name: "Estofado de Vacuno", description: "+ 2 agregados a elección", price: 6500, available: true, category: "extra" },
  { id: "8", name: "Pollo a lo Pobre", description: "Con arroz y papas fritas", price: 6500, available: true, category: "extra" },
  { id: "9", name: "Pescado Frito a lo Pobre", description: "Con arroz + papas fritas", price: 6500, available: true, category: "extra" },
  { id: "10", name: "Pulpa Deshuesada al Horno", description: "+ 2 agregados a elección", price: 6500, available: true, category: "extra" },
  { id: "11", name: "Pulpa a lo Pobre", description: "Con arroz y papas fritas", price: 6500, available: true, category: "extra" },
  { id: "12", name: "Carne al Horno", description: "+ 2 agregados a elección", price: 7000, available: true, category: "extra" },
  { id: "13", name: "Carne al Horno a lo Pobre", description: "Con arroz y papas fritas", price: 7500, available: true, category: "extra" },
  { id: "14", name: "Menú Niños", description: "3 fingers de ave + arroz + papas fritas + bebida + consomé", price: 4000, available: true, category: "ninos" },
];

export const menuHistory: MenuHistory[] = [
  { date: "2026-09-08", label: "Martes 8 septiembre", items: initialMenuItems },
  { date: "2026-09-07", label: "Lunes 7 septiembre", items: initialMenuItems.map(i => i.id === "5" ? { ...i, available: false } : i) },
  { date: "2026-09-04", label: "Viernes 4 septiembre", items: initialMenuItems.map(i => i.id === "13" ? { ...i, available: false } : i) },
];

interface AppContextType {
  aviso: Aviso;
  setAviso: (a: Aviso) => void;
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
  currentView: "public" | "admin";
  setCurrentView: (v: "public" | "admin") => void;
  adminSection: "dashboard" | "menu" | "aviso" | "historial";
  setAdminSection: (s: "dashboard" | "menu" | "aviso" | "historial") => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [aviso, setAviso] = useState<Aviso>({
    type: "normal",
    title: "Atención normal",
    message: "Hoy martes 8 de septiembre atendemos con normalidad. ¡Los esperamos!",
  });
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [currentView, setCurrentView] = useState<"public" | "admin">("public");
  const [adminSection, setAdminSection] = useState<"dashboard" | "menu" | "aviso" | "historial">("dashboard");

  return (
    <AppContext.Provider value={{ aviso, setAviso, menuItems, setMenuItems, currentView, setCurrentView, adminSection, setAdminSection }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
