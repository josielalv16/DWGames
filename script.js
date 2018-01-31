var url_atual = window.location.href;
//Carrega Cabeço e Rodapé
function carregaDocumento(arquivo, target) {
    var el = document.querySelector(target);
    //Se o elemento não existir então não requisita
    if (!el) return;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", arquivo, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300) {
            el.innerHTML = xhr.responseText;
        }
    };

    xhr.send(null);
}

window.onload = function () {
    carregaDocumento("cabecalho.html", "#cabecalho");
    carregaDocumento("rodape.html", "#rodape");

    setTimeout(function () {
        styloMenu();
        document.querySelector("#campoBuscar").addEventListener("keyup", function (event) {
            if (event.keyCode == 13) {
                buscar();
            }
        });
    }, 100);

    // carregarDestaqueXbox360();
}

function buscar() {
    var campoBuscar = document.getElementById("campoBuscar").value;
    window.location.assign("buscar.html?" + campoBuscar);
}

var jogosPlayStation3;
var jogosPlayStation4;
var jogosXbox360;
var jogosXboxOne;

//Seleciona o menu correspondente a pagina e chama a função para carregar os jogos caso houver
function styloMenu() {
    if (url_atual.includes("inicio") || url_atual.includes("buscar")) {
        var inicio = document.getElementById("inicio");
        inicio.style.borderBottom = '10px solid #004A87';
        inicio.style.color = '#004A87';
        if (url_atual.includes("inicio")) {
            $.get('./json/xbox360.json', function (res) {
                carregarDestaqueXbox360(res);
            });
            $.get('./json/ps3.json', function (res) {
                carregarDestaquePs3(res);
            });
            $.get('./json/ps4.json', function (res) {
                carregarDestaquePs4(res);
            });
        }
    } else if (url_atual.includes("xbox360") || url_atual.includes("xb360")) {
        var xbox360 = document.getElementById("xbox360");
        xbox360.style.borderBottom = '10px solid #FAA61E';
        xbox360.style.color = '#FAA61E';
        if (url_atual.includes("xbox360")) {
            $.get('./json/xbox360.json', function (res) {
                jogosXbox360 = res;
                carregarTodosOsJogos(res);
            });
        }
    } else if (url_atual.includes("xboxone") || url_atual.includes("xbone")) {
        var xboxone = document.getElementById("xboxone");
        xboxone.style.borderBottom = '10px solid #673AB7';
        xboxone.style.color = '#673AB7';
        if (url_atual.includes("xboxone")) {
            $.get('./json/xboxone.json', function (res) {
                jogosXboxOne = res;
                carregarTodosOsJogos(res);
            });
        }
    } else if (url_atual.includes("playstation3") || url_atual.includes("ps3")) {
        var play3 = document.getElementById("playstation3");
        play3.style.borderBottom = '10px solid #A62C48';
        play3.style.color = '#A62C48';
        if (url_atual.includes("playstation3")) {
            $.get('./json/ps3.json', function (res) {
                jogosPlayStation3 = res;
                carregarTodosOsJogos(res);
            });
        }
    } else if (url_atual.includes("playstation4") || url_atual.includes("ps4")) {
        var play4 = document.getElementById("playstation4");
        play4.style.borderBottom = '10px solid #44A3BD';
        play4.style.color = '#44A3BD';
        if (url_atual.includes("playstation4")) {
            $.get('./json/ps4.json', function (res) {
                jogosPlayStation4 = res;
                carregarTodosOsJogos(res);
            })
        }
    } else if (url_atual.includes("contato")) {
        var contato = document.getElementById("contato");
        contato.style.borderBottom = '10px solid #FF5722';
        contato.style.color = '#FF5722';
    }
}

var html = '';
function carregarCardJogo(jogo) {
    var cor = jogo.plataforma == 'ps3' ? 'vinho' : jogo.plataforma == 'ps4' ? 'azul-claro' : jogo.plataforma == 'xb360' ? 'amarelo' : jogo.plataforma == 'xbone' ? 'roxo' : '';
    var estrela1 = jogo.estrelas >= 1 ? cor : "";
    var estrela2 = jogo.estrelas >= 2 ? cor : "";
    var estrela3 = jogo.estrelas >= 3 ? cor : "";
    var estrela4 = jogo.estrelas >= 4 ? cor : "";
    var estrela5 = jogo.estrelas >= 5 ? cor : "";

    html += '<div class="base-card-conteudo com-borda ' + cor + '"><a href="jogo.html?' + jogo.id + '&' + jogo.plataforma + '"><div class="bloco-conteudo"><div class="background"><img src="imagens/' + jogo.plataforma + '/' + jogo.imagem + '"></div><div class="conteudo"><div class="categoria">' + jogo.genero + '</div><div class="titulo">' + jogo.nome + '</div><div><div class="valor">R$' + jogo.preco + '</div><div class="avaliacao"><span class="base-estrela estrela ' + estrela1 + ' "></span><span class="base-estrela estrela ' + estrela2 + '"></span><span class="base-estrela estrela ' + estrela3 + '"></span><span class="base-estrela estrela ' + estrela4 + '"></span><span class="base-estrela estrela ' + estrela5 + '"></span></div></div></div></div><div class="bloco-conteudo hover"><div class="conteudo"><div class="empresa">' + jogo.empresa + '</div></div></div></a></div>';
}

function carregarTodosOsJogos(jogos) {
    var baseCard = document.getElementById("base-card");
    html = '';
    var aux = 0;
    for (var i = 0; i < jogos.length; i++) {
        if (aux % 3 == 0) {
            html += '<div class="base-card">';
        }
        aux++;
        carregarCardJogo(jogos[i]);
        if (aux % 3 == 0) {
            html += '</div>';
        }
    }
    baseCard.innerHTML = html;
}

function filtroGenero(genero, plataforma) {
    var baseCard = document.getElementById("base-card");
    document.getElementById("base-categoria").innerText = genero;
    html = '';
    var aux = 0;
    var jogosPlataforma;
    if (plataforma == "xbox360") {
        jogosPlataforma = jogosXbox360;
    } else if (plataforma == "xboxone") {
        jogosPlataforma = jogosXboxOne;
    } else if (plataforma == "ps3") {
        jogosPlataforma = jogosPlayStation3;
    } else if (plataforma == "ps4") {
        jogosPlataforma = jogosPlayStation4;
    }
    if (genero == "Todos") {
        carregarTodosOsJogos(jogosPlataforma);
    } else {
        for (var i = 0; i < jogosPlataforma.length; i++) {
            if (jogosPlataforma[i].genero.includes(genero)) {
                if (aux % 3 == 0) {
                    html += '<div class="base-card">';
                }
                aux++;
                carregarCardJogo(jogosPlataforma[i]);
                if (aux % 3 == 0) {
                    html += '</div>';
                }
            }
        }
        baseCard.innerHTML = html;
    }
}
