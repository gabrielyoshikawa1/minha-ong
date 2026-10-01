/* =========================================================
   MÓDULO: VALIDAÇÃO
   Confere os dados digitados no formulário e mostra o aviso
   embaixo do campo errado, sem recarregar a página.
   Também aplica as máscaras de CPF, telefone e CEP.
   ========================================================= */

const Validacao = {

  /* ---------- MÁSCARAS ---------- */

  // deixa só os números do que foi digitado
  apenasNumeros(texto) {
    return texto.replace(/\D/g, "");
  },

  // 12345678901 vira 123.456.789-01
  mascaraCPF(texto) {
    const numeros = Validacao.apenasNumeros(texto).slice(0, 11);

    return numeros
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  },

  // 11987654321 vira (11) 98765-4321
  mascaraTelefone(texto) {
    const numeros = Validacao.apenasNumeros(texto).slice(0, 11);

    return numeros
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
  },

  // 03000000 vira 03000-000
  mascaraCEP(texto) {
    const numeros = Validacao.apenasNumeros(texto).slice(0, 8);
    return numeros.replace(/(\d{5})(\d{1,3})$/, "$1-$2");
  },

  /* ---------- REGRAS DE CADA CAMPO ---------- */
  // cada regra recebe o valor digitado e devolve:
  // "" quando está certo, ou a mensagem de erro quando está errado

  regras: {
    nome(valor) {
      if (valor.trim().length < 3) {
        return "Digite seu nome completo (mínimo 3 letras).";
      }
      return "";
    },

    nascimento(valor) {
      if (valor === "") {
        return "Informe sua data de nascimento.";
      }
      if (Datas.ehFutura(valor)) {
        return "A data não pode estar no futuro.";
      }
      return "";
    },

    cpf(valor) {
      if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(valor)) {
        return "Digite o CPF no formato 000.000.000-00.";
      }
      return "";
    },

    email(valor) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
        return "Digite um e-mail válido, como nome@email.com.";
      }
      return "";
    },

    telefone(valor) {
      if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(valor)) {
        return "Digite o telefone no formato (00) 00000-0000.";
      }
      return "";
    },

    cep(valor) {
      if (!/^\d{5}-\d{3}$/.test(valor)) {
        return "Digite o CEP no formato 00000-000.";
      }
      return "";
    },

    endereco(valor) {
      if (valor.trim().length < 5) {
        return "Informe a rua e o número.";
      }
      return "";
    },

    cidade(valor) {
      if (valor.trim().length < 3) {
        return "Informe a cidade.";
      }
      return "";
    },

    estado(valor) {
      if (!/^[A-Za-z]{2}$/.test(valor.trim())) {
        return "Use a sigla do estado, como SP.";
      }
      return "";
    }
  },

  /* ---------- FEEDBACK NA TELA ---------- */

  // mostra ou apaga o aviso de um campo
  mostrarResultado(campo, mensagem) {
    const aviso = document.getElementById("erro-" + campo.id);

    if (mensagem === "") {
      campo.classList.remove("campo-invalido");
      campo.classList.add("campo-valido");
      campo.setAttribute("aria-invalid", "false");
      if (aviso) {
        aviso.textContent = "";
      }
      return true;
    }

    campo.classList.remove("campo-valido");
    campo.classList.add("campo-invalido");
    campo.setAttribute("aria-invalid", "true");
    if (aviso) {
      aviso.textContent = mensagem;
    }
    return false;
  },

  // valida um campo sozinho (usado quando o usuário sai do campo)
  validarCampo(campo) {
    const regra = Validacao.regras[campo.id];

    if (!regra) {
      return true;
    }

    return Validacao.mostrarResultado(campo, regra(campo.value));
  },

  // valida o formulário inteiro; devolve true só se tudo estiver certo
  validarFormulario(formulario) {
    const campos = formulario.querySelectorAll("input");
    let tudoCerto = true;

    campos.forEach(function (campo) {
      if (!Validacao.validarCampo(campo)) {
        tudoCerto = false;
      }
    });

    return tudoCerto;
  }
};
