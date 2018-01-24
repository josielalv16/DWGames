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

        var slideIndex = 1;
        mostrarFoto(slideIndex);

        

        
}

function plusDivs(n) {
            mostrarFoto(slideIndex += n);
        }

        function trocarFoto(n) {
            mostrarFoto(slideIndex = n);
        }

        //ERROOOOO NA LINHA 58, FAZENDO PAGINA DE JOGO.HTML DANDO ERROOOOOOO ARRUMAAAAAAAAAAAAAAAAAAAAAAAAA

function mostrarFoto(n) {
            var i;
            var x = document.getElementsByClassName("slide-jogo");
            console.log("XXXXXXXX" + x);
            var dots = document.getElementsByClassName("demo");
            if (n > x.length) {slideIndex = 1}
            if (n < 1) {slideIndex = x.length}
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" slide-jogo-opacity-off", "");
            }
            x[slideIndex-1].style.display = "block";
            dots[slideIndex-1].className += " slide-jogo-opacity-off";
        }

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
    }else if(url_atual.includes("playstation3")){
        var play3 = document.getElementById("playstation3");
        play3.style.borderBottom = '10px solid #A62C48';
        play3.style.color = '#A62C48';
        //Chama função no arquivo /scrips/ps3.js
        carregarTodosJogosPs3();
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