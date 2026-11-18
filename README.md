# As Profecias de 2027

Página de venda do livro digital **As Profecias de 2027**, preparada para computador e celular, com textos simples, capa original e compra pela Cakto.

## Publicar na Vercel

1. Importe este repositório na Vercel.
2. Selecione **Other** em Framework Preset.
3. O arquivo `vercel.json` já configura:
   - Build Command: `node build.mjs`
   - Output Directory: `dist`
4. Publique e confira o endereço gerado.
5. Mantenha o acesso da página pública sem proteção por conta ou senha, se for divulgar a página para clientes.

A página não possui login próprio nem depende do ChatGPT.

## Alterar a oferta

Edite `offer.json` e publique novamente:

- `priceCents: 3990` corresponde a **R$ 39,90**.
- `pages` indica a quantidade de páginas.
- `checkoutUrl` indica o endereço de compra.

A etapa `node build.mjs` atualiza o preço, as páginas, os botões e as informações de compartilhamento. Não edite `dist/offer.js` separadamente.

## Conferir no computador

Com Node.js 22 ou mais recente:

```sh
node build.mjs
```

Depois abra `dist/index.html` no navegador.

## Compartilhamento

Durante a publicação, o preparo usa o endereço disponibilizado pela Vercel. Se necessário, configure `PUBLIC_SITE_URL` com o endereço público completo.

## Antes de divulgar

O valor anunciado na página é **R$ 39,90**. Na última conferência, o Pix na Cakto apresentava R$ 38,99 + R$ 0,99 de taxa, total de R$ 39,98. Alinhe o valor no pagamento antes de anunciar a oferta.

Confirme também recebimento, acesso, suporte e políticas aplicáveis ao livro. As 30 páginas foram mantidas conforme a capa; o conteúdo interno do e-book não faz parte deste repositório.

## Identidade editorial

Publicação independente. As imagens da capa são representações artísticas.

