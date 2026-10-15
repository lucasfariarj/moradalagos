# Morada Lagos

Landing page de aluguel de imóveis na Região dos Lagos (RJ). Projeto de portfólio: os dados vêm de um JSON local e não há backend.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Jest + Testing Library · Google Maps (`@vis.gl/react-google-maps`)

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # testes com Jest
npm run build    # build de produção
```

## Google Maps

O mapa usa o Google Maps quando há uma chave configurada. Sem chave, a seção mostra um mapa ilustrado com os mesmos marcadores de preço, então o projeto roda sem nenhuma configuração.

```bash
cp .env.example .env.local
# preencha NEXT_PUBLIC_GOOGLE_MAPS_API_KEY (Maps JavaScript API habilitada)
```

`NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID` é opcional (padrão `DEMO_MAP_ID`). Os marcadores HTML (`AdvancedMarker`) exigem um Map ID.

## Estrutura

```
src/
  app/                 layout, página e tema (globals.css, com a paleta em @theme)
  app/imoveis/[slug]/  página de detalhe do imóvel
  components/          seções da página (Header, Hero, SearchBar, FeaturedProperties, MapSection, About, Footer)
    property/          galeria, ações (favoritar/compartilhar) e card de visita
    map/               GooglePropertyMap, IllustratedMap e marcadores de preço
  context/             favoritos (estado em memória)
  data/properties.json imóveis
  lib/properties.ts    leitura, filtros e formatação
  __tests__/           testes
```

## O que funciona

- A busca do hero (cidade/bairro, tipo, quartos), as buscas populares e as abas de tipo filtram a lista de imóveis.
- Cada imóvel tem sua página em `/imoveis/[slug]` (gerada estaticamente): galeria com visualização ampliada, comodidades, valores (aluguel, condomínio, IPTU), formulário de visita, mapa e imóveis semelhantes.
- Os favoritos atualizam o contador no header.
- Os marcadores do mapa abrem um resumo do imóvel. O mapa ilustrado tem zoom.
- O menu mobile e o formulário de newsletter funcionam (o formulário só mostra uma confirmação, sem envio).

As imagens são do [Unsplash](https://unsplash.com).
