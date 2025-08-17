// src/pages/DocLayout.tsx
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import DocViewer from "./DocViewer";
import docsMapJson from "@/docsMap.json";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";

interface DocLayoutProps {
  type: "public" | "internal";
}

const DocLayout: React.FC<DocLayoutProps> = ({ type }) => {
  console.log(
    `%c[DocLayout] Renderizando layout para: ${type}`,
    "color: #4CAF50; font-weight: bold"
  );
  
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const docsMap =
    type === "internal" ? docsMapJson.internal : docsMapJson.public;

  // Encontra a primeira página para redirecionamento
  const findFirstPage = (items: any[]): string | null => {
    for (const item of items) {
      if (item.pages && item.pages.length > 0) {
        const firstSubPage = findFirstPage(item.pages);
        if (firstSubPage) return firstSubPage;
      } else if (item.path) {
        return item.path;
      }
    }
    return null;
  };

  const firstPagePath = findFirstPage(docsMap);
  
  const toggleSidebar = () => {
    console.log("%c[DocLayout] Alternando sidebar", "color: #FF9800; font-weight: bold");
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <SidebarProvider>
      <div className="flex flex-1 relative w-full">
        {isMobile ? (
          <>
            <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
                 onClick={() => setSidebarOpen(false)} />
            <div 
              className={`fixed top-[75px] left-0 bottom-0 z-50 w-[280px] transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <Sidebar docs={docsMap} type={type} />
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="fixed top-[85px] left-4 z-50 bg-background shadow-md rounded-full" 
              onClick={toggleSidebar}>
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </>
        ) : (
          <Sidebar docs={docsMap} type={type} />
        )}
        <main className={`content-area flex-grow bg-background transition-colors ${isMobile ? 'w-full' : ''}`}>
          <Routes>
            <Route path="/*" element={<DocViewer type={type} />} />
            {firstPagePath && (
              <Route index element={<Navigate to={firstPagePath} replace />} />
            )}
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DocLayout;
