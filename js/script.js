
const botoesCidade = document.querySelectorAll(".cidade-btn");
const conteudosCidade = document.querySelectorAll(".cidade-conteudo");

botoesCidade.forEach(botao => {
    botao.addEventListener("click", () => {
        const cidade = botao.dataset.cidade;
        botoesCidade.forEach(btn => {
            btn.classList.remove("ativo");
        });
        conteudosCidade.forEach(conteudo => {
            conteudo.classList.remove("ativo");
        });
        botao.classList.add("ativo");
        document.getElementById(cidade).classList.add("ativo");
    });

});

const botoesFiltro = document.querySelectorAll(".filtro[data-filtro]");
const cartoes = document.querySelectorAll(".cartao[data-categoria]");
botoesFiltro.forEach(botao => {
    botao.addEventListener("click", () => {
        const filtro = botao.dataset.filtro;
        botoesFiltro.forEach(btn => btn.classList.remove("ativo"));
        botao.classList.add("ativo");
        cartoes.forEach(cartao => {
            if (filtro === "todos" || cartao.dataset.categoria === filtro) {
                cartao.style.display = "";
            } else {
                cartao.style.display = "none";
            }
        });
    });
});
