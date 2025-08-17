import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "./ThemeToggle";

const Header: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const isHomePage = location.pathname === "/";
  const isPublicRoute = location.pathname.startsWith("/public");

  const handleLogout = async () => {
    console.log("%c[Header] Iniciando processo de logout", "color: #FF9800");
    try {
      await logout();
      console.log(
        "%c[Header] Logout realizado com sucesso",
        "color: #4CAF50; font-weight: bold"
      );
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
    } catch (error) {
      console.error(
        "%c[Header] Erro no logout:",
        "color: #F44336; font-weight: bold",
        error
      );
      toast({
        title: "Erro",
        description: "Erro ao fazer logout. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-primary border-b border-border px-6 py-4 sticky top-0 z-10 h-[75px] transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 bg-primary/30 rounded-lg flex items-center justify-center transition-colors backdrop-blur-sm">
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-primary-foreground transition-colors drop-shadow-sm">
            InBot Docs
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Botão de alternância de tema sempre visível */}
          <ThemeToggle />

          {!isHomePage && !isPublicRoute && user && (
            <>
              <div className="text-sm text-primary-foreground/90 transition-colors drop-shadow-sm">
                Olá, <span className="font-medium">{user?.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-primary-foreground/30 shadow-sm text-sm leading-4 font-medium rounded-md text-primary-foreground bg-primary/20 hover:bg-primary/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-foreground/50 transition-colors backdrop-blur-sm"
              >
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sair
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
