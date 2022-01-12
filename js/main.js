// P2 - WDII, FBAUP 21/22
// Ana Isabel Teixeira, Eliana Rodrigues, Rita Faria



// CHECK JQUERY
$(function () {
	console.log("jQuery ready");
});






// VARIAVEIS GLOBAIS

//numero para cada projeto
let n = 0;

//numero para permitir varias notas
let number = 0;
number += 1;

//numero para permitir varias listas
let number2 = 0;
number2 += 1;

//numero para permitir varios desenhos
let doodlenumber = 0;
doodlenumber += 1;

//numero para permitir varios desenhos
let imgnumber = 0;
imgnumber += 1;








// IR PARA MAIN PAGE

$(document).on("click", mainPage);

function mainPage() {
	//botões aparecem
	setTimeout(function() {$(".view").fadeIn(400);}, 400);
	setTimeout(function() {$(".addProj").fadeIn(400);}, 400);
	setTimeout(function() {$(".nav").fadeIn(400);}, 400);
	
	//welcome desaparece
	$(".welcome").fadeOut(400);
	
	//se não houver projetos
	if (localStorage.getItem("projs") == null) {
		//mostrar mensagem inicial
		setTimeout(function() {$(".start").fadeIn(400);}, 400);
	}
	
}





// MUDAR VIEW MODE

$(".view").on("click", viewMode);

function viewMode() {
    //tirar mensagem tutorial
    $(".viewMsg").fadeOut(200);
	
	//trocar de modo
	$("#maincanvas").fadeToggle(300);
	$("#registos").fadeToggle(300);
	
	//trocar imagem do botão
	//se estiver em blob view
	if ($(".view").attr("src") == "img/blobview.png") {
		//passa para list view
		$(".view").attr("src", "img/listview.png");
		
		//desativar click nos blobs
		enabled = false;
		
	} 
	//se estiver em list view
	else if ($(".view").attr("src") == "img/listview.png") {
		//passa para blob view
		$(".view").attr("src", "img/blobview.png");
		
		//ativar click nos blobs
    	enabled = true;
	}

}


//se estiver em blob view
if ( $("#registos").css('display') == 'none' ) {
	//ativar click nos blobs
    enabled = true;
} 
//se estiver em list view
else if ( $("#maincanvas").css('display') == 'none' ) {
	//desativar click nos blobs
    enabled = false;
}





// ABRIR MENU NAVEGAÇÃO

$(".nav").on("click", openNav);

function openNav() {
	
	//se estiver aberto
	if ( $(".navMenu").attr("style") == "transform: translateX(0px)") {
			//fechar
			$(".navMenu").attr("style", "transform: translateX(500px)");
		
		} 
	//senão
	else {
			//abrir
			$(".navMenu").attr("style", "transform: translateX(0px)");
		}
		
}

//fechar nav quando se carrega em qualquer outra zona	
$("main").on("click", function() {
	$(".navMenu").attr("style", "transform: translateX(500px)");
});
			
			




//NAV ----> HOME
$("#home").on("click", function() {
	//fechar nav
	$(".navMenu").attr("style", "transform: translateX(500px)");
	
	//fechar tudo o que estiver aberto
	closeProj(); 
	cancelProj();
	closeAbout();
	
	//se estiver em blob view
	if ( $("#registos").css('display') == 'none' ) {
		//ativar click nos blobs
		enabled = true;
	} 
	//se estiver em list view
	else if ( $("#maincanvas").css('display') == 'none' ) {
		//desativar click nos blobs
		enabled = false;
	}
});




// NAV ----> NEW PROJECT
$("#newproj").on("click", function() {
	//abrir proj novo
	newProj(); 
	//limpar inputs
	clearInputs();
	
	//mudar cor do botão nav
	setTimeout(function() {$(".nav").attr("src", "img/nav-white.gif");}, 800);
	//mudar border da nav
	setTimeout(function() {$(".navMenu li").css("border", "solid 0.2rem white");}, 800);
	
	//fechar nav
	$(".navMenu").attr("style", "transform: translateX(500px)");
	
	//fechar outras paginas e desativar click nos blobs
	closeAbout();
	setTimeout( function() {closeProj(); closeAboutProj(); enabled = false;}, 1100);
	
});




// NAV ----> ABOUT
$("#about").on("click", function() {
	//abrir about
	setTimeout(function() {$(".about").css("transform", "translateX(0px)");}, 100);
	
	//mudar cor do botão nav
	setTimeout(function() {$(".nav").attr("src", "img/nav.gif");}, 800);
	//mudar border da nav
	setTimeout(function() {$(".navMenu li").css("border", "solid 0.2rem black");}, 800);
	
	//fechar nav
	$(".navMenu").attr("style", "transform: translateX(500px)");
	
	//fechar outras paginas e desativar click nos blobs
	setTimeout( function() {closeProj(); cancelProj(); closeAboutProj(); enabled = false;}, 1100);
	
});







// FECHAR ABOUT
$(".about > .closebtn").on("click", closeAbout);

function closeAbout() {
	//rodar botão X
	$(".about > .closebtn").addClass("rotated2");
	
	//fechar about
	setTimeout(function() {$(".about").css("transform", "translateX(-500px)");}, 100);
	
	//reiniciar posiçao do botão X
	setTimeout(function() {$(".about > .closebtn").removeClass("rotated2");}, 800);
	
	//se estiver em blob view
	if ( $("#registos").css('display') == 'none' ) {
		//ativar click nos blobs
		enabled = true;
	} 
	//se estiver em list view
	else if ( $("#maincanvas").css('display') == 'none' ) {
		//desativar click nos blobs
		enabled = false;
	}
}








// ADICIONAR NOVO PROJETO

$(".addProj").on("click", function() {newProj(); clearInputs();});

function newProj() {
	//rodar botão +
	$(".addProj").addClass("rotated");
	//reiniciar rotação botão X
	$(".overlay > .closebtn").removeClass("rotated2");
	
	//fechar nav caso esteja aberta
	$(".navMenu").attr("style", "transform: translateX(500px)");
	
	//mudar cor do botão nav
	setTimeout(function() {$(".nav").attr("src", "img/nav-white.gif");}, 800);
	//mudar border da nav
	setTimeout(function() {$(".navMenu li").css("border", "solid 0.2rem white");}, 800);
	
	//abrir pagina de novo proj
	setTimeout(function() {$(".overlay").css("transform", "translateX(0px)");}, 100);
	
	//desativar click nos blobs
  	enabled = false;
}



// CANCELAR NOVO PROJETO
$(".overlay > .closebtn").on("click", cancelProj);

function cancelProj() {
	//reiniciar rotação do botão +
	$(".addProj").removeClass("rotated");
	//rodar botão X
	$(".overlay > .closebtn").addClass("rotated2");
	
	//mudar cor do botão nav
	setTimeout(function() {$(".nav").attr("src", "img/nav.gif");}, 200);
	//mudar border da nav
	setTimeout(function() {$(".navMenu li").css("border", "solid 0.2rem black");}, 200);
	
	//fechar pagina
	setTimeout(function() {$(".overlay").css("transform", "translateX(-500px)");}, 100);
	
	//se estiver em blob view
	if ( $("#registos").css('display') == 'none' ) {
		//ativar click nos blobs
		enabled = true;
	} 
	//se estiver em list view
	else if ( $("#maincanvas").css('display') == 'none' ) {
		//desativar click nos blobs
		enabled = false;
	}
}


// CONFIRMAR NOVO PROJ
$(".overlay .confirm").on("click", addProj);

