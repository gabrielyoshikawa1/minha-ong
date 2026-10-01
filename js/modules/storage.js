/* =========================================================
   MÓDULO: STORAGE
   Guarda e recupera os cadastros no localStorage do navegador.
   O localStorage só aceita texto, por isso usamos:
   - JSON.stringify  -> transforma a lista em texto para salvar
   - JSON.parse      -> transforma o texto de volta em lista
   ========================================================= */

const Storage = {

  // nome da "gaveta" onde os dados ficam guardados
  CHAVE: "cadastros-minha-ong",

  // devolve a lista salva (ou uma lista vazia, se nunca salvou nada)
  listar() {
    const texto = localStorage.getItem(Storage.CHAVE);

    if (!texto) {
      return [];
    }

    try {
      return JSON.parse(texto);
    } catch (erro) {
      // se o conteúdo estiver corrompido, começa do zero
      console.error("Não foi possível ler os cadastros salvos:", erro);
      return [];
    }
  },

  // adiciona um cadastro no fim da lista e salva tudo de novo
  salvar(cadastro) {
    const lista = Storage.listar();
    lista.push(cadastro);
    localStorage.setItem(Storage.CHAVE, JSON.stringify(lista));
  },

  // remove um cadastro pela posição dele na lista
  remover(indice) {
    const lista = Storage.listar();
    lista.splice(indice, 1);
    localStorage.setItem(Storage.CHAVE, JSON.stringify(lista));
  }
};
