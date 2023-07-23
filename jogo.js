var largura= window.innerWidth, altura= window.innerHeight, contador=100, quantVida=3 //Define tempo área inicial, quantidade de tempo e quantidade de vidas
var velocidadeMosquito, nivel = location.search // Coleta nivel de velocidade passada pela url

    nivel = nivel.replace('?','') //Retira o ? da url

    if(nivel=='normal'){ // Define a velocidade que o mosquito irá aparecer
        velocidadeMosquito=1500
    }else if(nivel=='dificil'){
        velocidadeMosquito=1000
    }else{
        velocidadeMosquito=750
    }

    function setTamanho(){ // Define a área que o mosquito aparecerá de acordo com o tamanho da pagina 
        altura = window.innerHeight
        largura = window.innerWidth
    }

    var cronometro = setInterval(function(){ // Contador de tempo, começando a contar pelo número 100.
        contador--
        document.getElementById('tempo').innerHTML = contador

        if(contador<=0){ // Jogo ganho caso o contador chegue até 0
            clearInterval(cronometro) // Interrompe o contador
            clearInterval(iniciaJogo) // Interrompe a criação de novos mosquitos
            location.href="tela_vitoria.html" // Redireciona para a página de vitória
        }
    },1000)
    
    function mosquito(){

        if(document.getElementById('mosquito')){ //Remove o mosquito existente a cada execução da função, caso houver.
            document.getElementById('mosquito').remove()
            quantVida-- //Decresce a vida caso o mosquito não seja clicado antes de terminar o tempo
            console.log(quantVida)

            switch(quantVida){ //Muda a imagem de coração cheio por um vazio, caso o player perca vida.
                case 2:
                    document.getElementById('vida3').src="imagens/coracao_vazio.png"
                    break;
                case 1:
                    document.getElementById('vida2').src="imagens/coracao_vazio.png"
                    break;
                case 0: 
                    document.getElementById('vida1').src="imagens/coracao_vazio.png"
                    location.href="tela_gameover.html"
                    break;
            }
        }

        var mosquito = document.createElement("img")
        var body = document.body

        mosquito.src="imagens/mosquito.png"
        mosquito.className= tipoMosquito() + " " + ladoMosquito()
        mosquito.style.position="absolute"
        mosquito.id='mosquito'
        mosquito.onclick= function(){
            this.remove()
        }
        var posicaoY = Math.floor(Math.random()*altura) - 90 // Calcula posição do eixo Y que o mosquito irá aparecer 
        var posicaoX = Math.floor(Math.random()*largura) - 90 // Calcula posição do eixo X que o mosquito irá aparecer 

        posicaoY = posicaoY < 0 ? 0 : posicaoY //Verifica se os eixos não estão negativos
        posicaoX = posicaoX < 0 ? 0 : posicaoX  

        mosquito.style.top = posicaoY + "px" // Define posição que o mosquito irá surgir
        mosquito.style.left = posicaoX + "px"
        
        body.appendChild(mosquito) // Cria a tag <img> contendo mosquito
    }

    function tipoMosquito(){ //Retorna valores entre 1 e 3, definindo um dos 3 tipos de tamanho do mosquito.
        var tipo = Math.floor(Math.random()*3)+1
        return "mosquito"+tipo
    }

    function ladoMosquito(){ //Retorna valores 1 e 2, 1 mantém o lado para a esquerda e 2 vira o mosquito para a direita.
        var lado = Math.floor(Math.random()*2)+1
        return "lado" + lado
    }

    function telaInicial(){
        location.href="tela_inicio.html"
    }

    function telaJogo(dificuldade){
        if(dificuldade===''){
            alert("Selecione um nivel de dificuldade")
        }else{
            location.href="tela_jogo.html?" + dificuldade
        }
    }

   