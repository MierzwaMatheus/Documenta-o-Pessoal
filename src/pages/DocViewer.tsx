import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMarkdownPath } from "../utils/pathResolver";
import { parseMarkdown, DocumentMetadata } from "../utils/markdownParser";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // Tema GitHub para destaque de código
import "../styles/highlight-theme.css"; // Tema customizado com suporte ao modo escuro
import TableOfContents from "../components/TableOfContents";
import InPageSearch from "../components/InPageSearch";

interface DocViewerProps {
  type: "public" | "internal";
}

const DocViewer: React.FC<DocViewerProps> = ({ type }) => {
  const { "*": docPath } = useParams();
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [title, setTitle] = useState<string>("Carregando...");
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<DocumentMetadata>({});

  console.log(
    "%c[DocViewer] Parâmetros recebidos:",
    "color: #E91E63; font-weight: bold",
    {
      docPath,
      decodedDocPath: docPath ? decodeURIComponent(docPath) : null,
    }
  );

  // Função para processar markdown com highlight
  const processMarkdown = (content: string): string => {
    console.log(
      "%c[DocViewer] Processando markdown...",
      "color: #FF9800; font-weight: bold"
    );

    // Configuração básica do marked
    const html = marked(content) as string;

    // Aplicar highlight.js após a conversão
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Corrigir caminhos das imagens
    const images = tempDiv.querySelectorAll("img");
    images.forEach((img) => {
      const src = img.getAttribute("src");
      console.log("%c[DocViewer] Imagem encontrada:", "color: #FF9800", {
        originalSrc: src,
      });

      if (src && !src.startsWith("http") && !src.startsWith("/")) {
        // Caminho relativo - precisa ser corrigido
        const basePath = `/docs/${type}/${docPath}`;
        const pathParts = basePath.split("/");
        pathParts.pop(); // Remove o nome do arquivo .md
        const imagePath = `${pathParts.join("/")}/${src}`;

        console.log(
          "%c[DocViewer] Corrigindo caminho da imagem:",
          "color: #FF9800",
          {
            from: src,
            to: imagePath,
            basePath,
            docPath,
          }
        );

        img.setAttribute("src", imagePath);
      }
    });

    // Aplicar highlight.js nos blocos de código
    const codeBlocks = tempDiv.querySelectorAll("pre code");
    codeBlocks.forEach((block) => {
      const element = block as HTMLElement;
      hljs.highlightElement(element);
    });

    return tempDiv.innerHTML;
  };

  useEffect(() => {
    if (!docPath) return;

    // Constrói o caminho para o arquivo .md na pasta /public/docs/
    const fullPath = getMarkdownPath(`/docs/${type}/${docPath}`);
    setError(null); // Limpa erros anteriores
    setTitle("Carregando...");

    fetch(fullPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Não foi possível carregar o documento: ${response.statusText}`
          );
        }
        return response.text();
      })
      .then((mdContent) => {
        const { content, data } = parseMarkdown(mdContent);
        setTitle(data.title || "Documento sem título");
        setMetadata(data);
        setHtmlContent(processMarkdown(content));
      })
      .catch((err) => {
        console.error("Erro ao carregar Markdown:", err);
        setError(
          `Erro ao carregar o documento: ${err.message}. Verifique se o caminho '${fullPath}' está correto.`
        );
        setTitle("Erro");
        setHtmlContent("");
      });
  }, [docPath, type]);

  if (error) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 transition-colors">
          <h1 className="text-2xl font-bold text-destructive mb-4 transition-colors">{title}</h1>
          <p className="text-destructive mb-4 transition-colors">{error}</p>
          <div className="space-x-4">
            <a
              href="/"
              className="text-primary hover:text-primary/80 underline transition-colors"
            >
              ← Voltar para a página inicial
            </a>
            <a
              href="/public/1_Publicas/bem-vindo"
              className="text-primary hover:text-primary/80 underline transition-colors"
            >
              Ir para a documentação pública
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 md:p-8 max-w-full sm:max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col xl:flex-row gap-4 md:gap-8 w-full">
        {/* Conteúdo principal */}
        <div className="flex-1 min-w-0 order-2 xl:order-1">
          <article className="bg-card rounded-lg border border-border p-3 sm:p-4 md:p-8 max-w-full sm:max-w-4xl mx-auto transition-colors overflow-hidden">
            {/* Cabeçalho do documento */}
            <header className="mb-8 pb-6 border-b border-border transition-colors">
              <h1 className="text-4xl font-bold text-foreground mb-2 transition-colors">
                {title}
              </h1>

              {/* Metadados do frontmatter */}
              {(metadata.description || metadata.tags) && (
                <div className="mt-4 space-y-2">
                  {metadata.description && (
                    <p className="text-lg text-muted-foreground transition-colors">
                      {metadata.description}
                    </p>
                  )}

                  {metadata.tags && Array.isArray(metadata.tags) && (
                    <div className="flex flex-wrap gap-2">
                      {metadata.tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary text-primary-foreground text-sm rounded-md transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Breadcrumb */}
              <div className="mt-4 text-sm text-muted-foreground transition-colors">
                <span>
                  📍 /{type}/{docPath || "(raiz)"}
                </span>
              </div>
            </header>

            {/* Conteúdo do documento */}
            <div
              className="markdown-body prose prose-slate max-w-none
                         prose-headings:text-foreground
                         prose-p:text-muted-foreground
                         prose-strong:text-foreground
                         prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                         prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:overflow-x-auto
                         prose-blockquote:text-muted-foreground prose-blockquote:border-l-primary
                         prose-a:text-primary hover:prose-a:text-primary/80
                         prose-table:text-muted-foreground prose-table:overflow-x-auto
                         prose-th:text-foreground prose-td:text-muted-foreground
                         prose-img:max-w-full prose-img:h-auto
                         break-words transition-colors overflow-hidden"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </article>
        </div>

        {/* Tabela de conteúdos na lateral direita */}
        <div className="w-full xl:w-80 flex-shrink-0 order-1 xl:order-2">
          <TableOfContents htmlContent={htmlContent} />
        </div>
      </div>

      {/* Componente de busca na página */}
      <InPageSearch htmlContent={htmlContent} />
    </div>
  );
};

export default DocViewer;
