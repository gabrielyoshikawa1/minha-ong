/* =========================================================
   MÓDULO: DADOS
   Guarda o conteúdo do site em listas (arrays de objetos).
   Assim o texto fica separado do HTML e os templates
   conseguem repetir o mesmo componente visual várias vezes.
   ========================================================= */

const Dados = {

  // cards da página "Projetos"
  projetos: [
    {
      titulo: "Alimento Solidário",
      texto: "Entrega mensal de cestas básicas para famílias da comunidade.",
      situacao: "ativo",
      etiqueta: "Ativo"
    },
    {
      titulo: "Reforço Escolar",
      texto: "Aulas gratuitas para crianças e adolescentes.",
      situacao: "urgente",
      etiqueta: "Precisa de voluntários"
    },
    {
      titulo: "Capacitação Profissional",
      texto: "Cursos gratuitos para jovens e adultos que buscam emprego.",
      situacao: "encerrado",
      etiqueta: "Turma encerrada"
    }
  ],

  // cards da página "Campanhas de Doação"
  campanhas: [
    {
      titulo: "Doação de Alimentos",
      texto: "Recebemos alimentos não perecíveis na nossa sede durante todo o ano.",
      situacao: "ativo",
      etiqueta: "Ativo"
    },
    {
      titulo: "Material Escolar",
      texto: "No início de cada ano, arrecadamos cadernos, lápis e mochilas.",
      situacao: "urgente",
      etiqueta: "Campanha urgente"
    },
    {
      titulo: "Doação em Dinheiro",
      texto: "Contribuições financeiras ajudam a comprar alimentos e materiais.",
      situacao: "ativo",
      etiqueta: "Ativo"
    }
  ],

  // cards da página inicial
  formasDeAjudar: [
    {
      titulo: "Seja Voluntário",
      texto: "Doe algumas horas do seu tempo nas nossas ações.",
      situacao: "ativo",
      etiqueta: "Inscrições abertas"
    },
    {
      titulo: "Faça uma Doação",
      texto: "Contribua com alimentos, materiais escolares ou valores.",
      situacao: "ativo",
      etiqueta: "Ativo"
    }
  ],

  // itens da lista de voluntariado
  tarefasVoluntario: [
    "Ajudar na montagem e entrega das cestas básicas",
    "Dar aulas de reforço escolar",
    "Ensinar nos cursos de capacitação"
  ]
};
