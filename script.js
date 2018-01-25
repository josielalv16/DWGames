//Carrega Cabeço e Rodapé
function carregaDocumento(arquivo, target)
{
    var el = document.querySelector(target);
 	//Se o elemento não existir então não requisita
 	if (!el) return;

 	var xhr = new XMLHttpRequest();
 	xhr.open("GET", arquivo, true);
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300){
            el.innerHTML = xhr.responseText;
        }
    };

    xhr.send(null);
}

window.onload = function(){
    carregaDocumento("cabecalho.html", "#cabecalho");
    carregaDocumento("rodape.html", "#rodape");

    setTimeout(function(){ 
        styloMenu();
    }, 100);
}

var jogosPlayStation3;

//Seleciona o menu correspondente a pagina e chama a função para carregar os jogos caso houver
function styloMenu(){
    var url_atual = window.location.href;
    if(url_atual.includes("inicio")){
        var inicio = document.getElementById("inicio");
        inicio.style.borderBottom = '10px solid #004A87';
        inicio.style.color = '#004A87';
    }else if(url_atual.includes("pc")){
        var pc = document.getElementById("pc");
        pc.style.borderBottom = '10px solid #197401';
        pc.style.color = '#197401';
    }else if(url_atual.includes("xbox360")){
        var xbox360 = document.getElementById("xbox360");
        xbox360.style.borderBottom = '10px solid #FAA61E';
        xbox360.style.color = '#FAA61E';
    }else if(url_atual.includes("xboxone")){
        var xboxone = document.getElementById("xboxone");
        xboxone.style.borderBottom = '10px solid #673AB7';
        xboxone.style.color = '#673AB7';
    }else if(url_atual.includes("playstation3") || url_atual.includes("ps3")){
        var play3 = document.getElementById("playstation3");
        play3.style.borderBottom = '10px solid #A62C48';
        play3.style.color = '#A62C48';
        if(url_atual.includes("playstation3")){
            //Chama função no arquivo /scrips/ps3.js
            $.get('./json/ps3.json', function(res){
                jogosPlayStation3 = res;
                carregarTodosJogosPs3();
            });
        }
    }else if(url_atual.includes("playstation4")){
        var play4 = document.getElementById("playstation4");
        play4.style.borderBottom = '10px solid #44A3BD';
        play4.style.color = '#44A3BD';
    }else if(url_atual.includes("jogos")){
        var play4 = document.getElementById("playstation4");
        play4.style.borderBottom = '10px solid #FF5722';
        play4.style.color = '#FF5722';
    }
}

function carregarTodosJogosPs3() {
    var baseCard = document.getElementById("base-card");
    var html = '';
    var aux = 0;
    for(var i = 0; i < jogosPlayStation3.length; i++){
        if(aux % 3 == 0){
            html += '<div class="base-card">';
        }
        aux++;
        var estrela1 = jogosPlayStation3[i].estrelas >= 1 ? "estrela-ativa" : "";
        var estrela2 = jogosPlayStation3[i].estrelas >= 2 ? "estrela-ativa" : "";
        var estrela3 = jogosPlayStation3[i].estrelas >= 3 ? "estrela-ativa" : "";
        var estrela4 = jogosPlayStation3[i].estrelas >= 4 ? "estrela-ativa" : "";
        var estrela5 = jogosPlayStation3[i].estrelas >= 5 ? "estrela-ativa" : "";

        html += '<div class="base-card-conteudo com-borda vinho"><a href="jogo.html?' + jogosPlayStation3[i].id + '&ps3"><div class="bloco-conteudo"><div class="background"><img src="imagens/ps3/' + jogosPlayStation3[i].imagem +'"></div><div class="conteudo"><div class="categoria">' + jogosPlayStation3[i].genero +'</div><div class="titulo">' + jogosPlayStation3[i].nome + '</div><div><div class="valor">R$' + jogosPlayStation3[i].preco + '</div><div class="avaliacao"><span class="base-estrela estrela ' + estrela1 +' "></span><span class="base-estrela estrela ' + estrela2 + '"></span><span class="base-estrela estrela ' + estrela3 + '"></span><span class="base-estrela estrela ' + estrela4 + '"></span><span class="base-estrela estrela ' + estrela5 + '"></span></div></div></div></div><div class="bloco-conteudo hover"><div class="conteudo"><div class="empresa">' + jogosPlayStation3[i].empresa + '</div></div></div></a></div>';
        if(aux % 3 == 0){
            html += '</div>';
        }
    }

    baseCard.innerHTML = html;
}

function filtroGeneroPs3(genero){
    var baseCard = document.getElementById("base-card");
    document.getElementById("base-categoria").innerText = genero;
    var html = '';
    var aux = 0;
    if(genero == "Todos") {
        carregarTodosJogosPs3();
    } else {
        for(var i = 0; i < jogosPlayStation3.length; i++) {
            if(jogosPlayStation3[i].genero.includes(genero)) {
                if(aux % 3 == 0) {
                    html += '<div class="base-card">';
                }
                aux++;
                var estrela1 = jogosPlayStation3[i].estrelas >= 1 ? "estrela-ativa" : "";
                var estrela2 = jogosPlayStation3[i].estrelas >= 2 ? "estrela-ativa" : "";
                var estrela3 = jogosPlayStation3[i].estrelas >= 3 ? "estrela-ativa" : "";
                var estrela4 = jogosPlayStation3[i].estrelas >= 4 ? "estrela-ativa" : "";
                var estrela5 = jogosPlayStation3[i].estrelas >= 5 ? "estrela-ativa" : "";

                html += '<div class="base-card-conteudo com-borda vinho"><a href="jogo.html?' + jogosPlayStation3[i].id + '&ps3"><div class="bloco-conteudo"><div class="background"><img src="imagens/ps3/' + jogosPlayStation3[i].imagem +'"></div><div class="conteudo"><div class="categoria">' + jogosPlayStation3[i].genero +'</div><div class="titulo">' + jogosPlayStation3[i].nome + '</div><div><div class="valor">R$' + jogosPlayStation3[i].preco + '</div><div class="avaliacao"><span class="base-estrela estrela ' + estrela1 +' "></span><span class="base-estrela estrela ' + estrela2 + '"></span><span class="base-estrela estrela ' + estrela3 + '"></span><span class="base-estrela estrela ' + estrela4 + '"></span><span class="base-estrela estrela ' + estrela5 + '"></span></div></div></div></div><div class="bloco-conteudo hover"><div class="conteudo"><div class="empresa">' + jogosPlayStation3[i].empresa + '</div></div></div></a></div>';
                if(aux % 3 == 0){
                    html += '</div>';
                }
            }
        }
        baseCard.innerHTML = html;
    }
}