# Projeto-CG
Universidade Federal de São Carlos - Sorocaba
Projeto para disciplina de Computação Gráfica

- Apresentação

	Durante o semestre da disciplina de Computação Gráfica foram abordados diversos temas, como: Texturas, Shaders, Objetos 3D e 2D, rotações e articulações destes mesmos objeto,  curva de bézier e detecção de colisão, entre outros temas. Afim de aplicar o conhecimento adquirido durante as aulas teóricas foi proposto a implementação de um sistema que mostrasse todos os temas vistos em aula.
	A ideia do grupo para apresentação dos tópicos e ambientação do sistema foi criar uma versão simplificada do jogo “Sonic” (um jogo clássico das versões antigas de videogames, como o Mega Drive). O objetivo do jogo é capturar os três argolas dourados usando os controles de salto e andar para frente. O jogo termina quando os três argolas são capturados.

- Descrição

	Para criar nossa versão simplificada do Sonic, escolhemos usar a biblioteca Three.js. Logo no início do projeto já nos deparamos com uma de nossas principais dificuldades: entender pelo menos as funções básicas da biblioteca. Para entender melhor como utilizá-la, recorremos à documentação e aos exemplos disponibilizados no site da biblioteca, ambos foram muito úteis. Também chegamos a um impasse ao descobrir que o navegador google chrome havia descontinuado a manutenção a linguagem java. Percebemos que as versões recém baixadas do navegador apresentaram diversos bugs ao abrir o jogo, enquanto outras versões do navegador abrem o jogo normalmente. Como o problema acontece de forma intermitente, resolvemos usar o Mozilla Firefox para executar o projeto. Outra dificuldade foi implementar a parte do shader pois não havíamos entendido direito como ele funciona, porém, com algumas pesquisas conseguimos entender e implementar.
	As tarefas do projeto foram igualmente divididas, como é possível conferir no nosso repositório do Github. Ainda que o projeto tenha sido dividido pelo grupo, por se tratar de um projeto mas próximo ao mercado de trabalho com um resultado que sempre podia ser monitorado a cada fase de entrega, o grupo implementou grande parte do trabalho juntos, seja na casa de um dos integrantes ou em momentos livres dentro da própria universidade, desta forma estamos sempre acompanhando e tentando entender o que o outro estava tentando fazer para assim ajudar de alguma forma.
	De maneira geral o jogo consiste em levar Sonic (o personagem azul) através de comando dados pelas setas do teclado, até as argolas; podemos, utilizando o botão esquerdo do mouse, mover a câmera tornando possível ver o cenário também ambientado em 3D.

- Manual

	O projeto pode ser aberto de duas formas distintas sendo uma delas amplamente mais rápida do que a outra, um delas é baixando a pasta completa do jogo para o computador e executando o arquivo index.html, a outra é executando o jogo sem baixar a pasta completa, acessando pelo link (https://guuhinfo.github.io/Projeto-CG/) diretamente do repositório do Github; a primeira forma é mais rápida, a segunda deverá levar alguns minutos para carregar tudo que é necessário, dependendo de sua conexão com a internet.


- Controles
	- Saltar
		- Pressione a seta para cima do teclado

	- Andar para frente
		- Pressiona a seta para direita do teclado

	- Movimentar a câmera
		- Clique com o botão esquerdo do mouse, segure e arraste para os lados

- Requisitos Mínimos Atendidos

	Nesta seção apresentamos todas as funcionalidades requisitadas e cada item do jogo que atende a cada uma delas.

	Foram requisitados dois objetos carregados de arquivos e cinco no total. Acabamos carregando cinco objetos de arquivos distintos, totalizando nove objetos para melhorar a jogabilidade e deixar o jogo com uma aparência mais agradável.
	
		- Dois objetos carregados de arquivos
			- Sonic
			- casa
			- três argolas
			- duas nuvens
			- pássaro
		- Cinco objetos no total
			- Sonic
			- duas nuvens
			- três argolas
			- sol
			- pássaro
			- casa

	Criamos o “sol” utilizando uma forma simples, a esfera, e aplicamos uma textura de larva e shader com cálculo de iluminação próprio para dar uma aparência mais interessante/realista.

		- Uma forma simples
			- sol
		- Textura em algum objeto simples
			- textura no sol
		- Shader próprio com cálculo de iluminação próprio (em shader próprio)
			- shader no sol

	Para dar interação e animação ao jogo, aplicamos um movimento de rotação nas argolas e no sol e criamos dois movimentos para o Sonic. Foram criadas duas curvas bézier, uma para fazer o Sonic andar para frente e outra para fazê-lo pular, e atrelamos esses movimentos as teclas “seta para direita” e “seta para cima”, respectivamente.

		- Dois movimentos distintos
			- anda para frente
			- pula
			- argolas e sol girando
		- Uma curva de bézier
			- curva para andar para frente
			- curva para o salto
		- Alguma iteração do usuário (teclado ou mouse)
			- seta para cima para pular
			- seta para a direita para andar para frente

	Também adicionamos outros objetos de cena, como duas nuvens com textura aplicada a elas e um pássaro com movimento articulado. Para melhor visualização do jogo, adicionamos interatividade do jogador com a câmera, que pode fazê-la mudar de posição clicando com o botão esquerdo do mouse e o arrastando horizontalmente.

		- Textura em algum modelo obj
			- textura nas nuvens
		- Duas posições distintas de câmeras
			- a posição da câmera pode ser alterada clicando com o botão esquerdo do mouse e arrastando para os lados
		- Um objeto articulado
			- pássaro
		- Uso movimento relativo
			- sonic pula
			- pássaro move as asas


- Extras

	Foram implementadas algumas funcionalidades adicionais, como por exemplo detecção de colisão, curva adicional, entre outros apresentados abaixo.

		- Oito objetos foram carregados de arquivos (apenas dois foram requisitados)
		- Dez objetos no total (apenas cinco foram requisitados)
		- Detecção de colisão (Sonic captura os argolas)
		- Uso de áudio (quando o Sonic captura as argolas)
		- Duas curvas bézier (apenas uma foi requisitada)
	
	Para implementações futuras seria possível adicionar movimentação relativa no Sonic para que quando ele andasse suas pernas simulasse passos, a fim de tornar um pouco mais realista; adicionar novas argolas e novas interações com o cenário, e talvez novos cenários.


# Projeto desenvolvido por:
[@isasalmeron](https://github.com/isasalmeron)

[@lucianesl](https://github.com/lucianesl)

[@guuhinfo](https://github.com/guuhinfo)
