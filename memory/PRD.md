# PRD — NEONSOM (Landing de cursos de música)

## Problema original (user)
Músico quer site de apresentação + venda de cursos (baixo, guitarra, violão, teclado, bateria).
Estética: preto com verde limão OU aqua, moderno/futurista, elementos flutuantes.
Pediu: seletor de cor no topo (lime/aqua), toggle de idioma PT/EN, planos chamativos com preço de
lançamento (base 97 + desconto), apresentação "quem sou" (texto exemplo, troca foto depois),
botão "Apoie o músico" (cafezinho), botão de contato, botão voltar ao topo, ferramentas de estudo.
Pagamento Stripe depois — por ora simulado.

## Arquitetura
- Frontend: React (CRA + craco), TailwindCSS, framer-motion, shadcn/ui, sonner, lucide-react.
- Estado global: SiteContext (tema lime/aqua + idioma pt/en) via CSS vars + localStorage.
- i18n: /src/i18n.js (pt, en completos).
- Sem backend além do template (página estática). MongoDB não usado ainda.
- Fix de ambiente: craco.config.js normaliza devServer p/ webpack-dev-server v5 (remove
  onAfterSetupMiddleware/onBeforeSetupMiddleware, converte `https`→`server`).

## Implementado (2026-06)
- Header sticky glass: logo, nav, theme-toggle, lang-toggle (PT/EN), botão Apoie, menu mobile.
- Hero: headline Unbounded, stats, imagem em card glass com borda neon + mini cards flutuantes.
- Courses: 5 cursos (baixo/guitarra/violão/teclado/bateria) com imagens, hover glow.
- Pricing: 3 planos (Individual R$67, Passe Completo R$197 popular, Mentoria VIP R$397) com
  preço antigo riscado, % OFF, garantia; botão compra = toast simulado.
- StudyTools FUNCIONAIS: Metrônomo (Web Audio, BPM 40-220, slider, beats) e Afinador de
  referência (6 notas, tons senoidais).
- Testimonials: marquee CSS infinito.
- About ("Quem sou"): texto placeholder PT/EN + foto (trocar depois).
- Contact: form (toast de sucesso, não persiste) + redes sociais (links placeholder #).
- Footer com brand gigante; FloatingButtons: Apoie (sempre) + Voltar ao topo (no scroll).
- FloatingBackground: grid + blobs/dots flutuantes.

## Backlog / Próximos passos
- P0: Integrar Stripe real nos botões de compra (checkout) — usuário pediu p/ 2º momento.
- P1: Trocar foto do músico e bio real; ligar redes sociais/WhatsApp reais; backend p/ form de contato (email/Resend).
- P2: Página de checkout/obrigado, área de aluno/login, mais cursos/módulos, blog.

## Observações
- Pagamento e form de contato são SIMULADOS (sem persistência/integração real ainda).
