import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
const root=resolve(import.meta.dirname);
const offer=JSON.parse(readFileSync(resolve(root,"offer.json"),"utf8"));
if (!Number.isInteger(offer.priceCents) || offer.priceCents <= 0) throw new Error("Informe um valor válido em centavos.");
if (!Number.isInteger(offer.pages) || offer.pages <= 0) throw new Error("Informe uma quantidade válida de páginas.");
const checkout=new URL(offer.checkoutUrl);
if(checkout.protocol !== "https:") throw new Error("O endereço de pagamento deve começar com https.");
const price=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(offer.priceCents/100);
const escape=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const htmlPath=resolve(root,"dist/index.html");
let html=readFileSync(htmlPath,"utf8");
html=html.replace(/R\$\s?\d+(?:\.\d{3})*,\d{2}/g,price);
html=html.replace(/\d+ páginas/g,offer.pages+" páginas");
html=html.replace(/(<a\b[^>]*\bclass="[^"]*\bpurchase\b[^"]*"[^>]*\bhref=")[^"]*(")/g,(_,a,b)=>a+escape(offer.checkoutUrl)+b);
html=html.replace(/\n?<link rel="canonical"[^>]*>/g,"").replace(/\n?<meta property="og:(?:url|locale|image:width|image:height|image:alt)"[^>]*>/g,"");
const host=process.env.PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
let sharing='<meta property="og:locale" content="pt_BR">\n<meta property="og:image:width" content="800">\n<meta property="og:image:height" content="1200">\n<meta property="og:image:alt" content="Capa do livro digital As Profecias de 2027.">';
if(host){
 const url=new URL(/^https?:\/\//.test(host)?host:"https://"+host);
 if(!["http:","https:"].includes(url.protocol)) throw new Error("Endereço do site inválido.");
 const origin=url.origin;
 html=html.replace(/<meta property="og:image"[^>]*>/,'<meta property="og:image" content="'+escape(origin+'/images/capa-profecias-2027.webp')+'">');
 sharing+='\n<meta property="og:url" content="'+escape(origin+'/')+'">\n<link rel="canonical" href="'+escape(origin+'/')+'">';
}else{
 html=html.replace(/<meta property="og:image"[^>]*>/,'<meta property="og:image" content="images/capa-profecias-2027.webp">');
}
html=html.replace("</head>",sharing+"\n</head>");
writeFileSync(htmlPath,html);
writeFileSync(resolve(root,"dist/offer.js"),"window.BOOK_OFFER = Object.freeze("+JSON.stringify(offer,null,2)+");\n");
for(const file of ["styles.css","page.js","offer.js","images/capa-profecias-2027.webp","images/retrato-profecias-2027.webp"]){
 if(!existsSync(resolve(root,"dist",file))) throw new Error("Arquivo ausente: "+file);
}
console.log("Página preparada. Valor: "+price+". "+offer.pages+" páginas. Sem login.");

