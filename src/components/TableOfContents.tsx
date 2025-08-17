import React, { useState, useEffect } from "react";
import { useIsMobile } from '@/hooks/use-mobile'

interface TocItem {
	id: string
	text: string
	level: number
}

interface TableOfContentsProps {
	htmlContent: string
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ htmlContent }) => {
	const [tocItems, setTocItems] = useState<TocItem[]>([])
	const [activeId, setActiveId] = useState<string>('')
	const [isExpanded, setIsExpanded] = useState(false)
	const isMobile = useIsMobile()

	console.log(
		'%c[TableOfContents] Iniciando componente TOC',
		'color: #2196F3; font-weight: bold'
	)

	// Extrair títulos do HTML e adicionar IDs aos headings no DOM
	useEffect(() => {
		console.log(
			'%c[TableOfContents] Extraindo títulos do HTML',
			'color: #4CAF50; font-weight: bold'
		)

		if (!htmlContent) {
			console.log(
				'%c[TableOfContents] HTML content vazio',
				'color: #FF9800; font-weight: bold'
			)
			setTocItems([])
			return
		}

		// Aguardar um pouco para garantir que o DOM foi atualizado
		const timer = setTimeout(() => {
			const headings = document.querySelectorAll(
				'.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6'
			)
			console.log(
				'%c[TableOfContents] Títulos encontrados no DOM:',
				'color: #9C27B0; font-weight: bold',
				headings.length
			)

			const items: TocItem[] = []

			headings.forEach((heading, index) => {
				const level = parseInt(heading.tagName.charAt(1))
				const text = heading.textContent || ''

				// Se o heading não tem ID, vamos criar um
				if (!heading.id) {
					const slugId = text
						.toLowerCase()
						.replace(/[^a-z0-9\s-]/g, '')
						.replace(/\s+/g, '-')
						.replace(/-+/g, '-')
						.trim()
					heading.id = slugId || `heading-${index}`
				}

				items.push({
					id: heading.id,
					text,
					level,
				})

				console.log(
					'%c[TableOfContents] Título processado:',
					'color: #607D8B; font-weight: bold',
					{
						level,
						text,
						id: heading.id,
					}
				)
			})

			setTocItems(items)
		}, 100)

		return () => clearTimeout(timer)
	}, [htmlContent])

	// Observar scroll para destacar item ativo
	useEffect(() => {
		console.log(
			'%c[TableOfContents] Configurando observer de scroll',
			'color: #3F51B5; font-weight: bold'
		)

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id)
						console.log(
							'%c[TableOfContents] Item ativo:',
							'color: #009688; font-weight: bold',
							entry.target.id
						)
					}
				})
			},
			{
				rootMargin: '-20% 0% -35% 0%',
				threshold: 0,
			}
		)

		// Observar todos os headings
		tocItems.forEach((item) => {
			const element = document.getElementById(item.id)
			if (element) {
				observer.observe(element)
			}
		})

		return () => {
			observer.disconnect()
			console.log(
				'%c[TableOfContents] Observer desconectado',
				'color: #F44336; font-weight: bold'
			)
		}
	}, [tocItems])

	// Função para scroll suave com offset
	const scrollToWithOffset = (id: string, offset = 100) => {
		console.log(
			'%c[TableOfContents] Navegando para:',
			'color: #FF5722; font-weight: bold',
			{ id, offset }
		)

		const element = document.getElementById(id)
		if (element) {
			const elementPosition = element.getBoundingClientRect().top
			const offsetPosition = elementPosition + window.pageYOffset - offset

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			})

			// Atualiza o hash na URL para refletir a navegação
			// history.pushState(null, '', `#${id}`);
			setActiveId(id)
		}
	}

	// Função de clique para o heading
	const handleHeadingClick = (id: string) => {
		scrollToWithOffset(id) // Use a nova função com offset
	}

	if (tocItems.length === 0) {
		console.log(
			'%c[TableOfContents] Nenhum título encontrado',
			'color: #FF9800; font-weight: bold'
		)
		return null
	}

	// Função para alternar a visibilidade do índice em dispositivos móveis
	const toggleExpanded = () => {
		console.log(
			'%c[TableOfContents] Alternando visibilidade do índice',
			'color: #FF9800; font-weight: bold',
			{ isExpanded: !isExpanded }
		)
		setIsExpanded(!isExpanded)
	}

	return (
		<div className="bg-card border border-border rounded-lg p-2 sm:p-3 md:p-4 transition-colors xl:sticky xl:top-[92px] xl:max-h-[80vh] xl:overflow-y-auto w-full overflow-hidden">
			<h3
				className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 border-b border-border pb-2 transition-colors flex items-center justify-between cursor-pointer"
				onClick={isMobile ? toggleExpanded : undefined}
			>
				<span>📋 Índice</span>
				{isMobile && (
					<button
						className="text-muted-foreground hover:text-foreground transition-colors"
						aria-label={isExpanded ? 'Esconder índice' : 'Mostrar índice'}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className={`transition-transform duration-300 ${
								isExpanded ? 'rotate-180' : ''
							}`}
						>
							<polyline points="6 9 12 15 18 9"></polyline>
						</svg>
					</button>
				)}
			</h3>

			<nav
				className={`space-y-1 ${isMobile && !isExpanded ? 'hidden' : 'block'}`}
			>
				{tocItems.map((item) => {
					const isActive = activeId === item.id
					const paddingLeft = `${(item.level - 1) * 0.75}rem`

					return (
						<button
							key={item.id}
							onClick={() => handleHeadingClick(item.id)}
							className={`
                w-full text-left text-xs sm:text-sm py-1 sm:py-1.5 px-1 sm:px-2 rounded transition-colors duration-200
                hover:bg-primary/10 hover:text-primary
                ${
									isActive
										? 'bg-accent/20 text-accent font-medium border-l-2 border-accent'
										: 'text-muted-foreground hover:text-accent'
								}
              `}
							style={{ paddingLeft }}
							title={item.text}
						>
							<span className="block truncate">{item.text}</span>
						</button>
					)
				})}
			</nav>

			{tocItems.length > 0 && (
				<div className="mt-4 pt-3 border-t border-border text-xs text-muted-foreground transition-colors">
					{tocItems.length} {tocItems.length === 1 ? 'seção' : 'seções'}
				</div>
			)}
		</div>
	)
}

export default TableOfContents
