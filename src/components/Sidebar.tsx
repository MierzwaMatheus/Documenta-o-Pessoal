// src/components/Sidebar.tsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, FileText, ChevronRight } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import SearchPopup from "./SearchPopup";

interface Page {
  title: string;
  path: string;
  order?: number;
  description?: string;
  tags?: string[];
}

interface Section {
  section: string;
  path?: string;
  pages: (Page | Section)[]; // Pode conter sub-seções
}

interface SidebarProps {
  docs: (Page | Section)[];
  type: "public" | "internal";
}

// Componente para renderizar uma página
const RenderPage: React.FC<{
  page: Page;
  isItemActive: (path: string) => boolean;
}> = ({ page, isItemActive }) => {
  const isActive = isItemActive(page.path);
  return (
    <li>
      <Link
        to={page.path}
        className={`group flex items-center gap-2 p-2 rounded-md transition-all duration-200 ${
          isActive
            ? "bg-accent/20 text-accent font-semibold border-l-2 border-accent"
            : "text-muted-foreground hover:bg-muted hover:text-accent hover:translate-x-1"
        }`}
      >
        <FileText size={14} className="flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="truncate text-sm">{page.title}</div>
        </div>
        <ChevronRight
          size={12}
          className={`flex-shrink-0 transition-transform ${
            isActive ? "rotate-90" : "group-hover:translate-x-1"
          }`}
        />
      </Link>
    </li>
  );
};

// Componente para renderizar uma seção (e suas sub-páginas/seções)
const RenderSection: React.FC<{
  section: Section;
  isItemActive: (path: string) => boolean;
}> = ({ section, isItemActive }) => (
  <div className="mb-4">
    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2 transition-colors">
      {section.section}
    </h3>
    <ul className="space-y-1">
      {section.pages.map((item) =>
        "section" in item ? (
          <RenderSection
            key={item.section}
            section={item as Section}
            isItemActive={isItemActive}
          />
        ) : (
          <RenderPage
            key={item.path}
            page={item as Page}
            isItemActive={isItemActive}
          />
        )
      )}
    </ul>
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ docs, type }) => {
  const location = useLocation();
  const { searchTerm, setSearchTerm, searchResults, isLoading, isIndexing } =
    useSearch(type);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fechar popup ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsSearchVisible(value.trim().length > 0);
  };

  const handleSearchFocus = () => {
    if (searchTerm.trim().length > 0) {
      setIsSearchVisible(true);
    }
  };

  const handleCloseSearch = () => {
    setIsSearchVisible(false);
  };

  console.log(
    "%c[Sidebar] Localização atual:",
    "color: #2196F3; font-weight: bold",
    {
      pathname: location.pathname,
      decoded: decodeURIComponent(location.pathname),
    }
  );

  // Função para normalizar paths para comparação
  const normalizePath = (path: string): string => {
    console.log("%c[Sidebar] Normalizando path:", "color: #4CAF50", {
      original: path,
      decoded: decodeURIComponent(path),
    });
    return decodeURIComponent(path);
  };

  // Função para verificar se um item está ativo
  const isItemActive = (itemPath: string): boolean => {
    const normalizedLocation = normalizePath(location.pathname);
    const normalizedItemPath = normalizePath(itemPath);
    const isActive = normalizedLocation === normalizedItemPath;

    console.log("%c[Sidebar] Verificando item ativo:", "color: #FF9800", {
      itemPath,
      normalizedLocation,
      normalizedItemPath,
      isActive,
    });

    return isActive;
  };

  return (
    <nav className="sidebar bg-muted p-4 border-r border-border h-[calc(100vh-75px)] sticky top-[75px] flex flex-col justify-between transition-colors">
      {/* Header da Sidebar */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-2 transition-colors">
          Documentação {type === "internal" ? "Interna" : "Pública"}
        </h2>
        <p className="text-sm text-muted-foreground transition-colors">
          Navegue pelas seções
        </p>
      </div>

      {/* Campo de busca */}
      <div className="mb-6 relative" ref={searchRef}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {isIndexing ? (
              <svg
                className="animate-spin h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </div>
          <input
            type="text"
            placeholder={
              isIndexing
                ? "Indexando documentos..."
                : "Buscar na documentação..."
            }
            disabled={isIndexing}
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            className="block w-full pl-10 pr-3 py-2 border border-input rounded-md leading-5 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:placeholder-muted-foreground focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm disabled:bg-muted disabled:cursor-not-allowed transition-colors"
          />
          <SearchPopup
            searchResults={searchResults}
            isLoading={isLoading}
            isVisible={isSearchVisible}
            onClose={handleCloseSearch}
            searchTerm={searchTerm}
          />
          {searchTerm && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setIsSearchVisible(false);
                }}
                className="text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {isSearchVisible && (
          <SearchPopup
            searchTerm={searchTerm}
            searchResults={searchResults}
            isLoading={isLoading}
            onClose={handleCloseSearch}
            docType={type}
          />
        )}
      </div>

      {/* Link para Home */}
      <div className="mb-6">
        <Link
          to="/"
          className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
            location.pathname === "/"
              ? "bg-primary/20 text-primary font-semibold"
              : "text-muted-foreground hover:bg-muted hover:text-primary"
          }`}
        >
          <Home size={16} />
          <span>Início</span>
        </Link>
      </div>

      {/* Seções da Documentação */}
      <div className="space-y-4 h-full overflow-y-scroll scrollbar-hide">
        {docs.map((item) =>
          "section" in item ? (
            <RenderSection
              key={item.section}
              section={item as Section}
              isItemActive={isItemActive}
            />
          ) : (
            <RenderPage
              key={item.path}
              page={item as Page}
              isItemActive={isItemActive}
            />
          )
        )}
      </div>

      {/* Footer da Sidebar */}
      <div className="mt-auto pt-4 border-t border-border transition-colors">
        <div className="text-xs text-muted-foreground text-center transition-colors">
          <div className="font-medium">InBot Docs</div>
          <div>v1.0.0</div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
