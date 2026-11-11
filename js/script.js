
document.addEventListener("DOMContentLoaded", () => {


    const pesquisa = document.getElementById("pesquisa-campanha");
    const filtroCidade = document.getElementById("filtro-cidade");
    const filtroCategoria = document.getElementById("filtro-categoria");
    const filtroStatus = document.getElementById("filtro-status");
    const limparFiltros = document.getElementById("limpar-filtros");
    const campanhas = document.querySelectorAll(".cartao-campanha");
    const resultadoPesquisa = document.getElementById("resultado-pesquisa");

    function filtrarCampanhas() {

        const texto = pesquisa.value.toLowerCase().trim();
        const cidade = filtroCidade.value;
        const categoria = filtroCategoria.value;
        const status = filtroStatus.value;
        let quantidadeEncontrada = 0;

        campanhas.forEach(campanha => {

            const conteudo = campanha.innerText.toLowerCase();
            const campanhaCidade = campanha.dataset.cidade;
            const campanhaCategoria = campanha.dataset.categoria;
            const campanhaStatus = campanha.dataset.status;
            const correspondeTexto = conteudo.includes(texto);
            const correspondeCidade =
                cidade === "todas" || campanhaCidade === cidade;
            const correspondeCategoria =
                categoria === "todas" || campanhaCategoria === categoria;
            const correspondeStatus =
                status === "todos" || campanhaStatus === status;
            const corresponde =
                correspondeTexto &&
                correspondeCidade &&
                correspondeCategoria &&
                correspondeStatus;

            campanha.classList.toggle("campanha-oculta", !corresponde);

            if (corresponde) {
                quantidadeEncontrada++;
            }
        });

        if (quantidadeEncontrada === 0) {
            resultadoPesquisa.textContent =
                "Nenhuma campanha encontrada. Tente alterar os filtros.";
        } else if (quantidadeEncontrada === 1) {
            resultadoPesquisa.textContent =
                "Foi encontrada 1 campanha.";
        } else {
            resultadoPesquisa.textContent =
                `Foram encontradas ${quantidadeEncontrada} campanhas.`;
        }
    }
    pesquisa.addEventListener("input", filtrarCampanhas);
    filtroCidade.addEventListener("change", filtrarCampanhas);
    filtroCategoria.addEventListener("change", filtrarCampanhas);
    filtroStatus.addEventListener("change", filtrarCampanhas);
    limparFiltros.addEventListener("click", () => {

        pesquisa.value = "";
        filtroCidade.value = "todas";
        filtroCategoria.value = "todas";
        filtroStatus.value = "todos";

        filtrarCampanhas();
        pesquisa.focus();
    });
    filtrarCampanhas();

    const botoesCidade = document.querySelectorAll(".cidade-btn");
    const conteudosCidade = document.querySelectorAll(".cidade-conteudo");
    function selecionarCidade(cidadeSelecionada) {

        botoesCidade.forEach(botao => {
            const selecionado =
                botao.dataset.cidade === cidadeSelecionada;
            botao.classList.toggle("ativo", selecionado);
            botao.setAttribute(
                "aria-pressed",
                String(selecionado)
            );
        });
        conteudosCidade.forEach(conteudo => {
            const selecionado =
                conteudo.id === cidadeSelecionada;
            conteudo.classList.toggle("ativo", selecionado);
        });
    }

    botoesCidade.forEach(botao => {
        botao.addEventListener("click", () => {
            const cidade = botao.dataset.cidade;
            selecionarCidade(cidade);
        });
    });

    const topo = document.querySelector(".topo");
    const navegacao = topo.querySelector("nav");
    const botaoMenu = document.createElement("button");
    botaoMenu.type = "button";
    botaoMenu.className = "menu-toggle";
    botaoMenu.textContent = "☰ Menu";
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-controls", "menu-principal");
    navegacao.id = "menu-principal";
    topo.insertBefore(botaoMenu, navegacao);
    botaoMenu.addEventListener("click", () => {
        const menuAberto = navegacao.classList.toggle("aberto");
        botaoMenu.setAttribute(
            "aria-expanded",
            String(menuAberto)
        );
        botaoMenu.textContent =
            menuAberto ? "✕ Fechar" : "☰ Menu";
    });
    navegacao.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navegacao.classList.remove("aberto");
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.textContent = "☰ Menu";
        });
    });

    const linksMenu = document.querySelectorAll(
        '.topo nav a[href^="#"]'
    );
    const secoes = document.querySelectorAll(
        "main section[id]"
    );
    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver(
            (entradas) => {
                entradas.forEach(entrada => {
                    if (entrada.isIntersecting) {
                        const idSecao = entrada.target.id;
                        linksMenu.forEach(link => {
                            const ativo =
                                link.getAttribute("href") === `#${idSecao}`;
                            link.classList.toggle("ativo", ativo);
                        });
                    }
                });

            },
            {
                rootMargin: "-25% 0px -65% 0px"
            }
        );

        secoes.forEach(secao => {
            observador.observe(secao);
        });
    }


    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", evento => {
            const destino = link.getAttribute("href");
            if (!destino || destino === "#") {
                return;
            }
            const elemento = document.querySelector(destino);
            if (elemento) {
                evento.preventDefault();
                elemento.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",
                    block: "start"
                });

                history.replaceState(null, "", destino);
            }
        });
    });


    // =====================================
    // 6. ANO AUTOMÁTICO NO RODAPÉ
    // =====================================

    const textoRodape = document.querySelector("footer p");

    if (textoRodape) {
        textoRodape.textContent =
            `© ${new Date().getFullYear()} Natal Solidário`;
    }

});
