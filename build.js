/* =========================================================
   BUILD DE PRODUCAO - Minha ONG
   Junta os arquivos, minifica e gera a pasta dist/,
   que e a versao publicada no GitHub Pages.

   Como usar:
     npm install
     npm run build
   ========================================================= */

const fs = require("fs");
const path = require("path");
const { minify: minificarJS } = require("terser");
const csso = require("csso");
const { minify: minificarHTML } = require("html-minifier-terser");

const RAIZ = __dirname;
const SAIDA = path.join(RAIZ, "docs");   // o GitHub Pages publica esta pasta

/* ---------- a ordem importa: e a mesma do index.html ---------- */
const ARQUIVOS_JS = [
  "js/modules/datas.js",
  "js/modules/dados.js",
  "js/modules/templates.js",
  "js/modules/storage.js",
  "js/modules/validacao.js",
  "js/modules/router.js",
  "js/main.js"
];

const ARQUIVOS_CSS = [
  "css/reset.css",
  "css/style.css"
];

/* ---------- funcoes de apoio ---------- */

function ler(relativo) {
  return fs.readFileSync(path.join(RAIZ, relativo), "utf8");
}

function juntar(lista) {
  return lista.map(ler).join("\n");
}

function tamanho(texto) {
  return Buffer.byteLength(texto, "utf8");
}

function kb(bytes) {
  return (bytes / 1024).toFixed(2) + " KB";
}

function reducao(antes, depois) {
  return (100 - (depois / antes) * 100).toFixed(1) + "%";
}

function criarPasta(p) {
  fs.mkdirSync(p, { recursive: true });
}

/* ---------- build ---------- */

async function build() {
  const relatorio = [];

  // limpa a pasta dist e recria a estrutura
  fs.rmSync(SAIDA, { recursive: true, force: true });
  criarPasta(path.join(SAIDA, "css"));
  criarPasta(path.join(SAIDA, "js"));
  criarPasta(path.join(SAIDA, "imagens"));

  /* ----- JAVASCRIPT: junta os 7 modulos em um arquivo so ----- */
  // na pasta docs o index.html fica na raiz, então os caminhos perdem o "../"
  const jsOriginal = juntar(ARQUIVOS_JS).replace(/\.\.\/imagens\//g, "imagens/");
  const resultadoJS = await minificarJS(jsOriginal, {
    compress: true,
    mangle: true,
    format: { comments: false }
  });

  if (resultadoJS.error) {
    throw resultadoJS.error;
  }

  fs.writeFileSync(path.join(SAIDA, "js/app.min.js"), resultadoJS.code);
  relatorio.push({
    arquivo: "JavaScript (7 modulos -> app.min.js)",
    antes: tamanho(jsOriginal),
    depois: tamanho(resultadoJS.code)
  });

  /* ----- CSS: junta reset + style em um arquivo so ----- */
  const cssOriginal = juntar(ARQUIVOS_CSS);
  const cssMinificado = csso.minify(cssOriginal).css;

  fs.writeFileSync(path.join(SAIDA, "css/style.min.css"), cssMinificado);
  relatorio.push({
    arquivo: "CSS (2 arquivos -> style.min.css)",
    antes: tamanho(cssOriginal),
    depois: tamanho(cssMinificado)
  });

  /* ----- HTML: troca os caminhos pelos arquivos minificados ----- */
  let html = ler("html/index.html");

  // remove as 8 linhas de <script> dos modulos e poe uma so
  html = html.replace(
    /\s*<script src="\.\.\/js\/modules\/[^"]+"><\/script>/g,
    ""
  );
  html = html.replace(
    '<script src="../js/main.js"></script>',
    '<script src="js/app.min.js"></script>'
  );

  // as duas folhas de estilo viram uma
  html = html.replace(
    '<link rel="stylesheet" href="../css/reset.css">\n  <link rel="stylesheet" href="../css/style.css">',
    '<link rel="stylesheet" href="css/style.min.css">'
  );

  const htmlOriginal = ler("html/index.html");
  const htmlMinificado = await minificarHTML(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
    removeRedundantAttributes: false,
    keepClosingSlash: true
  });

  fs.writeFileSync(path.join(SAIDA, "index.html"), htmlMinificado);
  relatorio.push({
    arquivo: "HTML (index.html)",
    antes: tamanho(htmlOriginal),
    depois: tamanho(htmlMinificado)
  });

  /* ----- copia as imagens e mede o tamanho de cada uma ----- */
  const imagens = [];

  fs.readdirSync(path.join(RAIZ, "imagens")).forEach(function (nome) {
    const origem = path.join(RAIZ, "imagens", nome);
    fs.copyFileSync(origem, path.join(SAIDA, "imagens", nome));
    imagens.push({ nome: nome, bytes: fs.statSync(origem).size });
  });

  if (fs.existsSync(path.join(RAIZ, "README.md"))) {
    fs.copyFileSync(path.join(RAIZ, "README.md"), path.join(SAIDA, "README.md"));
  }

  /* ----- relatorio ----- */
  let totalAntes = 0;
  let totalDepois = 0;
  const linhas = [];

  linhas.push("==========================================================");
  linhas.push("  RELATORIO DO BUILD - Minha ONG");
  linhas.push("==========================================================");
  linhas.push("");

  relatorio.forEach(function (item) {
    totalAntes += item.antes;
    totalDepois += item.depois;
    linhas.push(item.arquivo);
    linhas.push("  antes:   " + kb(item.antes));
    linhas.push("  depois:  " + kb(item.depois));
    linhas.push("  reducao: " + reducao(item.antes, item.depois));
    linhas.push("");
  });

  linhas.push("----------------------------------------------------------");
  linhas.push("TOTAL");
  linhas.push("  antes:   " + kb(totalAntes));
  linhas.push("  depois:  " + kb(totalDepois));
  linhas.push("  reducao: " + reducao(totalAntes, totalDepois));
  linhas.push("");
  linhas.push("IMAGENS (nao passam pelo minificador)");
  imagens.forEach(function (img) {
    linhas.push("  " + img.nome.padEnd(20) + kb(img.bytes));
  });

  const png = imagens.find(function (i) { return i.nome.endsWith(".png"); });
  const webp = imagens.find(function (i) { return i.nome.endsWith(".webp"); });

  if (png && webp) {
    linhas.push("  webp e " + reducao(png.bytes, webp.bytes) + " menor que o png");
  }

  linhas.push("");
  linhas.push("Requisicoes de arquivo: 10 viraram 3");
  linhas.push("  (7 JS + 2 CSS + 1 HTML  ->  1 JS + 1 CSS + 1 HTML)");
  linhas.push("==========================================================");

  const texto = linhas.join("\n");
  console.log(texto);
  fs.writeFileSync(path.join(RAIZ, "build-report.txt"), texto + "\n");
  console.log("\nRelatorio salvo em build-report.txt");
}

build().catch(function (erro) {
  console.error("Falhou o build:", erro);
  process.exit(1);
});