function addProj() {
	//reiniciar rotação do botao +
	$(".addProj").removeClass("rotated");
	
	//mudar cor do botão nav
	setTimeout(function() {$(".nav").attr("src", "img/nav.gif");}, 200);
	//mudar border da nav
	setTimeout(function() {$(".navMenu li").css("border", "solid 0.2rem black");}, 200);
	
	//fechar pagina
	setTimeout(function() {$(".overlay").css("transform", "translateX(-500px)");}, 100);
	
	
	
	//se for o primeiro projeto
	if (localStorage.getItem("projs") == null) {
		
		 //se estiver em list view
		 if ( $("#maincanvas").css('display') == 'none' ) {
				//passa para blob view
    			viewMode();
		 } 
		
		//mostrar mensagem tutorial de view mode
		setTimeout(function() {$(".viewMsg").fadeIn(400);}, 400);
			
		//quando se muda para list view
		$(".view").on("click", function first() {
			//mostrar mensagem tutorial de primeiro proj
			setTimeout(function() {$(".firstProj").fadeIn(400);}, 200);
			$(".view").off("click", first);
			
				//quando se abre/fecha primeiro projeto
				$(".openproj .closebtn").on("click", function firstproj() {
					// mostrar mensagem turtorial de editar proj
					setTimeout(function() {$(".editing").fadeIn(400);}, 400);	
					$(".openproj .closebtn").off("click", firstproj);
				});
			
			
		});
		
	}
	
	//se estiver em blob view
	if ( $("#registos").css('display') == 'none' ) {
		//ativar click nos blobs
		enabled = true;
	} 
	//se estiver em list view
	else if ( $("#maincanvas").css('display') == 'none' ) {
		//desativar click nos blobs
		enabled = false;
	}
}






// ESCONDER "SELECT" PLACEHOLDER DEPOIS DO PRIMEIRO CLICK
$(".newProj .type select").change(function() {
 $(this).find("option:first").hide();
});






// MUDAR TEMA

$(document).on("click", ".circle", function() {
	
	let color = $(this).attr("id");
	//associar background
	$(".overlay").css("background-color", `${color}`);
	
});

// associar circulo selecionado
$(document).on("click", ".circle", function() {
	
	if($(this).siblings().hasClass("selected")) {	
		$(this).siblings().removeClass("selected");	
	}
	
	if($(this).parent().next().children().hasClass("selected")) {	
		$(this).parent().next().children().removeClass("selected");	
	}
	
	if($(this).parent().prev().children().hasClass("selected")) {	
		$(this).parent().prev().children().removeClass("selected");	
	}
	
	$(this).addClass("selected");
});




// LIMPAR INPUTS

function clearInputs() {
	//limpar nome
	$(".overlay textarea").val("");
	//limpar tipo
	$(".overlay .type select").find("option:first").show();
	$(".overlay .type select").prop('selectedIndex', 0);
	//limpar deadline
	$(".overlay input[type=date]").val("");
	//limpar tema
	$(".overlay .circle").removeClass("selected");
	$(".overlay .purple").addClass("selected");
	$(".overlay").css("background-color", "var(--purple)");
}





// GUARDAR PROJETO NOVO

$(".overlay .confirm").on("click", saveForStorage);

function saveForStorage() {

  //lista
  let projs;
	
  //projeto novo
  let proj;

  //ler o conteúdo que o utilizador inseriu
  let name = $("textarea").val();
  let type = $(".type select").val();
  let deadline = $("#deadline").val();
  let theme = $(".selected").attr('id');
  let corsec;	
	
  //atribuir cor secundária correspondente ao tema
  switch (theme) {
		case "#5435D2":
			corsec = "#71D27A";
			break;
		case "#F04A4D":
			corsec = "#7BCCEE";
			break;
		case "#FFA800":
			corsec = "#F04A4D";
			break;
		case "#7BCCEE":
			corsec = "#F48C8E";
			break;
		case "#71D27A":
			corsec = "#FFA800";
			break;
		case "#F48C8E":
			corsec = "#5435D2";
			break;
	}
	

  //criar o objeto com os conteudos
	proj = {
		nome: name,
		tipo: type,
		data: deadline,
		tema: theme, 
		corsec: corsec,  
	};

	//console.log(proj);

	//se já existir
	if (localStorage.getItem("projs") != null) {
		//ler o local storage
		let JSONprojs = localStorage.getItem("projs");

		//transformar o string numa variável
		projs = JSON.parse(JSONprojs);
	}
	//senão
	else {
		//criar array vazio
		projs = [];  
	}

	//colocar proj novo no array
	projs.push(proj);
	//passar para string
	let JSONprojs = JSON.stringify(projs);

	//gravar storage
  	localStorage.setItem("projs", JSONprojs);
	
	//esconder mensagem inicial
	$(".start").hide();
	
	//mostrar projs
	displayAllPosts();
	
	//atualizar o canvas
    //setup();
	
    //refresh automatico
    //location.reload();
	
	console.log("refresh the page to see your new blob!");

	
	 
}




// MOSTRAR TODOS OS PROJETOS NO ECRÃ PRINCIPAL

function displayAllPosts() {
	
    //limpar tudo e acrescentar mensagens de tutorial
    $("#registos").html(`<div class="firstProj">
		<img src="img/arrow2.png" />
        <h2 class="message">tap to open your project</h2>
      </div>

      <div class="editing">
		<img src="img/arrow3.png" />
        <h2 class="message">tap here to edit your project</h2>
      </div>`);

    //ler o local storage
    let projs;
    let JSONprojs = localStorage.getItem("projs");
    projs = JSON.parse(JSONprojs);

	//se existirem projetos
	if ( localStorage.getItem("projs") != null ) {
		
		//criar article para cada um
		projs.forEach(function (proj) {
			  let el = $(`
					<article class="${proj.tema}">
						<img src="img/down-white.png">
						<ul>
						<li>${proj.nome}</li>
						<li>this is your <span>${proj.tipo}</span> project</li>
						<li>the deadline is <span>${proj.data}</span></li>
					</article>
			  `);

			  $("#registos").prepend(el);
			  $(el).css("background-color", `${proj.tema}`);	
		});
	  
	 } 
  }


displayAllPosts();




// ABRIR PÁGINA DE EDITAR PROJETO

