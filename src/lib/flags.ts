// Chaves de liga/desliga do site (feature flags simples).
// Servem para esconder blocos inteiros sem apagar o código.

// SITE EM ESPERA — venda de ingresso escondida (jul/2026).
// Enquanto `true`: some o botão do topo, todos os botões "Garantir ingresso",
// a seção de modalidades/preços da home e a página /ingressos (redireciona pra home).
// Para religar a venda em TODO o site de uma vez, mude para `false`.
export const INGRESSOS_ESCONDIDOS = true;
