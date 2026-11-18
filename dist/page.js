(() => {
  const offer = window.BOOK_OFFER;
  if (!offer) return;
  const price = new Intl.NumberFormat("pt-BR", {style:"currency",currency:"BRL"}).format(offer.priceCents / 100);
  document.querySelectorAll("[data-price]").forEach(el => { el.textContent = price; });
  document.querySelectorAll("a.purchase").forEach(el => { el.href = offer.checkoutUrl; });
})();

