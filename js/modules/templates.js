/* =========================================================
   MÓDULO: TEMPLATES
   Cada função devolve um pedaço de HTML em texto.
   O router pega esse texto e joga dentro do <main id="app">.
   É assim que a página muda sem recarregar o site.
   ========================================================= */

const Templates = {

  /* ---------- COMPONENTES REAPROVEITÁVEIS ---------- */

  // um card de projeto/campanha (usado em 3 páginas diferentes)
  card(item) {
    return `
      <article>
        <h3>${item.titulo} <span class="badge badge-${item.situacao}">${item.etiqueta}</span></h3>
        <p>${item.texto}</p>
      </article>`;
  },

  // transforma uma lista de objetos em vários cards de uma vez
  listaDeCards(lista) {
    return lista.map(function (item) {
      return Templates.card(item);
    }).join("");
  },

  // uma linha da lista de cadastros salvos no localStorage
  linhaCadastro(pessoa, indice) {
    return `
      <li class="item-cadastro">
        <strong>${pessoa.nome}</strong>
        <span>${pessoa.email} &middot; ${pessoa.telefone}
        &middot; nasc. ${Datas.paraBR(pessoa.nascimento)}
        &middot; cadastrado em ${pessoa.cadastradoEm}</span>
        <button type="button" class="botao-remover" data-indice="${indice}"
                aria-label="Remover o cadastro de ${pessoa.nome}">Remover</button>
      </li>`;
  },

  /* ---------- PÁGINAS ---------- */

  inicio() {
    return `
      <section>
        <h2>Juntos, transformamos a vida de quem mais precisa</h2>
        <p>Cada gesto de ajuda faz diferença na nossa comunidade.</p>
        <picture>
          <source srcset="../imagens/banner.webp" type="image/webp">
          <img src="../imagens/banner.png"
               width="626" height="321"
               alt="Ilustração de várias mãos levantadas em frente a um mapa-múndi, representando voluntários ao redor do mundo">
        </picture>
        <p><small>Imagem: Freepik / Magnific</small></p>
        <a class="link-acao" href="#/cadastro">Quero ajudar</a>
      </section>

      <section>
        <h2>Quem Somos</h2>
        <p>A Minha ONG atua em comunidades com poucos recursos, oferecendo
        alimentação, educação e capacitação para famílias em situação de
        vulnerabilidade.</p>
      </section>

      <section>
        <h2>Como Você Pode Ajudar</h2>
        ${Templates.listaDeCards(Dados.formasDeAjudar)}
        <a class="link-acao" href="#/projetos">Ver todos os projetos</a>
      </section>`;
  },

  projetos() {
    return `
      <section>
        <h2>Nossas Frentes de Atuação</h2>
        <p class="alerta alerta-info">As inscrições para voluntariado do segundo semestre estão abertas.</p>
        ${Templates.listaDeCards(Dados.projetos)}
      </section>

      <section>
        <h2>Seja Voluntário</h2>
        <p>Você pode ajudar doando algumas horas do seu tempo. Veja como participar:</p>
        <ul>
          ${Dados.tarefasVoluntario.map(function (tarefa) {
            return `<li>${tarefa}</li>`;
          }).join("")}
        </ul>
        <a class="link-acao" href="#/cadastro">Quero ser voluntário</a>
      </section>`;
  },

  campanhas() {
    return `
      <section>
        <h2>Campanhas de Doação</h2>
        <p>Suas doações mantêm nossos projetos funcionando.</p>
        ${Templates.listaDeCards(Dados.campanhas)}
        <a class="link-acao" href="#/cadastro">Quero ser doador</a>
      </section>`;
  },

  cadastro() {
    return `
      <section>
        <h2 id="titulo-cadastro">Seja um Voluntário ou Doador</h2>

        <p class="alerta alerta-info">Seus dados são usados apenas para contato da ONG, conforme a LGPD.</p>
        <p><a class="link-modal" href="#" id="abrir-termos">Ler os termos de participação</a></p>

        <form id="form-cadastro" novalidate aria-labelledby="titulo-cadastro">
          <fieldset>
            <legend>Dados Pessoais</legend>

            <label for="nome">Nome completo:</label>
            <input type="text" id="nome" name="nome" aria-describedby="erro-nome" required>
            <span class="msg-erro" role="alert" id="erro-nome"></span>

            <label for="nascimento">Data de nascimento:</label>
            <input type="date" id="nascimento" name="nascimento" aria-describedby="erro-nascimento" required>
            <span class="msg-erro" role="alert" id="erro-nascimento"></span>

            <label for="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" aria-describedby="erro-cpf" placeholder="000.000.000-00" maxlength="14" required>
            <span class="msg-erro" role="alert" id="erro-cpf"></span>
          </fieldset>

          <fieldset>
            <legend>Contato</legend>

            <label for="email">E-mail:</label>
            <input type="email" id="email" name="email" aria-describedby="erro-email" required>
            <span class="msg-erro" role="alert" id="erro-email"></span>

            <label for="telefone">Telefone:</label>
            <input type="tel" id="telefone" name="telefone" aria-describedby="erro-telefone" placeholder="(00) 00000-0000" maxlength="15" required>
            <span class="msg-erro" role="alert" id="erro-telefone"></span>
          </fieldset>

          <fieldset>
            <legend>Endereço</legend>

            <label for="cep">CEP:</label>
            <input type="text" id="cep" name="cep" aria-describedby="erro-cep" placeholder="00000-000" maxlength="9" required>
            <span class="msg-erro" role="alert" id="erro-cep"></span>

            <label for="endereco">Endereço:</label>
            <input type="text" id="endereco" name="endereco" aria-describedby="erro-endereco" required>
            <span class="msg-erro" role="alert" id="erro-endereco"></span>

            <label for="cidade">Cidade:</label>
            <input type="text" id="cidade" name="cidade" aria-describedby="erro-cidade" required>
            <span class="msg-erro" role="alert" id="erro-cidade"></span>

            <label for="estado">Estado (UF):</label>
            <input type="text" id="estado" name="estado" aria-describedby="erro-estado" placeholder="SP" maxlength="2" required>
            <span class="msg-erro" role="alert" id="erro-estado"></span>
          </fieldset>

          <button type="submit">Cadastrar</button>
        </form>
      </section>

      <section>
        <h2>Cadastros Salvos</h2>
        <p>Esta lista fica guardada no <em>localStorage</em> do navegador e continua
        aqui mesmo depois de fechar a página.</p>
        <div id="lista-cadastros"></div>
      </section>`;
  },

  // aparece quando o endereço digitado não existe
  naoEncontrada() {
    return `
      <section>
        <h2>Página não encontrada</h2>
        <p class="alerta alerta-erro">O endereço digitado não existe neste site.</p>
        <a class="link-acao" href="#/inicio">Voltar para o início</a>
      </section>`;
  },

  // lista de cadastros (ou aviso de lista vazia)
  listaCadastros(cadastros) {
    if (cadastros.length === 0) {
      return `<p class="alerta alerta-info">Nenhum cadastro salvo ainda.</p>`;
    }

    return `
      <ul class="lista-cadastros">
        ${cadastros.map(function (pessoa, indice) {
          return Templates.linhaCadastro(pessoa, indice);
        }).join("")}
      </ul>`;
  }
};