$(document).on("click", "#registos img", function aboutProj(e) {
					
	//impedir bugs
	e.stopImmediatePropagation();

	//abrir pagina
	$(".aboutproj").css("transform", "translateX(0px)");

	//reiniciar rotaçao do botão X
	$(".aboutproj .closebtn").removeClass("rotated");

	//esconder mensagem tutorial
	$(".editing").fadeOut(1200);

	//mudar cor do botão nav
	setTimeout(function() {$(".nav").attr("src", "img/nav-white.gif");}, 300);
	//mudar border da nav
	setTimeout(function() {$(".navMenu li").css("border", "solid 0.2rem white");}, 300);

	//ir buscar posição no array
	n = $(this).parent().index();
	//console.log(n);

	//ir buscar storage
	let projs;
	let JSONprojs = localStorage.getItem("projs");
	projs = JSON.parse(JSONprojs);

	//passar titulo para caixa de texto editável
	$(".aboutproj textarea").val(`${projs[n].nome}`);

	//passar tipo para opção selecionada
	$(`.aboutproj .options option[value="${projs[n].tipo}"]`).prop('selected', true);

	//passar deadline para opção selecionada
	$(".aboutproj input").val(`${projs[n].data}`);

	//ir buscar cor
	let target = $("#registos article")[n];
	let color = $(target).attr("class");
	//atribuir background color
	$(".aboutproj").css("background-color", `${color}`);
	//selecionar tema atual do projeto
	$(".aboutproj .circle").removeClass("selected");			
	$(`${color}`).addClass("selected");


	//mudar tema
	$(document).on("click", ".aboutproj .circle", function () {

		let cor = $(this).attr("id");
		$(".aboutproj").css("background-color", `#${cor}`);

	});

	//mostrar tema selecionado
	$(document).on("click", ".aboutproj .circle", function () {

		if($(this).siblings().hasClass("selected")) {	
			$(this).siblings().removeClass("selected");	
		}

		if($(this).parent().next().children().hasClass("selected")) {	
			$(this).parent().next().children().removeClass("selected");	
		}

		if($(this).parent().prev().children().hasClass("selected")) {	
			$(this).parent().prev().children().removeClass("selected");	
		}

		$(this).addClass("selected");
	});					


	//esconder menu items no proj
	//se houver items
	if ( $(".addItem").css("display") == "none" ) {
		//deixar o + 
		setTimeout(function() {$(".itemMenu > ul").slideUp(600);}, 600);
	//se não houver items
	} else {
		//esconder o +
		setTimeout(function() {$(".itemMenu").slideUp(600);}, 600);
	}



					//GRAVAR MUDANÇAS

					$(".aboutproj .confirm").on("click", saveProj);

					function saveProj() {

						//ir buscar ao storage
						let storage = localStorage.getItem("projs");
						//transforma num array
						let projs = JSON.parse(storage);

						//ir buscar valores
						let nome = $(".aboutproj textarea").val();	
						let tipo = $(".aboutproj select").val();
						let data = $(".aboutproj input").val();
						let tema = $(".aboutproj .selected").attr('id');
						let corsec;

						switch (tema) {
							case "5435D2":
								corsec = "#71D27A";
								break;
							case "F04A4D":
								corsec = "#7BCCEE";
								break;
							case "FFA800":
								corsec = "#F04A4D";
								break;
							case "7BCCEE":
								corsec = "#F48C8E";
								break;
							case "71D27A":
								corsec = "#FFA800";
								break;
							case "F48C8E":
								corsec = "#5435D2";
								break;
						}

						//substituir no objeto
						projs[n].nome = `${nome}`;
						projs[n].tipo = `${tipo}`;
						projs[n].data = `${data}`;
						projs[n].tema = `#${tema}`;
						projs[n].corsec = `${corsec}`;

						//passar para string
						let JSONprojs = JSON.stringify(projs);

						//gravar
						localStorage.setItem("projs", JSONprojs);	

						//fechar pagina	
						closeAboutProj();

						//mudar na list view
						$(target).html(`<img src="img/down-white.png">
											<ul>
												<li>${projs[n].nome}</li>
												<li>this is your <span>${projs[n].tipo}</span> project</li>
												<li>the deadline is <span>${projs[n].data}</span></li>
											</ul>`);	

						//update da cor / classe
						$(target).css("background-color", `${projs[n].tema}`);
						$(target).attr("class", `${projs[n].tema}`);

						//update canvas	
						//setup();

						//update list view
						displayAllPosts();

						//refresh automatico
						//location.reload();
						
						console.log("refresh the page to see your changes!");

					}



					// APAGAR PROJETO
					$(document).on("click", ".deleteProj", function(ev) {

						//impedir bugs
						ev.stopImmediatePropagation();

						//ir buscar storage
						let storage = localStorage.getItem("projs");
						//transforma num array
						let projs = JSON.parse(storage);

						//apagar do registo
						delete projs.splice(n, 1);

						let JSONprojs = JSON.stringify(projs);

						//gravar
						localStorage.setItem("projs", JSONprojs);

						//storage atualizado
						storage = localStorage.getItem("projs");
						//se estiver vazio
						if (storage == "[]") {

							//apagar storage		
							localStorage.removeItem("projs");
							//mostrar mensagem de inicio
							setTimeout(function() {$(".start").fadeIn(400);}, 400);
						}

						//fechar pagina	
						closeAboutProj();

						//tirar mensagem tutorial
						$(".firstProj").fadeOut(200);

						//update canvas	
					    //setup();

						//update list view
						displayAllPosts();

						//refresh automatico
      					//location.reload();
						
						console.log("refresh the page to see your changes!");

					});

	});
			

									


// ABRIR PROJETO


