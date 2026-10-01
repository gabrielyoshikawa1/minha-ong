# Minha ONG

Site institucional de uma ONG fictícia, construído como Single Page Application
(SPA) com HTML5, CSS3 e JavaScript puro, sem framework.

O projeto foi desenvolvido ao longo das Experiências Práticas da disciplina de
Desenvolvimento Front-end, da Universidade Cruzeiro do Sul (UNICID).

🔗 **Site publicado:** https://gabrielyoshikawa1.github.io/minha-ong/

---

## Sobre o projeto

A aplicação apresenta as frentes de atuação da ONG, as campanhas de doação e um
formulário de cadastro para voluntários e doadores. A navegação acontece sem
recarregar a página: o endereço muda depois do `#` e o JavaScript troca apenas o
conteúdo do `<main>`.

Funcionalidades:

- Navegação SPA com roteamento por hash
- Conteúdo gerado por templates em JavaScript, a partir de listas de dados
- Menu responsivo com submenu e versão hambúrguer
- Formulário com validação própria, máscaras de CPF, telefone e CEP
- Cadastros guardados no `localStorage` do navegador
- Componentes de feedback: modal, toast, badges e alertas
- Layout responsivo em cinco breakpoints
- Conformidade com a WCAG 2.1 nível AA

---

## Tecnologias utilizadas

| Tecnologia | Uso no projeto |
|---|---|
| HTML5 | Marcação semântica (`header`, `nav`, `main`, `section`, `article`, `footer`) |
| CSS3 | Design system com variáveis, Grid de 12 colunas, Flexbox e media queries |
| JavaScript (ES6) | Roteamento, templates, eventos, validação e persistência |
| Web Storage API | `localStorage` para guardar os cadastros |
| Day.js 1.11.13 | Biblioteca externa de datas, carregada por CDN |
| Git e GitHub | Controle de versão, GitFlow, issues, milestones e pull requests |
| GitHub Pages | Hospedagem do site em produção |

Nenhuma dependência é instalada localmente: o projeto roda apenas com um
navegador, e a única biblioteca externa vem por CDN.

---

## Estrutura de pastas

```
minha-ong/
├── html/
│   └── index.html          página única da aplicação
├── css/
│   ├── reset.css           zera diferenças entre navegadores
│   └── style.css           design system, layout e componentes
├── imagens/
│   └── banner.png          imagem da página inicial
├── js/
│   ├── main.js             ponto de entrada: liga os módulos e os eventos
│   └── modules/
│       ├── datas.js        único módulo que conversa com o Day.js
│       ├── dados.js        conteúdo do site em listas
│       ├── templates.js    transforma os dados em HTML
│       ├── router.js       lê o # do endereço e desenha a página
│       ├── validacao.js    regras e máscaras do formulário
│       └── storage.js      leitura e escrita no localStorage
├── .gitignore
└── README.md
```

Cada arquivo tem uma responsabilidade só. Os módulos são carregados como scripts
separados no fim do `body`, na ordem das dependências.

---

## Instalação e execução local

### Pré-requisitos

- Um navegador atualizado (Chrome, Firefox, Edge ou Safari)
- Git, apenas para clonar o repositório
- Conexão com a internet no primeiro acesso, para o CDN do Day.js

Não é necessário Node.js, npm ou qualquer instalação de dependências.

### Passo a passo

```bash
# 1. clone o repositório
git clone https://github.com/gabrielyoshikawa1/minha-ong.git

# 2. entre na pasta
cd minha-ong

# 3. abra a aplicação
#    Windows
start html/index.html
#    macOS
open html/index.html
#    Linux
xdg-open html/index.html
```

Também funciona abrindo o arquivo `html/index.html` com dois cliques.

### Rodando com servidor local (opcional)

Para simular o ambiente de produção, com qualquer um destes comandos:

```bash
# Python 3
python -m http.server 5500

# Node.js
npx serve .
```

Depois acesse `http://localhost:5500/html/index.html`.

---

## Como usar

1. **Início** — apresentação da ONG e formas de ajudar
2. **Projetos** — frentes de atuação e como ser voluntário
3. **Campanhas de Doação** — campanhas ativas
4. **Cadastro** — formulário de voluntário ou doador

Os cadastros enviados ficam guardados no navegador e continuam na lista mesmo
depois de fechar a página. Para apagar, use o botão **Remover** de cada item.

---

## Versionamento

O projeto segue o padrão **GitFlow**:

| Branch | Função |
|---|---|
| `main` | versões publicadas e estáveis |
| `develop` | desenvolvimento contínuo |
| `feature/*` | uma funcionalidade nova, criada a partir da `develop` |
| `hotfix/*` | correção urgente, criada a partir da `main` |

As mensagens de commit seguem o padrão **Conventional Commits**, no formato
`tipo(escopo): descrição`:

| Tipo | Quando usar |
|---|---|
| `feat` | funcionalidade nova |
| `fix` | correção de bug |
| `refactor` | melhora o código sem mudar o comportamento |
| `docs` | documentação |
| `style` | formatação, CSS |
| `chore` | manutenção e configuração |

As versões usam **versionamento semântico** (`MAJOR.MINOR.PATCH`) e são marcadas
com tags na `main`:

- `v1.0.0` — primeira versão funcional
- `v1.0.1` — correção do modal que não abria na SPA
- `v1.1.0` — acessibilidade e publicação em produção

A integração das branches é feita por **pull request**, sempre com a base
apontando para `develop`. As tarefas são registradas em **issues**, agrupadas por
**milestone** e fechadas automaticamente pelo PR correspondente.

---

## Acessibilidade

O site segue as diretrizes da **WCAG 2.1, nível AA**:

- Contraste de no mínimo 4.5:1 entre texto e fundo
- Navegação completa por teclado, com foco sempre visível
- Estrutura semântica e hierarquia de títulos sem saltos
- Texto alternativo nas imagens
- Todos os campos do formulário com `label` associado
- Mensagens de erro em texto, nunca apenas por cor

---

## Deploy

O site é publicado no **GitHub Pages** a partir da branch `main`.

Para publicar:

1. No repositório, vá em **Settings > Pages**
2. Em **Source**, escolha **Deploy from a branch**
3. Selecione a branch `main` e a pasta `/ (root)`
4. Salve e aguarde alguns minutos

---

## Autor e licença

**Gabriel Yoshikawa**
Estudante de Ciência da Computação — UNICID

Projeto acadêmico, sem fins comerciais.
A imagem da página inicial é do acervo gratuito do Freepik / Magnific.
