/* =========================================================
   MÓDULO: ROUTER (navegação da SPA)
   Em vez de abrir um arquivo .html novo a cada clique, o site
   olha o que vem depois do "#" no endereço e troca apenas o
   conteúdo do <main id="app">. Por isso a página nunca recarrega.
   ========================================================= */

const Router = {

  // liga cada endereço ao título da aba e ao template que vai ser mostrado
  rotas: {
    "#/inicio": { titulo: "Início - Minha ONG", template: Templates.inicio },
    "#/projetos": { titulo: "Projetos - Minha ONG", template: Templates.projetos },
    "#/campanhas": { titulo: "Campanhas - Minha ONG", template: Templates.campanhas },
    "#/cadastro": { titulo: "Cadastro - Minha ONG", template: Templates.cadastro }
  },

  // callback que o main.js preenche para rodar algo depois de desenhar a página
  onRender: null,

  // lê o endereço atual e desenha a página correspondente
  carregar() {
    const app = document.getElementById("app");
    const endereco = window.location.hash || "#/inicio";
    const rota = Router.rotas[endereco];

    if (rota) {
      document.title = rota.titulo;
      app.innerHTML = rota.template();
    } else {
      document.title = "Página não encontrada - Minha ONG";
      app.innerHTML = Templates.naoEncontrada();
    }

    Router.marcarLinkAtivo(endereco);
    Router.avisarLeitorDeTela();
    window.scrollTo(0, 0);

    if (typeof Router.onRender === "function") {
      Router.onRender(endereco);
    }
  },

  // escreve o nome da página aberta em uma área que só o leitor de tela lê
  avisarLeitorDeTela() {
    const aviso = document.getElementById("aviso-pagina");

    if (aviso) {
      aviso.textContent = document.title + " carregada";
    }
  },

  // deixa em destaque o link do menu que corresponde à página aberta
  marcarLinkAtivo(endereco) {
    const links = document.querySelectorAll(".menu a");

    links.forEach(function (link) {
      if (link.getAttribute("href") === endereco) {
        link.classList.add("ativo");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("ativo");
        link.removeAttribute("aria-current");
      }
    });
  },

  // começa a ouvir as trocas de endereço
  iniciar() {
    // quando o usuário clica em um link do menu (o "#" muda)
    window.addEventListener("hashchange", Router.carregar);

    // quando o site abre pela primeira vez
    if (!window.location.hash) {
      window.location.hash = "#/inicio";
    }

    Router.carregar();
  }
};