$(document).on("click", "#registos article", function openProj(e) {
	
	//impedir bugs
	e.stopImmediatePropagation();
	
	//mudar cor do botão nav
	setTimeout(function() {$(".nav").attr("src", "img/nav-white.gif");}, 300);
	//mudar border da nav
	setTimeout(function() {$(".navMenu li").css("border", "solid 0.2rem white");}, 300);
	
	//tirar mensagem tutorial
    $(".firstProj").fadeOut(900);
	
	//abrir projeto
	$(".openproj").css("transform", "translateX(0px)");
	
	//reiniciar rotaçao do botão X
	$(".openproj .closebtn").removeClass("rotated");
	
	//atribuir cor do projeto selecionado
	let color = $(this).attr('class');
	$(".openproj").css("background-color", `${color}`);
	
	//ir buscar posição no array
	n = $(this).index();
	//console.log(n);
	
	//ir buscar storage
	let projs;
    let JSONprojs = localStorage.getItem("projs");
    projs = JSON.parse(JSONprojs);
	
	//apresentar dados do projeto selecionado
	$(".title").html(`${projs[n].nome}`);
	$(".tipo").html(`this is your <span>${projs[n].tipo}</span> project`);
	$(".data").html(`the deadline is <span>${projs[n].data}</span>`);
	
	//mostrar items do proj selecionado
	$(`.${n}`).show();
	
		
	



          //MENU ADICIONAR ITEM

          $(".addItem").on("click", itemMenuFirst);

          $(".addMore").on("click", itemMenu);

          //adicionar primeiro item
          function itemMenuFirst() {
              $(".itemMenu").slideDown(800);
              $(".itemMenu > ul").slideDown(800);
          }

          //adicionar item quando já existem outros
          function itemMenu() {
              $(".addMore").addClass("rotated");
              $(".itemMenu > ul").slideDown(800);
          }






          // ADICIONAR STICKY NOTE
          $("#note").on("click", addNote);

          function addNote() {

              //ir para topo da pagina
              document.getElementById('openproj').scrollTop = 0;
              //desligar scroll
              setTimeout(function() {$(".openproj").css("overflow-x", "visible");}, 200);

              let storage = localStorage.getItem("projs");
              let projs = JSON.parse(storage);

              //mostrar pagina de escrever
              $(".note").css("background-color", `${projs[n].corsec}`);
              $(".note").show();
              setTimeout(function() {$(".note").css("transform", "translateY(0px)");}, 100);

              //limpar texto anterior
              $(".note textarea").val('');

          }

	
					// SAVE NOTE
					$(".note > .save").on("click", saveNote);

					function saveNote(event) {

						//impedir bugs
						event.stopImmediatePropagation();


						//se já houver notas
						if ( $(".items").children(".sticky").length > 0 ) {
								//ir buscar ultimo numero utilizado
								number = $(".sticky:last").attr("id");
								//passar de string para numero
								number = parseInt(number, 10);
						}

						//aumentar numero quando se cria nota nova
						number += 1;

						//ir buscar texto escrito e trocar newlines por <br>
						let text = $(".note textarea").val().replace(/\n/g, "<br />");
						//criar novo sticky note
						let note = `<div class="sticky ${n}" id="${number}"><img class="deleteNote" src="img/x-white.png"><img class="edit" src="img/down-white.png"> <p>${text}</p></div>`;



								// GRAVAR NO STORAGE
								//ir buscar ao storage
								let storage = localStorage.getItem("projs");
								//transforma numa variável
								let projs = JSON.parse(storage);
								//criar novo item no objeto
								projs[n][`nota${number}`] = `${text}`;

								let JSONprojs = JSON.stringify(projs);

								//gravar
								localStorage.setItem("projs", JSONprojs);


						//ir para topo da pagina
						document.getElementById('openproj').scrollTop = 0;
						//voltar a ligar scroll
						setTimeout(function() {$(".openproj").css("overflow-x", "hidden");}, 300);

						//reiniciar rotação do botão +
						$(".addMore").removeClass("rotated");

						//fechar pagina de escrever
						setTimeout(function() {$(".note").css("transform", "translateY(3000px)");}, 100);
						//esconder pagina de escrever para não aparecer no scroll
						setTimeout(function() {$(".note").hide();}, 800);


						//mostrar na pagina do projeto
						$(".items").append(note);
						$(`.${n}`).show();      
						$(`.sticky.${n}`).css("background-color", `${projs[n].corsec}`);

						//esconder menu de items
						setTimeout(function() {$(".addItem").hide();}, 100);
						$(".itemMenu > ul").slideUp(100);
					}

	
	
					// CANCEL NOTE
					$(".note > .closebtn").on("click", cancelNote);
					
					function cancelNote() {
						
						//reiniciar rotação do botão +
						$(".addMore").removeClass("rotated");

						//ir para topo da pagina
						document.getElementById('openproj').scrollTop = 0;
						//voltar a ligar scroll
						setTimeout(function() {$(".openproj").css("overflow-x", "hidden");}, 300);

						//fechar pagina de nota
						setTimeout(function() {$(".note").css("transform", "translateY(3000px)");}, 100);
						setTimeout(function() {$(".note").hide();}, 800);
						
						//se houver items...
						if ( $(`.${n}`).length > 0) {	
							//esconder botão inicial
							$(".addItem").hide();
							$(".itemMenu").show();
							$(".itemMenu > ul").hide();

						} else {
							//mostrar botão inicial
							$(".addItem").show();
							$(".itemMenu").hide();
						}

					}
	
	
	
					//DELETE NOTE
					$(document).on("click", ".deleteNote", function() {

						//ir buscar numero da nota
						let selected = $(this).parent().attr("id");

						//ir buscar storage
						let storage = localStorage.getItem("projs");
						//transforma numa variável
						let projs = JSON.parse(storage);

						//apagar do registo
						delete projs[n][`nota${selected}`];

						let JSONprojs = JSON.stringify(projs);

						//gravar
						localStorage.setItem("projs", JSONprojs);

						//fazer slideup da nota
						let deletedNote = $(this).parent();
						$(deletedNote).slideUp();
						//apagar
						setTimeout(function() { $(deletedNote).remove() }, 500);

					});
	
	
	
	
					// EDIT NOTE
					$(document).on("click", ".edit", function editNote() {

						//ir buscar nota e texto selecionados
						let currentNote = $(this).next("p");
						//trocar <br> por newline    ----- https://stackoverflow.com/questions/8062399/how-to-replace-an-html-br-with-newline-character-n
						let currentText = $(this).next("p").html().replace(/<br\s*\/?>/mg,"\n");
						//ir buscar numero da nota atual
						let currentNumber = $(this).parent().attr("id");	

						//console.log(currentNumber);

						//ir para topo da pagina
						document.getElementById('openproj').scrollTop = 0;
						//desligar scroll
						setTimeout(function() {$(".openproj").css("overflow-x", "visible");}, 200);

						//mostrar texto da nota
						$(".note textarea").val(currentText);

						let storage = localStorage.getItem("projs");
						let projs = JSON.parse(storage);
						
						//mostrar pagina de escrever com cor secundaria do tema
						$(".note").css("background-color", `${projs[n].corsec}`);
						$(".note").show();
						setTimeout(function() {$(".note").css("transform", "translateY(0px)");}, 100);		

								//desligar botão de gravar nota
								$(".note > .save").off( "click", saveNote);
								//ligar botão de gravar mudança
								$(".note > .save").on("click", saveChange);


								//GRAVAR MUDANÇA
								function saveChange() {	

									//ir para topo da pagina
									document.getElementById('openproj').scrollTop = 0;
									//voltar a ligar scroll
									setTimeout(function() {$(".openproj").css("overflow-x", "hidden");}, 300);

									//reiniciar rotação do botão +
									$(".addMore").removeClass("rotated");

									//fechar pagina de escrever
									setTimeout(function() {$(".note").css("transform", "translateY(3000px)");}, 100);
									setTimeout(function() {$(".note").hide();}, 800);

									//ir buscar novo texto e trocar newlines por <br>
									let text = $(".note textarea").val().replace(/\n/g, "<br />");
									//substituir texto antigo
									$(currentNote).html(`${text}`);


											// GRAVAR NO STORAGE
											//ir buscar ao storage
											let storage = localStorage.getItem("projs");
											//transforma numa variável
											let projs = JSON.parse(storage);
											//substituir conteudo
											projs[n][`nota${currentNumber}`] = `${text}`;

											let JSONprojs = JSON.stringify(projs);

											//gravar
											localStorage.setItem("projs", JSONprojs);




									//esconder menu de items
									setTimeout(function() {$(".addItem").hide();}, 100);
									$(".itemMenu > ul").slideUp(100);

									//voltar a ligar botão de gravar nota
									$(".note > .save").on("click", saveNote);
									//desligar botão de gravar mudança
									$(".note > .save").off( "click", saveChange);

									}



									// CANCELAR MUDANÇA
									$(".note > .closebtn").on("click", cancelNoteChange);

									function cancelNoteChange() {

										//voltar a ligar botão de gravar nota
										$(".note > .save").on("click", saveNote);
										//desligar botão de gravar mudança
										$(".note > .save").off( "click", saveChange);


									}


					});
	
	
		

		
	
	
	
          // ADICIONAR TO DO LIST
          $("#list").on("click", addList);

          function addList() {

            //ir para topo da pagina
            document.getElementById('openproj').scrollTop = 0;
            //desligar scroll
            setTimeout(function() {$(".openproj").css("overflow-x", "visible");}, 200);

            //mudar cor do botão nav
            setTimeout(function() {$(".nav").attr("src", "img/nav.gif");}, 500);
            //mudar border da nav
            setTimeout(function() {$(".navMenu li").css("border", "solid 0.2rem black");}, 500);

            //apagar titulo anterior e fazer reset tamanho da textarea
            $(".listTitle").val("");
            $(".listTitle").css("height", "35px");
            //apagar texto anterior 
            $(".list ul").empty();
			  
            //colocar elementos base
            $(".list ul").append(`<div class="check"></div><li><textarea class="task" placeholder="your first item"></textarea></li>`);
            $(".list ul").append(`<img class="addLi" src="img/plus.png">`);

            //mostrar pagina de lista
            $(".list").show();
            setTimeout(function() {$(".list").css("transform", "translateY(0px)");}, 100);


            // AUMENTAR CAIXA DE TEXTO À MEDIDA QUE SE ESCREVE  ------> https://stackoverflow.com/questions/4954252/css-textarea-that-expands-as-you-type-text	
            $(document).on('paste input', ".listTitle, .task", function () {
                var $el = $(this),
                    offset = $el.innerHeight() - $el.height();

                if ($el.innerHeight() < this.scrollHeight) {
                  // Grow the field if scroll height is smaller
                  $el.height(this.scrollHeight - offset);
                } else {
                  // Shrink the field and then re-set it to the scroll height in case it needs to shrink
                  $el.height(1);
                  $el.height(this.scrollHeight - offset);
                }
            });


            // CHECK/UNCHECK LINHA 
            $(document).off("click",".check");
            $(document).on("click", ".check", function () {

                // se já estiver checked, voltar para preto
                if ( $(this).hasClass("checked") ) {
                    $(this).css("border-color", "rgb(0,0,0)");
                    $(this).next("li").children("textarea").css("color", "rgb(0,0,0)");
                }

                //check circulo
                $(this).toggleClass("checked");
                //riscar texto
                $(this).next("li").children("textarea").toggleClass("crossed");


                let storage = localStorage.getItem("projs");
                let projs = JSON.parse(storage);
                //mudar para cor secundaria do projeto
                $(".checked").css("border-color", `${projs[n].corsec}`);
                $(".checked").css("outline-color", `${projs[n].corsec}`);
                $(".checked").next("li").children("textarea").css("color", `${projs[n].corsec}`);


            });


          }


						  // ADICIONAR NOVA TAREFA
						  $(document).on("click", ".addLi", addTask);

						  function addTask(e) {
							  //impedir bugs
							  e.stopImmediatePropagation();
							  //criar tarefa nova
							  let task = `<div class="check"></div><li><textarea class="task" placeholder="another item"></textarea></li>`;
							  //inserir antes do botão +
							  $(task).insertBefore(".addLi");
						  }



						  // APAGAR TAREFA COM BACKSPACE (QUANDO NÃO TEM TEXTO)
						  $(document).on("click", ".list li", function(){
							 //identificar tarefa com uma classe	
							 $(this).siblings("li").removeClass("delete")	
							 $(this).addClass('delete');
							 $(this).focus();
						  });

						  $(document).on('keydown', function(e){
							  //se carregar no backspace e se não tiver texto
							  if(e.keyCode === 8 && $.trim($("li.delete textarea").val()) == "" ){
								  //apagar tarefa
								  $('li.delete').prev("div").remove();
								  $('li.delete').remove();
							  }
						  });			

	
	
					// SAVE LIST
					$(".list > .save").on("click", saveList);

					function saveList(event) {

						//impedir bugs
						event.stopImmediatePropagation();

						//se já houver listas
						if ( $(".items").children(".toDo").length > 0 ) {
							//ir buscar ultimo numero utilizado
							number2 = $(".toDo:last").attr("id");
							//passar de string para numero
							number2 = parseInt(number2, 10);
						}

						//aumentar numero quando se cria lista nova
						number2 += 1;

						//ir buscar titulo e trocar newlines por <br>
						let title = $(".listTitle").val().replace(/\n/g, "<br />");

						//passar input de cada textarea para um <li> e colocar dentro de um <ul>
						let output = '<ul>';

						$('.task').each(function(){

							//ir buscar conteudo e trocar newlines por breaks
							let conteudo = $(this).val().replace(/\n/g, "<br />");

							//se tiver conteduo
							if ( conteudo != "" ) {

								//passar para <li>
								output += `${$(this).parent("li").prev("div").get(0).outerHTML} <li>${conteudo}</li>`;

							}

						});

						output += '</ul>';

						//criar elemento
						let list = `<div class="toDo ${n}" id="${number2}"><img class="deleteList" src="img/x.png"><img class="editList" src="img/down.png"> <h2>${title}</h2> ${output} </div>`;

						//acrescentar na pagina do projeto
						$(".items").append(list);

						//para cada linha
						$('.toDo div').each(function(){

							//se estiver checked, risca o texto e muda para a cor secundaria
							if ( $(this).hasClass("checked") ) {
								$(this).next("li").toggleClass("crossed");

								let storage = localStorage.getItem("projs");
								let projs = JSON.parse(storage);
								$(this).next("li").css("color", `${projs[n].corsec}`);
							}
						});

						//desligar botão de check
						$(document).off("click",".check");

						//apagar botão de acrescentar nova tarefa
						$(`.${n} .addLi`).remove();

						//mostrar lista
						$(`.${n}`).show(); 


						//ir buscar html da lista completa
						let lista = $(`div#${number2}.toDo`).html();


								// GRAVAR NO STORAGE
								//ir buscar ao storage
								let storage = localStorage.getItem("projs");
								//transforma numa variável
								let projs = JSON.parse(storage);
								//criar novo item no objeto
								projs[n][`lista${number2}`] = `${lista}`;

								let JSONprojs = JSON.stringify(projs);

								//gravar
								localStorage.setItem("projs", JSONprojs);


						//ir para topo da pagina
						document.getElementById('openproj').scrollTop = 0;
						//voltar a ligar scroll
						setTimeout(function() {$(".openproj").css("overflow-x", "hidden");}, 300);

						//reiniciar rotação do botão +
						$(".addMore").removeClass("rotated");

						//mudar cor do botão nav
						setTimeout(function() {$(".nav").attr("src", "img/nav-white.gif");}, 300);
						//mudar border da nav
						setTimeout(function() {$(".navMenu li").css("border", "solid 0.2rem white");}, 300);

						//fechar pagina de lista
						setTimeout(function() {$(".list").css("transform", "translateY(3000px)");}, 100);
						setTimeout(function() {$(".list").hide();}, 800);

						//esconder menu de items
						setTimeout(function() {$(".addItem").hide();}, 100);
						$(".itemMenu > ul").slideUp(100);	

					}
	
	
	
					// CANCEL LIST
					$(".list > .closebtn").on("click", cancelList);

					function cancelList() {

						//reiniciar rotação do botão +
						$(".addMore").removeClass("rotated");

						//ir para topo da pagina
						document.getElementById('openproj').scrollTop = 0;
						//voltar a ligar scroll
						setTimeout(function() {$(".openproj").css("overflow-x", "hidden");}, 300);

						//mudar cor do botão nav
						setTimeout(function() {$(".nav").attr("src", "img/nav-white.gif");}, 300);
						//mudar border da nav
						setTimeout(function() {$(".navMenu li").css("border", "solid 0.2rem white");}, 300);

						//fechar pagina de lista
						setTimeout(function() {$(".list").css("transform", "translateY(3000px)");}, 100);
						setTimeout(function() {$(".list").hide();}, 800);

						//desligar botão de check
						$(document).off("click",".check");			

							//se houver items...
							if ( $(`.${n}`).length > 0) {	
								//esconder botão inicial
								$(".addItem").hide();
								$(".itemMenu").show();
								$(".itemMenu > ul").hide();

							} else {
								//mostrar botão inicial
								$(".addItem").show();
								$(".itemMenu").hide();
							}
					}

	
	
					// DELETE LIST
					$(document).on("click", ".deleteList", function() {

						//ir buscar numero da lista
						let selected = $(this).parent().attr("id");

						//ir buscar storage
						let storage = localStorage.getItem("projs");
						//transforma numa variável
						let projs = JSON.parse(storage);

						//apagar do registo
						delete projs[n][`lista${selected}`];

						let JSONprojs = JSON.stringify(projs);

						//gravar
						localStorage.setItem("projs", JSONprojs);

						//fazer slideup da lista
						let deletedList = $(this).parent();
						$(deletedList).slideUp();
						//apagar
						setTimeout(function() { $(deletedList).remove() }, 500);

					});
	

	
					// EDIT LIST
					$(document).on("click", ".editList", function editList() {

						// CHECK/UNCHECK ITEM
						$(document).off("click",".check");
						$(document).on("click", ".check", function () {

							//se já estiver checked, voltar para preto
							if ( $(this).hasClass("checked") ) {
								$(this).css("border-color", "rgb(0,0,0)");
								$(this).next("li").children("textarea").css("color", "rgb(0,0,0)");
							}

							//check circulo
							$(this).toggleClass("checked");
							//riscar texto
							$(this).next("li").children("textarea").toggleClass("crossed");


							let storage = localStorage.getItem("projs");
							let projs = JSON.parse(storage);
							//mudar para cor secundaria do projeto
							$(".checked").css("border-color", `${projs[n].corsec}`);
							$(".checked").css("outline-color", `${projs[n].corsec}`);
							$(".checked").next("li").children("textarea").css("color", `${projs[n].corsec}`);

						});

						// ADICIONAR TAREFA
						$(document).off("click", ".addLi");
						$(document).on("click", ".addLi", addTask);

						function addTask(e) {
							//impedir bugs
							e.stopImmediatePropagation();
							//criar tarefa nova
							let task = `<div class="check"></div><li><textarea class="task" placeholder="another item"></textarea></li>`;
							//inserir antes do botão +
							$(task).insertBefore(".addLi");

						}

						// AUMENTAR À MEDIDA QUE SE ESCREVE
						$(document).on('paste input', ".listTitle, .task", function () {
							var $el = $(this),
								offset = $el.innerHeight() - $el.height();

							if ($el.innerHeight() < this.scrollHeight) {
							  // Grow the field if scroll height is smaller
							  $el.height(this.scrollHeight - offset);
							} else {
							  // Shrink the field and then re-set it to the scroll height in case it needs to shrink
							  $el.height(1);
							  $el.height(this.scrollHeight - offset);
							}
						});


						
						//ir buscar titulo atual e trocar <br> por newline
						let currentTitle = $(this).next("h2").html().replace(/<br\s*\/?>/mg,"\n");
						//ir buscar lista atual
						let currentList = $(this).parent("div");
						//ir buscar numero da lista atual
						let currentNumber = $(this).parent().attr("id");

						//ir buscar altura atual do titulo
						let titleHeight = $(this).next("h2").innerHeight();

						//atribuir titulo e altura da textarea
						$(".listTitle").val(currentTitle);
						$(".listTitle").css("height", `${titleHeight}`);

						//apagar texto anterior
						$(".list ul").empty();

						//para cada linha	
						$(`.toDo#${currentNumber} li`).each(function(){

							//ir buscar texto e trocar <br> por newline
							let sentence = $(this).html().replace(/<br\s*\/?>/mg,"\n");

							//ir buscar a altura da textarea
							let height = $(this).innerHeight();

							//passar html para val() das textareas	
							let task = `${$(this).prev("div").get(0).outerHTML} <li><textarea class="task" placeholder="your first item" style="height: ${height}px;">${sentence}</textarea></li>`;

							$(".list ul").append(task);

						});

						//para o check de cada linha
						$('.list ul div').each(function(){

							//se estiver checked, risca o texto e muda para a cor secundaria
							if ( $(this).hasClass("checked") ) {
								$(this).next("li").children("textarea").toggleClass("crossed");

								let storage = localStorage.getItem("projs");
								let projs = JSON.parse(storage);
								$(this).next("li").children("textarea").css("color", `${projs[n].corsec}`);
							}
						});

						//inserir botão de adicionar mais tarefas
						$(".list ul").append(`<img class="addLi" src="img/plus.png">`);

						//ir para topo da pagina
						document.getElementById('openproj').scrollTop = 0;
						//desligar scroll
						setTimeout(function() {$(".openproj").css("overflow-x", "visible");}, 200);

						//mudar cor do botão nav
						setTimeout(function() {$(".nav").attr("src", "img/nav.gif");}, 500);
						//mudar border da nav
						setTimeout(function() {$(".navMenu li").css("border", "solid 0.2rem black");}, 500);

						//mostrar pagina de escrever
						$(".list").show();
						setTimeout(function() {$(".list").css("transform", "translateY(0px)");}, 100);		

								//desligar botão de gravar nota
								$(".list > .save").off( "click", saveList);
								//ligar botão de gravar mudança
								$(".list > .save").on("click", saveListChange);


								// GRAVAR MUDANÇA
								function saveListChange() {	

									//ir para topo da pagina
									document.getElementById('openproj').scrollTop = 0;
									//voltar a ligar scroll
									setTimeout(function() {$(".openproj").css("overflow-x", "hidden");}, 300);

									//mudar cor do botão nav
									setTimeout(function() {$(".nav").attr("src", "img/nav-white.gif");}, 300);
									//mudar border da nav
									setTimeout(function() {$(".navMenu li").css("border", "solid 0.2rem white");}, 300);

									//reiniciar rotação do botão +
									$(".addMore").removeClass("rotated");

									//fechar pagina de escrever
									setTimeout(function() {$(".list").css("transform", "translateY(3000px)");}, 100);
									setTimeout(function() {$(".list").hide();}, 800);


									//ir buscar titulo e trocar newlines por <br>
									let newTitle = $(".listTitle").val().replace(/\n/g, "<br />");;

									//passar input de cada textarea para um <li> e colocar dentro de um <ul>
									let newOutput = '<ul>';

									$('.task').each(function(){

										//ir buscar conteudo e trocar newlines por <br>
										let newConteudo = $(this).val().replace(/\n/g, "<br />");

										//se tiver conteduo
										if ( newConteudo != "" ) {

											//passar para <li>
											newOutput += `${$(this).parent("li").prev("div").get(0).outerHTML} <li>${newConteudo}</li>`;

										}

									});

									newOutput += '</ul>';

									//criar elemento
									let newList = `<img class="deleteList" src="img/x.png"><img class="editList" src="img/down.png"> <h2>${newTitle}</h2> ${newOutput}`;

									//limpar lista antiga
									$(currentList).empty();
									//adicionar nova lista
									$(currentList).append(newList);

									//para o check de cada linha
									$('.toDo div').each(function(){

										//se estiver checked, risca o texto e muda para a cor secundaria
										if ( $(this).hasClass("checked") ) {
											$(this).next("li").toggleClass("crossed");

											let storage = localStorage.getItem("projs");
											let projs = JSON.parse(storage);
											$(this).next("li").css("color", `${projs[n].corsec}`);
										}
									});

									//desligar botão de check
									$(document).off("click",".check");

									//apagar botão de acrescentar nova tarefa
									$(`.${n} .addLi`).remove();

									//mostrar lista
									$(`.${n}`).show(); 


									//ir buscar html da lista completa
									let novaLista = $(`div#${currentNumber}.toDo`).html();	

											// GRAVAR NO STORAGE
											//ir buscar ao storage
											let storage = localStorage.getItem("projs");
											//transforma numa variável
											let projs = JSON.parse(storage);
											//substituir conteudo no objeto
											projs[n][`lista${currentNumber}`] = `${novaLista}`;

											let JSONprojs = JSON.stringify(projs);

											//gravar
											localStorage.setItem("projs", JSONprojs);




									//esconder menu de items
									setTimeout(function() {$(".addItem").hide();}, 100);
									$(".itemMenu > ul").slideUp(100);

									//voltar a ligar botão de gravar lista
									$(".list > .save").on("click", saveList);
									//desligar botão de gravar mudança
									$(".list > .save").off( "click", saveListChange);

									}	

						
						
								// CANCELAR MUDANÇA
								$(".list > .closebtn").on("click", cancelListChange);

								function cancelListChange() {

									//voltar a ligar botão de gravar lista
									$(".list > .save").on("click", saveList);
									//desligar botão de gravar mudança
									$(".list > .save").off( "click", saveListChange);

								}

					});
	
	
	
	


		  // ADICIONAR DOODLE 
          $("#doodle").on("click", addDoodle);

          function addDoodle() {
			  
			//ir para topo da pagina
            document.getElementById('openproj').scrollTop = 0;
			$(".doodle").css("background-image", "none");
            //desligar scroll
            setTimeout(function() {$(".openproj").css("overflow-x", "visible");}, 200);

            //mudar cor do botão nav
            setTimeout(function() {$(".nav").attr("src", "img/nav.gif");}, 500);
            //mudar border da nav
            setTimeout(function() {$(".navMenu li").css("border", "solid 0.2rem black");}, 500);
			  
			//abrir pagina de desenho
            $(".doodle").show();
			setTimeout(function () {$(".doodle").css("transform", "translateY(0px)");}, 100);
            setTimeout(function () {
              $("#doodlecanvas").fadeIn();
              $(".doodlebuttoncolor").fadeIn();
              $(".doodlebuttontool").fadeIn();
            },900);
			  
          }

	
	
                    //SAVE DOODLE
                    $(".doodle > .save").on("click", saveDoodle);

                    function saveDoodle(event) {
												
                        //impedir bugs
                        event.stopImmediatePropagation();

                        //se já houver desenhos
                          if ( $(".items").children(".desenho").length > 0 ) {
                              //ir buscar ultimo numero utilizado
                              doodlenumber = $(".desenho:last").attr("id");
                              //passar de string para numero
                              doodlenumber = parseInt(doodlenumber, 10);
                          }	

                        doodlenumber += 1;

                        //ir buscar desenho		
                        let canvas = document.getElementById("doodlecanvas");
                        let dataURL = canvas.toDataURL();


                        //criar elemento
                        let desenho = `<div class="desenho ${n}" id="${doodlenumber}"><img class="deleteDoodle" src="img/x.png"><img class="editDoodle" src="img/down.png"> <img src="${dataURL}" id="imagem"> </div>`;

                        //acrescentar na pagina do projeto
                        $(".items").append(desenho);
						//mostrar
                        $(`.${n}`).show();



                                  // GRAVAR NO STORAGE
                                  //ir buscar ao storage
                                  let storage = localStorage.getItem("projs");
                                  //transforma numa variável
                                  let projs = JSON.parse(storage);
                                  //criar novo item no objeto
                                  projs[n][`doodle${doodlenumber}`] = `${dataURL}`;

                                  let JSONprojs = JSON.stringify(projs);

                                  //gravar
                                  localStorage.setItem("projs", JSONprojs);




                        //ir para topo da pagina
                        document.getElementById('openproj').scrollTop = 0;
                        //voltar a ligar scroll
                        setTimeout(function() {$(".openproj").css("overflow-x", "hidden");}, 300);

                        //reiniciar rotação do botão +
                        $(".addMore").removeClass("rotated");

                        //mudar cor do botão nav
                        setTimeout(function() {$(".nav").attr("src", "img/nav-white.gif");}, 300);
                        //mudar border da nav
                        setTimeout(function() {$(".navMenu li").css("border", "solid 0.2rem white");}, 300);

                        //fechar pagina de desenho
                        setTimeout(function() {$(".doodle").css("transform", "translateY(3000px)"); $(".doodlebuttoncolor").hide(); $(".doodlebuttontool").hide(); $("#doodlecanvas").hide();}, 400);
                        setTimeout(function() {$(".doodle").hide();}, 600);

                        //esconder menu de items
                        setTimeout(function() {$(".addItem").hide();}, 100);
                        $(".itemMenu > ul").slideUp(100);	
                     
                      
                    }		

	

                    // CANCEL DOODLE
                    $(".doodle > .closebtn").on("click", cancelDoodle);

                    function cancelDoodle() {
                        //reiniciar rotação do botão +
                        $(".addMore").removeClass("rotated");

                        //ir para topo da pagina
                        document.getElementById('openproj').scrollTop = 0;
                        //voltar a ligar scroll
                        setTimeout(function() {$(".openproj").css("overflow-x", "hidden");}, 100);
                        //fechar pagina de nota
                        setTimeout(function() {$(".doodle").css("transform", "translateY(3000px)"); $(".doodlebuttoncolor").hide(); $(".doodlebuttontool").hide(); $("#doodlecanvas").hide();}, 400);
                        setTimeout(function() {$(".doodle").hide();}, 600);
                        // se houver items...
                        if ( $(`.${n}`).length > 0) {	
                            // esconder botão inicial
                            $(".addItem").hide();
                            $(".itemMenu").show();
                            $(".itemMenu > ul").hide();

                        } else {
                            // mostrar botão inicial
                            $(".addItem").show();
                            $(".itemMenu").hide();
                        }
                    }
	
	
	
					// DELETE DOODLE
					$(document).on("click", ".deleteDoodle", function() {

						//ir buscar numero do desenho
						let selected = $(this).parent().attr("id");

						//ir buscar storage
						let storage = localStorage.getItem("projs");
						//transforma numa variável
						let projs = JSON.parse(storage);

						//apagar do registo
						delete projs[n][`doodle${selected}`];

						let JSONprojs = JSON.stringify(projs);

						//gravar
						localStorage.setItem("projs", JSONprojs);

						//fazer slideup do desenho
						let deletedDoodle = $(this).parent();
						$(deletedDoodle).slideUp();
						//apagar
						setTimeout(function() { $(deletedDoodle).remove() }, 500);

					});
	
	
	
					// EDIT DOODLE
					$(document).on("click", ".editDoodle", function editDoodle() {
						
						//ir buscar desenho selecionado
						let currentDoodle = $(this).next("img").attr("src");

						//ir buscar numero do desenho atual
						let currentNumber = $(this).parent().attr("id");	

						//ir para topo da pagina
						document.getElementById('openproj').scrollTop = 0;
						//desligar scroll
						setTimeout(function() {$(".openproj").css("overflow-x", "visible");}, 200);

						//abrir pagina de desenho
						$(".doodle").show();
						setTimeout(function () {$(".doodle").css("transform", "translateY(0px)");}, 100);
						setTimeout(function () {
						  $("#doodlecanvas").fadeIn();
						  $(".doodlebuttoncolor").fadeIn();
						  $(".doodlebuttontool").fadeIn();
						},900);		

								//desligar botão de gravar desenho
								$(".doodle > .save").off( "click", saveDoodle);
								//ligar botão de gravar mudança
								$(".doodle > .save").on("click", saveDoodleChange);


								//GRAVAR MUDANÇA
								function saveDoodleChange() {	

									//ir para topo da pagina
									document.getElementById('openproj').scrollTop = 0;
									//voltar a ligar scroll
									setTimeout(function() {$(".openproj").css("overflow-x", "hidden");}, 300);

									//reiniciar rotação do botão +
									$(".addMore").removeClass("rotated");

									//fechar pagina de desenho
									setTimeout(function() {$(".doodle").css("transform", "translateY(3000px)"); $(".doodlebuttoncolor").hide(); $(".doodlebuttontool").hide(); $("#doodlecanvas").hide();}, 400);
									setTimeout(function() {$(".doodle").hide();}, 600);

									//ir buscar novo desenho
									let newcanvas = document.getElementById("doodlecanvas");
									let newdataURL = newcanvas.toDataURL();
									
									//substituir desenho antigo
									$(`#${currentNumber}.desenho`).children("#imagem").attr("src", `${newdataURL}`);
									


											// GRAVAR NO STORAGE
											//ir buscar ao storage
											let storage = localStorage.getItem("projs");
											//transforma numa variável
											let projs = JSON.parse(storage);
											//substituir conteudo
											projs[n][`doodle${currentNumber}`] = `${newdataURL}`;

											let JSONprojs = JSON.stringify(projs);

											//gravar
											localStorage.setItem("projs", JSONprojs);




									//esconder menu de items
									setTimeout(function() {$(".addItem").hide();}, 100);
									$(".itemMenu > ul").slideUp(100);

									//voltar a ligar botão de gravar desenho
									$(".doodle > .save").on("click", saveDoodle);
									//desligar botão de gravar mudança
									$(".doodle > .save").off( "click", saveDoodleChange);

									}



									// CANCELAR MUDANÇA
									$(".doodle > .closebtn").on("click", cancelDoodleChange);

									function cancelDoodleChange() {

										//voltar a ligar botão de gravar nota
										$(".doodle > .save").on("click", saveDoodle);
										//desligar botão de gravar mudança
										$(".doodle > .save").off( "click", saveDoodleChange);


									}


					});
	
	
	
	
	
	
	
          // ADICIONAR IMAGEM  ----> https://stackoverflow.com/questions/49710239/image-upload-and-display-without-page-refresh-jquery-mvc/49711942
          $("#image").on("click", addImage);

          function addImage(evt) {

              //impedir bugs
              evt.stopImmediatePropagation();
			  
			  //reiniciar rotação do botão +
			  $(".addMore").removeClass("rotated");

              //esconder menu de items
                              $(".addItem").hide();
                              $(".itemMenu").show();
                              $(".itemMenu > ul").hide();




              //se já houver imagens
                if ( $(".items").children(".upload").length > 0 ) {
                    //ir buscar ultimo numero utilizado
                    imgnumber = $(".upload:last").attr("id");
                    //passar de string para numero
                    imgnumber = parseInt(imgnumber, 10);
                }	

              imgnumber += 1;

              //criar elemento
              let newImg = `<div class="upload ${n}" id="${imgnumber}">
                                <img class="deleteImg" src="img/x.png">
                                <input type='file' class="imgInp" style="display:none" />
                                <img class="img" src="img/placeholder.png" alt="placeholder" width="100%">
                            </div>`;

              //mostrar na pagina
              $(".items").append(newImg);	
              $(".upload").slideDown(400);


                  //abrir input de selecionar imagem
                  $('.img').click(function() {
                      $(this).prev(".imgInp").click();
                      $(".img").off();
                  });

                  //preview the image
                  function readURL(input) {
                    if (input.files && input.files[0]) {
                      var reader = new FileReader();

                      reader.onload = function(e) {
                        $(`.upload#${imgnumber}`).children(".img").attr('src', e.target.result);

                                    // GRAVAR NO STORAGE
                                    //ir buscar ao storage
                                    let storage = localStorage.getItem("projs");
                                    //transforma numa variável
                                    let projs = JSON.parse(storage);
                                    //criar novo item no objeto
                                    projs[n][`imagem${imgnumber}`] = `${e.target.result}`;

                                    let JSONprojs = JSON.stringify(projs);

                                    //gravar
                                    localStorage.setItem("projs", JSONprojs);
                      }

                      reader.readAsDataURL(input.files[0]);
                    }
                  }

			      //carregar e mostrar
                  $(`.upload#${imgnumber}`).children(1).change(function() {
                      readURL(this);
                      $(this).off();
                  });





          }

	
					// DELETE IMAGE
					$(document).on("click", ".deleteImg", function() {

						//ir buscar numero da imagem
						let selected = $(this).parent().attr("id");

						//ir buscar storage
						let storage = localStorage.getItem("projs");
						//transforma numa variável
						let projs = JSON.parse(storage);

						//apagar do registo
						delete projs[n][`imagem${selected}`];

						let JSONprojs = JSON.stringify(projs);

						//gravar
						localStorage.setItem("projs", JSONprojs);

						//fazer slideup da imagem
						let deletedImg = $(this).parent();
						$(deletedImg).slideUp();
						//apagar
						setTimeout(function() { $(deletedImg).remove() }, 500);

					});
	
	
	
	
	
	
	
		
	
		
	
	    
	
	
	
          // FECHAR ITEMS QUANDO SE USA A NAV
          $("#home").on("click", function() {
              setTimeout( function() { cancelNote(); cancelList(); cancelDoodle()}, 1200);

              //se estiver em blob view
              if ( $("#registos").css('display') == 'none' ) {
                  //ativar click nos blobs
                  enabled = true;
              } 
              //se estiver em list view
              else if ( $("#maincanvas").css('display') == 'none' ) {
                  //desativar click nos blobs
                  enabled = false;
              }

              //mudar cor do botão nav
              setTimeout(function() {$(".nav").attr("src", "img/nav.gif");}, 1510);
              //mudar border da nav
              setTimeout(function() {$(".navMenu li").css("border", "solid 0.2rem black");}, 1510);
          });

          $("#about").on("click", function() {
			  
              setTimeout( function() { cancelNote(); cancelList(); cancelDoodle()}, 1200);

              //desativar click nos blobs
              enabled = false;

              //mudar cor do botão nav
              setTimeout(function() {$(".nav").attr("src", "img/nav.gif");}, 1510);
              //mudar border da nav
              setTimeout(function() {$(".navMenu li").css("border", "solid 0.2rem black");}, 1510);

          });

          $("#newproj").on("click", function() {
			  
              setTimeout( function() { cancelNote(); cancelList(); cancelDoodle()}, 1200);
              //desativar click nos blobs
              enabled = false;
          });
	

	
          // MOSTRAR ITEMS EXISTENTES DE CADA PROJ

          //ir buscar keys do objeto
          let keys = Object.keys(projs[n]);

          //filtrar os que são notas
          let result = keys.filter(item => item.includes("nota"));

          //filtrar os que são listas
          let result2 = keys.filter(item => item.includes("lista"));
	
		  //filtrar os que são desenhos
          let result3 = keys.filter(item => item.includes("doodle"));
	
		  //filtrar os que são imagens
          let result4 = keys.filter(item => item.includes("imagem"));


          ///para cada nota no registo, fazer um sticky note na pag do proj
          result.forEach(function (note) {

            //ir buscar numero da nota
            let number = note.slice(-1);

            //criar novo sticky note	
            let el = $(`<div class="sticky ${n}" id="${number}"><img class="deleteNote" src="img/x-white.png"><img class="edit" src="img/down-white.png"> <p>${projs[n][`nota${number}`]}</p></div>`);

            //acrescentar na pagina do proj
            $(".items").append(el);
            //mostrar
            $(`.sticky.${n}`).show();
            //dar cor secundaria do tema
            $(`.sticky.${n}`).css("background-color", `${projs[n].corsec}`);

          });


          //para cada lista no registo, fazer uma lista na pag do proj
          result2.forEach(function (list) {

            //ir buscar numero da lista
            let number2 = list.slice(-1);

            //ir buscar conteudo	
            let el = projs[n][`lista${number2}`];

            //criar nova lista
            let lista = `<div class="toDo ${n}" id="${number2}" style="display: block;">${el}</div>`;

			//acrescentar na pagina do proj
            $(".items").append(lista);
			//mostrar
            $(`.list.${n}`).show();

                      //para cada linha
                      $('.toDo div').each(function(){

                          //se estiver checked, risca o texto e muda para a cor secundaria
                          if ( $(this).hasClass("checked") ) {
                              let storage = localStorage.getItem("projs");
                              let projs = JSON.parse(storage);

                              $(this).css("border-color", `${projs[n].corsec}`);
                              $(this).css("outline-color", `${projs[n].corsec}`);
                              $(this).next("li").children("textarea").css("color", `${projs[n].corsec}`);
                              $(this).next("li").css("color", `${projs[n].corsec}`);
                          }
                      });

          });

		  
		  //para cada desenho no registo, fazer um doodle na pag do proj
          result3.forEach(function (doodle) {

            //ir buscar numero do desenho
            let number3 = doodle.slice(-1);

            //criar novo desenho	
            let el = $(`<div class="desenho ${n}" id="${number3}"><img class="deleteDoodle" src="img/x.png"><img class="editDoodle" src="img/down.png"> <img src="${projs[n][`doodle${number3}`]}" id="imagem"> </div>`);
			  

            //acrescentar na pagina do proj
            $(".items").append(el);
            //mostrar
            $(`.desenho.${n}`).show();

          });
	
	
		  //para cada imagem no registo, mostrar na pag do proj
          result4.forEach(function (image) {

            //ir buscar numero do desenho
            let number4 = image.slice(-1);

            //criar novo desenho	
            let el = $(`<div class="upload ${n}" id="${number4}">
							  <img class="deleteImg" src="img/x.png">
							  <input type='file' class="imgInp" style="display:none" />
							  <img class="img" src="${projs[n][`imagem${number4}`]}" alt="placeholder" width="100%">
						  </div>`);
			  
            //acrescentar na pagina do proj
            $(".items").append(el);
            //mostrar
            $(`.upload.${n}`).show();

          });

	

          //ao abrir projeto
          //se houver items...
          if ( $(`.${n}`).length > 0) {	
              //esconder botão inicial
              $(".addItem").hide();
              $(".itemMenu").show();
              $(".itemMenu > ul").hide();

          } else {
              //mostrar botão inicial
              $(".addItem").show();
              $(".itemMenu").hide();
          }	
	
	


});









	// FECHAR PÁGINA DE EDITAR PROJETO
	$(".aboutproj > .closebtn").on("click", closeAboutProj);

	function closeAboutProj() {

		//rodar botão X
		$(".aboutproj > .closebtn").addClass("rotated");

		//fechar projeto
		setTimeout(function() {$(".aboutproj").css("transform", "translateX(500px)");}, 100);	

	}





	// FECHAR PROJETO

	$(".openproj > .closebtn").on("click", function() {closeProj(); changeBlack();});
	
	function closeProj() {	
		
		//limpar notas
		setTimeout(function() {$(".sticky").remove();}, 800);
		//limpar listas
		setTimeout(function() {$(".toDo").remove();}, 800);
		//limpar desenhos
		setTimeout(function() {$(".desenho").remove();}, 800);
		//limpar imagens
		setTimeout(function() {$(".upload").remove();}, 800);
		
		//rodar botão X
		$(".openproj > .closebtn").addClass("rotated");
		
		//reiniciar rotação do botão +
		$(".addMore").removeClass("rotated");

		//fechar projeto
		setTimeout(function() {$(".openproj").css("transform", "translateX(500px)");}, 100);

		//esconder menu items
		//se houver items...
		if ( $(".addItem").css("display") == "none" ) {
			//deixar o + 
			setTimeout(function() {$(".itemMenu > ul").slideUp(600);}, 600);
		//se não houver items...
		} else {
			//esconder o +
			setTimeout(function() {$(".itemMenu").slideUp(600);}, 600);
		}
		
		//se estiver em blob view
		if ( $("#registos").css('display') == 'none' ) {
			// ativar click nos blobs
			enabled = true;
		} 
		//se estiver em list view
		else if ( $("#maincanvas").css('display') == 'none' ) {
			// desativar click nos blobs
			enabled = false;
		}
		

	}

	function changeBlack() {
		//mudar cor do botão nav
		setTimeout(function() {$(".nav").attr("src", "img/nav.gif");}, 500);

		//mudar border da nav
		setTimeout(function() {$(".navMenu li").css("border", "solid 0.2rem black");}, 500);
	}







	// RANDOM BACKGROUND COLOR ON PAGE LOAD - DESKTOP
	window.onload = function () {
	  let colors = [
		"#5435D2",
		"#F04A4D",
		"#FFA800",
		"#7BCCEE",
		"#71D27A",
		"#F48C8E",
	  ];
	  let new_color = colors[Math.floor(Math.random() * colors.length)];
	  $(".msg-parent").css("background-color", new_color);
	};
