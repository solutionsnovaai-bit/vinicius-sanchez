# Vinicius Sanchez — Consórcio Porto Bank

Site estático (HTML + CSS + JS puro). Sem build, sem dependência.

## Estrutura

```
index.html
css/style.css
js/script.js
assets/
  ├── vinicius-hero.jpg          ← foto do hero
  ├── porto-simbolo-box.svg      ← símbolo Porto em caixa (nav)
  ├── porto-lockup.svg           ← lockup "Porto Bank" (Bank escuro) p/ fundo claro
  ├── porto-lockup-claro.svg     ← lockup "Porto Bank" (Bank branco) p/ fundo escuro
  ├── vela-branca.svg / -p1..p3  ← vela + as 3 faixas separadas (loader e Modalidades)
  ├── vela-azul.svg / -p1..p3    ← versão azul Porto
  └── vela-navy.svg / -p1..p3    ← versão marinho (p/ fundo claro)

Todos os arquivos da marca são **SVG vetorial** — nítidos em qualquer tamanho,
inclusive em telas retina e impressos.
```

## Deploy

1. `git init` → `git add .` → `git commit -m "first"`
2. Push pro GitHub
3. Vercel → Import repo → Framework: **Other** → Deploy

## Antes de publicar — conferir

| O quê | Onde |
|---|---|
| WhatsApp | `js/script.js`, linha `var WPP = '5511994948484';` — muda em um lugar só, o script reescreve todos os links |
| Instagram | `@consorciocomvinicius` no `index.html` |
| Área de atendimento | rodapé, bloco "Atendimento" |
| Textos da seção Atendimento | `index.html`, `#atendimento` — os 4 cards e a frase de destaque |

## Cores da marca

Extraídas direto do logo Porto Bank:

- Azul Porto: `#2D5AC9`
- Azul luminoso (hover/glow): `#5B87FF`
- Marinho Porto: `#0A0148`
- Base escura do site: `#07032E`
- Off-white: `#F1F2F7`

O marquee e o CTA final usam `#0A0148` puro para a vela fundir no fundo.

## Detalhe da marca

O símbolo da Porto tem exatamente 3 faixas. Elas foram separadas em arquivos
individuais e usadas como navegação: cada faixa é uma modalidade de consórcio.
No loader, a vela se monta faixa por faixa.

---
Nova AI Solutions
