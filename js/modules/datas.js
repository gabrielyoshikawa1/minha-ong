/* =========================================================
   MÓDULO: DATAS
   Único ponto do projeto que conversa com a biblioteca Day.js.
   Se o CDN não carregar (sem internet), cada função tem um
   plano B em JavaScript puro, então o site não quebra.
   ========================================================= */

const Datas = {

  // true quando a biblioteca Day.js carregou
  temBiblioteca() {
    return typeof dayjs !== "undefined";
  },

  // 2002-11-01 vira 01/11/2002
  paraBR(iso) {
    if (!iso) {
      return "";
    }

    if (Datas.temBiblioteca()) {
      return dayjs(iso).format("DD/MM/YYYY");
    }

    return iso.split("-").reverse().join("/");
  },

  // data e hora de agora, já formatadas
  agora() {
    if (Datas.temBiblioteca()) {
      return dayjs().format("DD/MM/YYYY [às] HH:mm");
    }

    const d = new Date();
    const z = function (n) { return String(n).padStart(2, "0"); };

    return z(d.getDate()) + "/" + z(d.getMonth() + 1) + "/" + d.getFullYear() +
           " às " + z(d.getHours()) + ":" + z(d.getMinutes());
  },

  // true quando a data digitada ainda não chegou
  ehFutura(iso) {
    if (Datas.temBiblioteca()) {
      return dayjs(iso).isAfter(dayjs());
    }

    return new Date(iso) > new Date();
  }
};
