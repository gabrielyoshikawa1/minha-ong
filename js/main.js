/* =========================================================
   MAIN.JS - ponto de entrada da aplicação
   Liga os módulos: inicia o router e prepara os eventos
   da página de cadastro, do modal e do toast.
   ========================================================= */

const App = {

  /* ---------- MODAL E TOAST ---------- */

  // guarda quem estava com o foco antes de abrir o modal
  focoAnterior: null,

  abrirModal() {
    const modal = document.getElementById("modal-termos");

    App.focoAnterior = document.activeElement;
    modal.classList.add("aberto");
    modal.setAttribute("aria-hidden", "false");

    // o modal aparece com uma transição de 0,3s e só aceita foco depois que
    // ela termina; por isso espero o fim da animação para mover o foco
    modal.addEventListener("transitionend", function moverFoco() {
      modal.removeEventListener("transitionend", moverFoco);
      document.getElementById("fechar-modal").focus();
    });
  },

  fecharModal() {
    const modal = document.getElementById("modal-termos");

    if (!modal.classList.contains("aberto")) {
      return;
    }

    modal.classList.remove("aberto");
    modal.setAttribute("aria-hidden", "true");

    // devolve o foco para o link que abriu o modal
    if (App.focoAnterior) {
      App.focoAnterior.focus();
      App.focoAnterior = null;
    }
  },

  // mostra um aviso rápido por 4 segundos ("sucesso" ou "erro")
  mostrarToast(mensagem, tipo) {
    const toast = document.getElementById("toast-enviado");
    toast.querySelector("p").textContent = mensagem;
    toast.classList.toggle("toast-erro", tipo === "erro");
    toast.classList.add("aberto");

    setTimeout(function () {
      toast.classList.remove("aberto");
    }, 4000);
  },

  /* ---------- MENU ---------- */

  // abre e fecha o menu, avisando o leitor de tela pelo aria-expanded
  alternarMenu() {
    const botao = document.querySelector(".botao-hamburguer");
    const menu = document.getElementById("menu-principal");
    const aberto = menu.classList.toggle("aberto");

    botao.setAttribute("aria-expanded", aberto ? "true" : "false");
  },

  // fecha o menu hambúrguer depois de clicar em um link
  fecharMenu() {
    const botao = document.querySelector(".botao-hamburguer");
    const menu = document.getElementById("menu-principal");

    menu.classList.remove("aberto");
    botao.setAttribute("aria-expanded", "false");
  },

  /* ---------- PÁGINA DE CADASTRO ---------- */

  // desenha a lista de cadastros que está no localStorage
  atualizarLista() {
    const area = document.getElementById("lista-cadastros");

    if (!area) {
      return;
    }

    area.innerHTML = Templates.listaCadastros(Storage.listar());

    // cada botão "Remover" apaga um cadastro e redesenha a lista
    area.querySelectorAll(".botao-remover").forEach(function (botao) {
      botao.addEventListener("click", function () {
        Storage.remover(Number(botao.dataset.indice));
        App.atualizarLista();
        App.mostrarToast("Cadastro removido.", "sucesso");
      });
    });
  },

  // prepara todos os eventos do formulário
  prepararCadastro() {
    const formulario = document.getElementById("form-cadastro");

    if (!formulario) {
      return;
    }

    // máscaras: formatam o texto enquanto o usuário digita
    const mascaras = {
      cpf: Validacao.mascaraCPF,
      telefone: Validacao.mascaraTelefone,
      cep: Validacao.mascaraCEP
    };

    Object.keys(mascaras).forEach(function (id) {
      const campo = document.getElementById(id);

      campo.addEventListener("input", function () {
        campo.value = mascaras[id](campo.value);
      });
    });

    // valida cada campo assim que o usuário sai dele
    formulario.querySelectorAll("input").forEach(function (campo) {
      campo.addEventListener("blur", function () {
        Validacao.validarCampo(campo);
      });
    });

    // ao enviar: não recarrega a página, valida e salva
    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();

      if (!Validacao.validarFormulario(formulario)) {
        App.mostrarToast("Confira os campos destacados em vermelho.", "erro");
        return;
      }

      Storage.salvar({
        nome: formulario.nome.value.trim(),
        nascimento: formulario.nascimento.value,
        cpf: formulario.cpf.value,
        email: formulario.email.value.trim(),
        telefone: formulario.telefone.value,
        cep: formulario.cep.value,
        endereco: formulario.endereco.value.trim(),
        cidade: formulario.cidade.value.trim(),
        estado: formulario.estado.value.toUpperCase(),
        cadastradoEm: Datas.agora()
      });

      formulario.reset();

      formulario.querySelectorAll("input").forEach(function (campo) {
        campo.classList.remove("campo-valido", "campo-invalido");
      });

      App.atualizarLista();
      App.mostrarToast("Cadastro enviado com sucesso! Entraremos em contato em breve.", "sucesso");
    });

    // link que abre os termos de participação
    document.getElementById("abrir-termos").addEventListener("click", function (evento) {
      evento.preventDefault();
      App.abrirModal();
    });

    App.atualizarLista();
  },

  /* ---------- INÍCIO DA APLICAÇÃO ---------- */

  iniciar() {
    // botão do menu hambúrguer
    document.querySelector(".botao-hamburguer").addEventListener("click", App.alternarMenu);

    // link "Pular para o conteúdo": leva o foco ao main sem mexer no endereço
    const pular = document.querySelector(".pular-para-conteudo");

    if (pular) {
      pular.addEventListener("click", function (evento) {
        evento.preventDefault();
        document.getElementById("app").focus();
      });
    }

    // botões fixos de fechar do modal e do toast
    document.getElementById("fechar-modal").addEventListener("click", function (evento) {
      evento.preventDefault();
      App.fecharModal();
    });

    document.getElementById("fechar-toast").addEventListener("click", function (evento) {
      evento.preventDefault();
      document.getElementById("toast-enviado").classList.remove("aberto");
    });

    // fecha o modal com a tecla Esc
    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape") {
        App.fecharModal();
      }
    });

    // o que acontece toda vez que o router troca de página
    Router.onRender = function () {
      App.fecharMenu();
      App.fecharModal();
      App.prepararCadastro();
    };

    Router.iniciar();
  }
};

// só começa depois que o HTML todo foi lido pelo navegador
document.addEventListener("DOMContentLoaded", App.iniciar);
