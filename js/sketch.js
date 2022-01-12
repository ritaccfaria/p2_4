// P2 - WDII, FBAUP 21/22
// Ana Isabel Teixeira, Eliana Rodrigues, Rita Faria


// Instance mode (https://www.youtube.com/watch?v=Su792jEauZg&ab_channel=TheCodingTrain)
// MAIN BLOB SKETCH
let mainsketch = function (m) {
  m.bolas = [];
  m.drawShapes;

  m.x_off = 1000;
  m.y_off = 1000;
  m.z_off = 1000;
  m.vertices_amount = 100;
  m.px_offset;
  m.NOISE_SCALE = 200; // the higher the softer
  m.Z_SPEED = 0.002; // noise change per frame
  m.X_SPEED = 0;
  m.Y_SPEED = 0;
  m.MOUSE_FORCE = -2;

  // prepare dates for countdown
  m.currentDate = new Date();
  m.deadlineDate;

  // ativar ou desativar click nos blobs
  enabled = true;

  m.setup = function () {
    m.cnv = m.createCanvas(m.windowWidth, m.windowHeight);
    m.cnv.id("maincanvas");

    // check se há projetos guardados em local storage
    if (localStorage.getItem("projs") != null) {
      m.p5projs = localStorage.getItem("projs");
      m.p5projs = JSON.parse(m.p5projs);
      let JSONp5projs = JSON.stringify(m.p5projs);

      // loop dos projetos em local storage
      for (let i = 0; i < m.p5projs.length; i++) {
        // preparar deadline countdown: criar Date object com a deadline
        m.deadlineDate = new Date(m.p5projs[i].data);
        m.deadlineDate.getDay();
        m.currentDate.getDay();
        // calcular o número de milissegundos entre a data limite e a data atual
        m.ms = m.deadlineDate - m.currentDate;
        // calcular a partir do número de milissegundos o número de dias entre a data limite e a data atual
        m.daysUntil = m.int(m.ms / 86400000);
        // criar um range a partir do número de dias até à deadline para mais tarde aplicar o valor ao raio dos blobs (0 days left: 70px; 365 days left: 10px)
        m.deadlineBlob = m.int(m.map(m.daysUntil, 0, 365, 70, 10));

        // se a deadline for superior a um ano fixar o blob no seu tamanho mais pequeno
        if (m.daysUntil > 365) {
          m.deadlineBlob = 10;
        }

        // se a deadline for inferior a 0 dias fixar o blob no seu tamanho maior
        if (m.daysUntil < 0) {
          m.deadlineBlob = 70;
          console.log("pára de tentar quebrar o programa ;)");
        }

        let bola = {
          x: m.random(0.2 * m.width, m.width - 0.25 * m.width),
          y: m.random(0.2 * m.height, m.height - 0.2 * m.height),
          theme: m.p5projs[i].tema, // --> associar à cor dos projetos
          deadline: m.deadlineBlob, // --> associar à data dos projetos (raio dos blobs)
          name: m.p5projs[i].nome, // --> associar ao nome dos projetos
          corsec: m.p5projs[i].corsec, // --> associar à cor secundária dos projetos
        };

        // verifica se os blobs foram clicados (https://www.youtube.com/watch?v=DEHsr4XicN8)
        bola.clicked = function () {
          // calcula a distância entre o mouse e o blob
          m.d = m.dist(m.mouseX, m.mouseY, bola.x, bola.y);
          // se essa distância for menor que o raio do blob
          if (m.d < bola.deadline * 1.8) {
            // adicionar raio para margem de erro no click
            console.log("blob # " + [i] + " was clicked");
            openProjp5();
          }
        };

        //---------------------------------------------------------------------------------------------
        // CRIAR ITEMS A PARTIR DOS BLOBS (código copiado do main.js)
        // abrir projetos ao clicar nos blobs
        function openProjp5(e) {
          // impedir bugs --> isto não está a funcionar
          // e.stopImmediatePropagation();

          // VARIAVEIS GLOBAIS
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

          //ir para topo da pagina
          document.querySelector("#openproj").scrollTop = 0;

          // mudar cor do botão nav
          setTimeout(function () {
            $(".nav").attr("src", "img/nav-white.gif");
          }, 300);
          // mudar border da nav
          setTimeout(function () {
            $(".navMenu li").css("border", "solid 0.2rem white");
          }, 300);

          // abrir projeto
          $(".openproj").css("transform", "translateX(0px)");

          // reiniciar rotaçao do botão X
          $(".openproj .closebtn").removeClass("rotated");

          // atribuir cor do projeto selecionado
          $(".openproj").css("background-color", `${bola.theme}`);

          // apresentar dados do projeto selecionado
          $(".title").html(`${m.p5projs[i].nome}`);
          $(".tipo").html(
            `this is your <span>${m.p5projs[i].tipo}</span> project`
          );
          $(".data").html(`the deadline is <span>${m.p5projs[i].data}</span>`);

          // mostrar items do proj selecionado
          $(`.${i}`).show();

          // MENU ADICIONAR ITEM

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
            // ir para topo da pagina
            document.getElementById("openproj").scrollTop = 0;
            // desligar scroll
            setTimeout(function () {
              $(".openproj").css("overflow-x", "visible");
            }, 200);

            m.p5projs = localStorage.getItem("projs");
            m.p5projs = JSON.parse(m.p5projs);
            // mostrar pagina de escrever
            $(".note").css("background-color", `${m.p5projs[i].corsec}`);
            $(".note").show();
            setTimeout(function () {
              $(".note").css("transform", "translateY(0px)");
            }, 100);

            // limpar texto anterior
            $(".note textarea").val("");

            console.log(`${i}`);
          }

          // SAVE NOTE
          $(".note > .save").on("click", saveNote);

          function saveNote(event) {
            // impedir bugs
            event.stopImmediatePropagation();

            console.log(`saved ${i}`);

            // se já houver notas
            if ($(".items").children(".sticky").length > 0) {
              // ir buscar ultimo numero utilizado
              number = $(".sticky:last").attr("id");
              // passar de string para numero
              number = parseInt(number, 10);
            }

            // aumentar numero quando se cria nota nova
            number += 1;

            // ir buscar texto escrito e trocar newlines por <br>
            let text = $(".note textarea").val().replace(/\n/g, "<br />");
            // criar novo sticky note
            let note = `<div class="sticky ${i}" id="${number}"><img class="deleteNote" src="img/x-white.png"><img class="edit" src="img/down-white.png"> <p>${text}</p></div>`;

            // GRAVAR NO STORAGE
            // ir buscar ao storage
            m.p5projs = localStorage.getItem("projs");
            // transforma numa variável
            m.p5projs = JSON.parse(m.p5projs);

            // criar novo item no objeto
            m.p5projs[i][`nota${number}`] = `${text}`;

            let JSONp5projs = JSON.stringify(m.p5projs);
            // gravar
            localStorage.setItem("projs", JSONp5projs);

            // ir para topo da pagina
            document.getElementById("openproj").scrollTop = 0;
            // voltar a ligar scroll
            setTimeout(function () {
              $(".openproj").css("overflow-x", "hidden");
            }, 300);

            // reiniciar rotação do botão +
            $(".addMore").removeClass("rotated");

            // fechar pagina de escrever
            setTimeout(function () {
              $(".note").css("transform", "translateY(3000px)");
            }, 100);
            // esconder pagina de escrever para não aparecer no scroll
            setTimeout(function () {
              $(".note").hide();
            }, 800);

            // mostrar na pagina do projeto
            $(".items").append(note);
            $(`.${i}`).show();
            $(`.sticky.${i}`).css("background-color", `${m.p5projs[i].corsec}`);

            // esconder menu de items
            setTimeout(function () {
              $(".addItem").hide();
            }, 100);
            $(".itemMenu > ul").slideUp(100);
          }

          // CANCEL NOTE
          $(".note > .closebtn").on("click", cancelNote);

          function cancelNote() {
            // reiniciar rotação do botão +
            $(".addMore").removeClass("rotated");

            // ir para topo da pagina
            document.getElementById("openproj").scrollTop = 0;
            // voltar a ligar scroll
            setTimeout(function () {
              $(".openproj").css("overflow-x", "hidden");
            }, 300);

            // fechar pagina de nota
            setTimeout(function () {
              $(".note").css("transform", "translateY(3000px)");
            }, 100);
            setTimeout(function () {
              $(".note").hide();
            }, 800);

            // se houver items...
            if ($(`.${i}`).length > 0) {
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

          // DELETE NOTE
          $(document).on("click", ".deleteNote", function () {
            // ir buscar numero da nota
            let selected = $(this).parent().attr("id");

            // ir buscar ao storage
            m.p5projs = localStorage.getItem("projs");
            // transforma numa variável
            m.p5projs = JSON.parse(m.p5projs);

            // apagar do registo
            delete m.p5projs[i][`nota${selected}`];

            let JSONp5projs = JSON.stringify(m.p5projs);
            // gravar
            localStorage.setItem("projs", JSONp5projs);

            // fazer slideup da nota
            let deletedNote = $(this).parent();
            $(deletedNote).slideUp();
            // apagar
            setTimeout(function () {
              $(deletedNote).remove();
            }, 500);
          });

          // EDIT NOTE
          $(document).on("click", ".edit", function editNote() {
            // ir buscar nota e texto selecionados
            let currentNote = $(this).next("p");
            // trocar <br> por newline    ----- https://stackoverflow.com/questions/8062399/how-to-replace-an-html-br-with-newline-character-n
            let currentText = $(this)
              .next("p")
              .html()
              .replace(/<br\s*\/?>/gm, "\n");
            // ir buscar numero da nota atual
            let currentNumber = $(this).parent().attr("id");

            console.log(currentNumber);

            // ir para topo da pagina
            document.getElementById("openproj").scrollTop = 0;
            // desligar scroll
            setTimeout(function () {
              $(".openproj").css("overflow-x", "visible");
            }, 200);

            // mostrar texto da nota
            $(".note textarea").val(currentText);

            // ir buscar ao storage
            m.p5projs = localStorage.getItem("projs");
            // transforma numa variável
            m.p5projs = JSON.parse(m.p5projs);

            // mostrar pagina de escrever com cor secundaria do tema
            $(".note").css("background-color", `${m.p5projs[i].corsec}`);
            $(".note").show();
            setTimeout(function () {
              $(".note").css("transform", "translateY(0px)");
            }, 100);

            // desligar botão de gravar nota
            $(".note > .save").off("click", saveNote);
            // ligar botão de gravar mudança
            $(".note > .save").on("click", saveChange);

            // GRAVAR MUDANÇA
            function saveChange() {
              // ir para topo da pagina
              document.getElementById("openproj").scrollTop = 0;
              // voltar a ligar scroll
              setTimeout(function () {
                $(".openproj").css("overflow-x", "hidden");
              }, 300);

              // reiniciar rotação do botão +
              $(".addMore").removeClass("rotated");

              // fechar pagina de escrever
              setTimeout(function () {
                $(".note").css("transform", "translateY(3000px)");
              }, 100);
              setTimeout(function () {
                $(".note").hide();
              }, 800);

              // ir buscar novo texto e trocar newlines por <br>
              let text = $(".note textarea").val().replace(/\n/g, "<br />");
              // substituir texto antigo
              $(currentNote).html(`${text}`);

              // GRAVAR NO STORAGE
              // ir buscar ao storage
              m.p5projs = localStorage.getItem("projs");
              // transforma numa variável
              m.p5projs = JSON.parse(m.p5projs);
              // substituir conteudo
              m.p5projs[i][`nota${currentNumber}`] = `${text}`;

              let JSONp5projs = JSON.stringify(m.p5projs);
              // gravar
              localStorage.setItem("projs", JSONp5projs);

              // esconder menu de items
              setTimeout(function () {
                $(".addItem").hide();
              }, 100);
              $(".itemMenu > ul").slideUp(100);

              // voltar a ligar botão de gravar nota
              $(".note > .save").on("click", saveNote);
              // desligar botão de gravar mudança
              $(".note > .save").off("click", saveChange);
            }

            // CANCELAR MUDANÇA
            $(".note > .closebtn").on("click", cancelNoteChange);

            function cancelNoteChange() {
              // voltar a ligar botão de gravar nota
              $(".note > .save").on("click", saveNote);
              // desligar botão de gravar mudança
              $(".note > .save").off("click", saveChange);
            }
          });

          // ADICIONAR TO DO LIST
          $("#list").on("click", addList);

          function addList() {
            // ir para topo da pagina
            document.getElementById("openproj").scrollTop = 0;
            // desligar scroll
            setTimeout(function () {
              $(".openproj").css("overflow-x", "visible");
            }, 200);

            // mudar cor do botão nav
            setTimeout(function () {
              $(".nav").attr("src", "img/nav.gif");
            }, 500);
            // mudar border da nav
            setTimeout(function () {
              $(".navMenu li").css("border", "solid 0.2rem black");
            }, 500);

            // apagar titulo anterior e fazer reset tamanho da textarea
            $(".listTitle").val("");
            $(".listTitle").css("height", "35px");
            // apagar texto anterior
            $(".list ul").empty();

            // colocar elementos base
            $(".list ul").append(
              `<div class="check"></div><li><textarea class="task" placeholder="your first item"></textarea></li>`
            );
            $(".list ul").append(`<img class="addLi" src="img/plus.png">`);

            // mostrar pagina de lista
            $(".list").show();
            setTimeout(function () {
              $(".list").css("transform", "translateY(0px)");
            }, 100);

            // AUMENTAR CAIXA DE TEXTO À MEDIDA QUE SE ESCREVE  ------> https://stackoverflow.com/questions/4954252/css-textarea-that-expands-as-you-type-text
            $(document).on("paste input", ".listTitle, .task", function () {
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
            $(document).off("click", ".check");
            $(document).on("click", ".check", function () {
              // se já estiver checked, voltar para preto
              if ($(this).hasClass("checked")) {
                $(this).css("border-color", "rgb(0,0,0)");
                $(this)
                  .next("li")
                  .children("textarea")
                  .css("color", "rgb(0,0,0)");
              }

              // check circulo
              $(this).toggleClass("checked");
              // riscar texto
              $(this).next("li").children("textarea").toggleClass("crossed");

              m.p5projs = localStorage.getItem("projs");
              m.p5projs = JSON.parse(m.p5projs);
              // mudar para cor secundaria do projeto
              $(".checked").css("border-color", `${m.p5projs[i].corsec}`);
              $(".checked").css("outline-color", `${m.p5projs[i].corsec}`);
              $(".checked")
                .next("li")
                .children("textarea")
                .css("color", `${m.p5projs[i].corsec}`);
            });
          }

          // ADICIONAR NOVA TAREFA
          $(document).on("click", ".addLi", addTask);

          function addTask(e) {
            //impedir bugs
            e.stopImmediatePropagation();

            // criar tarefa nova
            let task = `<div class="check"></div><li><textarea class="task" placeholder="another item"></textarea></li>`;
            // inserir antes do botão +
            $(task).insertBefore(".addLi");
          }

          // APAGAR TAREFA COM BACKSPACE (QUANDO NÃO TEM TEXTO)
          $(document).on("click", ".list li", function () {
            // identificar tarefa com uma classe
            $(this).siblings("li").removeClass("delete");
            $(this).addClass("delete");
            $(this).focus();
          });

          $(document).on("keydown", function (e) {
            // se carregar no backspace e se não tiver texto
            if (
              e.keyCode === 8 &&
              $.trim($("li.delete textarea").val()) == ""
            ) {
              // apagar tarefa
              $("li.delete").prev("div").remove();
              $("li.delete").remove();
            }
          });

          // SAVE LIST
          $(".list > .save").on("click", saveList);

          function saveList(event) {
            // impedir bugs
            event.stopImmediatePropagation();

            // se já houver listas
            if ($(".items").children(".toDo").length > 0) {
              // ir buscar ultimo numero utilizado
              number2 = $(".toDo:last").attr("id");
              // passar de string para numero
              number2 = parseInt(number2, 10);
            }

            // aumentar numero quando se cria lista nova
            number2 += 1;

            // ir buscar titulo e trocar newlines por <br>
            let title = $(".listTitle").val().replace(/\n/g, "<br />");

            // passar input de cada textarea para um <li> e colocar dentro de um <ul>
            let output = "<ul>";

            $(".task").each(function () {
              // ir buscar conteudo e trocar newlines por breaks
              let conteudo = $(this).val().replace(/\n/g, "<br />");

              // se tiver conteduo
              if (conteudo != "") {
                // passar para <li>
                output += `${
                  $(this).parent("li").prev("div").get(0).outerHTML
                } <li>${conteudo}</li>`;
              }
            });
            output += "</ul>";

            // criar elemento
            let list = `<div class="toDo ${i}" id="${number2}"><img class="deleteList" src="img/x.png"><img class="editList" src="img/down.png"> <h2>${title}</h2> ${output} </div>`;

            // acrescentar na pagina do projeto
            $(".items").append(list);

            // para cada linha
            $(".toDo div").each(function () {
              // se estiver checked, risca o texto e muda para a cor secundaria
              if ($(this).hasClass("checked")) {
                $(this).next("li").toggleClass("crossed");

                m.p5projs = localStorage.getItem("projs");
                m.p5projs = JSON.parse(m.p5projs);
                $(this).next("li").css("color", `${m.p5projs[i].corsec}`);
              }
            });

            // desligar botão de check
            $(document).off("click", ".check");

            // apagar botão de acrescentar nova tarefa
            $(`.${i} .addLi`).remove();

            // mostrar lista
            $(`.${i}`).show();

            // ir buscar html da lista completa
            let lista = $(`div#${number2}.toDo`).html();

            // GRAVAR NO STORAGE
            // ir buscar ao storage
            m.p5projs = localStorage.getItem("projs");
            // transforma numa variável
            m.p5projs = JSON.parse(m.p5projs);
            // criar novo item no objeto
            m.p5projs[i][`lista${number2}`] = `${lista}`;

            let JSONp5projs = JSON.stringify(m.p5projs);
            // gravar
            localStorage.setItem("projs", JSONp5projs);

            // ir para topo da pagina
            document.getElementById("openproj").scrollTop = 0;
            // voltar a ligar scroll
            setTimeout(function () {
              $(".openproj").css("overflow-x", "hidden");
            }, 300);

            // reiniciar rotação do botão +
            $(".addMore").removeClass("rotated");

            // mudar cor do botão nav
            setTimeout(function () {
              $(".nav").attr("src", "img/nav-white.gif");
            }, 300);
            // mudar border da nav
            setTimeout(function () {
              $(".navMenu li").css("border", "solid 0.2rem white");
            }, 300);

            // fechar pagina de lista
            setTimeout(function () {
              $(".list").css("transform", "translateY(3000px)");
            }, 100);
            setTimeout(function () {
              $(".list").hide();
            }, 800);

            // esconder menu de items
            setTimeout(function () {
              $(".addItem").hide();
            }, 100);
            $(".itemMenu > ul").slideUp(100);
          }

          // CANCEL LIST
          $(".list > .closebtn").on("click", cancelList);

          function cancelList() {
            // reiniciar rotação do botão +
            $(".addMore").removeClass("rotated");

            // ir para topo da pagina
            document.getElementById("openproj").scrollTop = 0;
            // voltar a ligar scroll
            setTimeout(function () {
              $(".openproj").css("overflow-x", "hidden");
            }, 300);

            // mudar cor do botão nav
            setTimeout(function () {
              $(".nav").attr("src", "img/nav-white.gif");
            }, 300);
            // mudar border da nav
            setTimeout(function () {
              $(".navMenu li").css("border", "solid 0.2rem white");
            }, 300);

            // fechar pagina de lista
            setTimeout(function () {
              $(".list").css("transform", "translateY(3000px)");
            }, 100);
            setTimeout(function () {
              $(".list").hide();
            }, 800);

            // desligar botão de check
            $(document).off("click", ".check");

            // se houver items...
            if ($(`.${i}`).length > 0) {
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

          // DELETE LIST
          $(document).on("click", ".deleteList", function () {
            // ir buscar numero da lista
            let selected = $(this).parent().attr("id");

            // ir buscar ao storage
            m.p5projs = localStorage.getItem("projs");
            // transforma numa variável
            m.p5projs = JSON.parse(m.p5projs);

            // apagar do registo
            delete m.p5projs[i][`lista${selected}`];

            let JSONp5projs = JSON.stringify(m.p5projs);
            // gravar
            localStorage.setItem("projs", JSONp5projs);

            // fazer slideup da lista
            let deletedList = $(this).parent();
            $(deletedList).slideUp();
            // apagar
            setTimeout(function () {
              $(deletedList).remove();
            }, 500);
          });

          // EDIT LIST
          $(document).on("click", ".editList", function editList() {
            // CHECK/UNCHECK ITEM
            $(document).off("click", ".check");
            $(document).on("click", ".check", function () {
              // se já estiver checked, voltar para preto
              if ($(this).hasClass("checked")) {
                $(this).css("border-color", "rgb(0,0,0)");
                $(this)
                  .next("li")
                  .children("textarea")
                  .css("color", "rgb(0,0,0)");
              }

              // check circulo
              $(this).toggleClass("checked");
              // riscar texto
              $(this).next("li").children("textarea").toggleClass("crossed");

              m.p5projs = localStorage.getItem("projs");
              m.p5projs = JSON.parse(m.p5projs);
              // mudar para cor secundaria do projeto
              $(".checked").css("border-color", `${m.p5projs[i].corsec}`);
              $(".checked").css("outline-color", `${m.p5projs[i].corsec}`);
              $(".checked")
                .next("li")
                .children("textarea")
                .css("color", `${m.p5projs[i].corsec}`);
            });

            // ADICIONAR TAREFA
            $(document).off("click", ".addLi");
            $(document).on("click", ".addLi", addTask);

            function addTask(e) {
              // impedir bugs
              e.stopImmediatePropagation();

              // criar tarefa nova
              let task = `<div class="check"></div><li><textarea class="task" placeholder="another item"></textarea></li>`;
              // inserir antes do botão +
              $(task).insertBefore(".addLi");
            }

            // AUMENTAR À MEDIDA QUE SE ESCREVE
            $(document).on("paste input", ".listTitle, .task", function () {
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

            // ir buscar titulo atual e trocar <br> por newline
            let currentTitle = $(this)
              .next("h2")
              .html()
              .replace(/<br\s*\/?>/gm, "\n");
            // ir buscar lista atual
            let currentList = $(this).parent("div");
            // ir buscar numero da lista atual
            let currentNumber = $(this).parent().attr("id");

            // ir buscar altura atual do titulo
            let titleHeight = $(this).next("h2").innerHeight();

            // atribuir titulo e altura da textarea
            $(".listTitle").val(currentTitle);
            $(".listTitle").css("height", `${titleHeight}`);

            // apagar texto anterior
            $(".list ul").empty();

            // para cada linha
            $(`.toDo#${currentNumber} li`).each(function () {
              // ir buscar texto e trocar <br> por newline
              let sentence = $(this)
                .html()
                .replace(/<br\s*\/?>/gm, "\n");

              // ir buscar a altura da textarea
              let height = $(this).innerHeight();

              // passar html para val() das textareas
              let task = `${
                $(this).prev("div").get(0).outerHTML
              } <li><textarea class="task" placeholder="your first item" style="height: ${height}px;">${sentence}</textarea></li>`;

              $(".list ul").append(task);
            });

            // para o check de cada linha
            $(".list ul div").each(function () {
              // se estiver checked, risca o texto e muda para a cor secundaria
              if ($(this).hasClass("checked")) {
                $(this).next("li").children("textarea").toggleClass("crossed");

                m.p5projs = localStorage.getItem("projs");
                m.p5projs = JSON.parse(m.p5projs);
                $(this)
                  .next("li")
                  .children("textarea")
                  .css("color", `${m.p5projs[i].corsec}`);
              }
            });

            // inserir botão de adicionar mais tarefas
            $(".list ul").append(`<img class="addLi" src="img/plus.png">`);

            // ir para topo da pagina
            document.getElementById("openproj").scrollTop = 0;
            // desligar scroll
            setTimeout(function () {
              $(".openproj").css("overflow-x", "visible");
            }, 200);

            // mudar cor do botão nav
            setTimeout(function () {
              $(".nav").attr("src", "img/nav.gif");
            }, 500);
            // mudar border da nav
            setTimeout(function () {
              $(".navMenu li").css("border", "solid 0.2rem black");
            }, 500);

            // mostrar pagina de escrever
            $(".list").show();
            setTimeout(function () {
              $(".list").css("transform", "translateY(0px)");
            }, 100);

            // desligar botão de gravar nota
            $(".list > .save").off("click", saveList);
            // ligar botão de gravar mudança
            $(".list > .save").on("click", saveListChange);

            // GRAVAR MUDANÇA
            function saveListChange() {
              // ir para topo da pagina
              document.getElementById("openproj").scrollTop = 0;
              // voltar a ligar scroll
              setTimeout(function () {
                $(".openproj").css("overflow-x", "hidden");
              }, 300);

              // mudar cor do botão nav
              setTimeout(function () {
                $(".nav").attr("src", "img/nav-white.gif");
              }, 300);
              // mudar border da nav
              setTimeout(function () {
                $(".navMenu li").css("border", "solid 0.2rem white");
              }, 300);

              // reiniciar rotação do botão +
              $(".addMore").removeClass("rotated");

              // fechar pagina de escrever
              setTimeout(function () {
                $(".list").css("transform", "translateY(3000px)");
              }, 100);
              setTimeout(function () {
                $(".list").hide();
              }, 800);

              // ir buscar titulo e trocar newlines por <br>
              let newTitle = $(".listTitle").val().replace(/\n/g, "<br />");

              // passar input de cada textarea para um <li> e colocar dentro de um <ul>
              let newOutput = "<ul>";

              $(".task").each(function () {
                // ir buscar conteudo e trocar newlines por <br>
                let newConteudo = $(this).val().replace(/\n/g, "<br />");

                // se tiver conteduo
                if (newConteudo != "") {
                  // passar para <li>
                  newOutput += `${
                    $(this).parent("li").prev("div").get(0).outerHTML
                  } <li>${newConteudo}</li>`;
                }
              });

              newOutput += "</ul>";

              // criar elemento
              let newList = `<img class="deleteList" src="img/x.png"><img class="editList" src="img/down.png"> <h2>${newTitle}</h2> ${newOutput}`;

              // limpar lista antiga
              $(currentList).empty();
              // adicionar nova lista
              $(currentList).append(newList);

              // para o check de cada linha
              $(".toDo div").each(function () {
                // se estiver checked, risca o texto e muda para a cor secundaria
                if ($(this).hasClass("checked")) {
                  $(this).next("li").toggleClass("crossed");

                  m.p5projs = localStorage.getItem("projs");
                  m.p5projs = JSON.parse(m.p5projs);
                  $(this).next("li").css("color", `${m.p5projs[i].corsec}`);
                }
              });

              // desligar botão de check
              $(document).off("click", ".check");

              // apagar botão de acrescentar nova tarefa
              $(`.${i} .addLi`).remove();

              // mostrar lista
              $(`.${i}`).show();

              // ir buscar html da lista completa
              let novaLista = $(`div#${currentNumber}.toDo`).html();

              // GRAVAR NO STORAGE
              // ir buscar ao storage
              m.p5projs = localStorage.getItem("projs");
              // transforma numa variável
              m.p5projs = JSON.parse(m.p5projs);
              // substituir conteudo no objeto
              m.p5projs[i][`lista${currentNumber}`] = `${novaLista}`;

              let JSONp5projs = JSON.stringify(m.p5projs);
              // gravar
              localStorage.setItem("projs", JSONp5projs);

              // esconder menu de items
              setTimeout(function () {
                $(".addItem").hide();
              }, 100);
              $(".itemMenu > ul").slideUp(100);

              // voltar a ligar botão de gravar lista
              $(".list > .save").on("click", saveList);
              // desligar botão de gravar mudança
              $(".list > .save").off("click", saveListChange);
            }

            // CANCELAR MUDANÇA
            $(".list > .closebtn").on("click", cancelListChange);

            function cancelListChange() {
              // voltar a ligar botão de gravar lista
              $(".list > .save").on("click", saveList);
              // desligar botão de gravar mudança
              $(".list > .save").off("click", saveListChange);
            }
          });

          // ADICIONAR DOODLE
          $("#doodle").on("click", addDoodle);

          function addDoodle() {
            // ir para topo da pagina
            document.getElementById("openproj").scrollTop = 0;
            $(".doodle").css("background-image", "none");
            // desligar scroll
            setTimeout(function () {
              $(".openproj").css("overflow-x", "visible");
            }, 200);

            // mudar cor do botão nav
            setTimeout(function () {
              $(".nav").attr("src", "img/nav.gif");
            }, 500);
            // mudar border da nav
            setTimeout(function () {
              $(".navMenu li").css("border", "solid 0.2rem black");
            }, 500);

            // abrir pagina de desenho
            $(".doodle").show();
            setTimeout(function () {
              $(".doodle").css("transform", "translateY(0px)");
            }, 100);
            setTimeout(function () {
              $("#doodlecanvas").fadeIn();
              $(".doodlebuttoncolor").fadeIn();
              $(".doodlebuttontool").fadeIn();
            }, 900);
          }

          // SAVE DOODLE
          $(".doodle > .save").on("click", saveDoodle);

          function saveDoodle(event) {
            // impedir bugs
            event.stopImmediatePropagation();

            // se já houver desenhos
            if ($(".items").children(".desenho").length > 0) {
              // ir buscar ultimo numero utilizado
              doodlenumber = $(".desenho:last").attr("id");
              // passar de string para numero
              doodlenumber = parseInt(doodlenumber, 10);
            }

            doodlenumber += 1;

            // ir buscar desenho
            let canvas = document.getElementById("doodlecanvas");
            let dataURL = canvas.toDataURL();

            // criar elemento
            let desenho = `<div class="desenho ${i}" id="${doodlenumber}"><img class="deleteDoodle" src="img/x.png"><img class="editDoodle" src="img/down.png"> <img src="${dataURL}" id="imagem"> </div>`;

            // acrescentar na pagina do projeto
            $(".items").append(desenho);
            // mostrar
            $(`.${i}`).show();

            // GRAVAR NO STORAGE
            // ir buscar ao storage
            m.p5projs = localStorage.getItem("projs");
            // transforma numa variável
            m.p5projs = JSON.parse(m.p5projs);
            // criar novo item no objeto
            m.p5projs[i][`doodle${doodlenumber}`] = `${dataURL}`;

            let JSONp5projs = JSON.stringify(m.p5projs);
            // gravar
            localStorage.setItem("projs", JSONp5projs);

            // ir para topo da pagina
            document.getElementById("openproj").scrollTop = 0;
            // voltar a ligar scroll
            setTimeout(function () {
              $(".openproj").css("overflow-x", "hidden");
            }, 300);

            // reiniciar rotação do botão +
            $(".addMore").removeClass("rotated");

            // mudar cor do botão nav
            setTimeout(function () {
              $(".nav").attr("src", "img/nav-white.gif");
            }, 300);
            // mudar border da nav
            setTimeout(function () {
              $(".navMenu li").css("border", "solid 0.2rem white");
            }, 300);

            // fechar pagina de desenho
            setTimeout(function () {
              $(".doodle").css("transform", "translateY(3000px)");
              $(".doodlebuttoncolor").hide();
              $(".doodlebuttontool").hide();
              $("#doodlecanvas").hide();
            }, 400);
            setTimeout(function () {
              $(".doodle").hide();
            }, 600);

            // esconder menu de items
            setTimeout(function () {
              $(".addItem").hide();
            }, 100);
            $(".itemMenu > ul").slideUp(100);
          }

          // CANCEL DOODLE
          $(".doodle > .closebtn").on("click", cancelDoodle);

          function cancelDoodle() {
            // reiniciar rotação do botão +
            $(".addMore").removeClass("rotated");

            // ir para topo da pagina
            document.getElementById("openproj").scrollTop = 0;
            // voltar a ligar scroll
            setTimeout(function () {
              $(".openproj").css("overflow-x", "hidden");
            }, 100);
            // fechar pagina de nota
            setTimeout(function () {
              $(".doodle").css("transform", "translateY(3000px)");
              $(".doodlebuttoncolor").hide();
              $(".doodlebuttontool").hide();
              $("#doodlecanvas").hide();
            }, 400);
            setTimeout(function () {
              $(".doodle").hide();
            }, 600);
            // se houver items...
            if ($(`.${i}`).length > 0) {
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
          $(document).on("click", ".deleteDoodle", function () {
            // ir buscar numero do desenho
            let selected = $(this).parent().attr("id");

            // ir buscar ao storage
            m.p5projs = localStorage.getItem("projs");
            // transforma numa variável
            m.p5projs = JSON.parse(m.p5projs);

            // apagar do registo
            delete m.p5projs[i][`doodle${selected}`];

            let JSONp5projs = JSON.stringify(m.p5projs);
            // gravar
            localStorage.setItem("projs", JSONp5projs);

            // fazer slideup do desenho
            let deletedDoodle = $(this).parent();
            $(deletedDoodle).slideUp();
            // apagar
            setTimeout(function () {
              $(deletedDoodle).remove();
            }, 500);
          });

          // EDIT DOODLE
          $(document).on("click", ".editDoodle", function editDoodle() {
            // ir buscar desenho selecionado
            let currentDoodle = $(this).next("img").attr("src");

            // ir buscar numero do desenho atual
            let currentNumber = $(this).parent().attr("id");

            // ir para topo da pagina
            document.getElementById("openproj").scrollTop = 0;
            // desligar scroll
            setTimeout(function () {
              $(".openproj").css("overflow-x", "visible");
            }, 200);

            // abrir pagina de desenho
            $(".doodle").show();
            setTimeout(function () {
              $(".doodle").css("transform", "translateY(0px)");
            }, 100);
            setTimeout(function () {
              $("#doodlecanvas").fadeIn();
              $(".doodlebuttoncolor").fadeIn();
              $(".doodlebuttontool").fadeIn();
            }, 900);

            // desligar botão de gravar desenho
            $(".doodle > .save").off("click", saveDoodle);
            // ligar botão de gravar mudança
            $(".doodle > .save").on("click", saveDoodleChange);

            // GRAVAR MUDANÇA
            function saveDoodleChange() {
              // ir para topo da pagina
              document.getElementById("openproj").scrollTop = 0;
              // voltar a ligar scroll
              setTimeout(function () {
                $(".openproj").css("overflow-x", "hidden");
              }, 300);

              // reiniciar rotação do botão +
              $(".addMore").removeClass("rotated");

              // fechar pagina de desenho
              setTimeout(function () {
                $(".doodle").css("transform", "translateY(3000px)");
                $(".doodlebuttoncolor").hide();
                $(".doodlebuttontool").hide();
                $("#doodlecanvas").hide();
              }, 400);
              setTimeout(function () {
                $(".doodle").hide();
              }, 600);

              // ir buscar novo desenho
              let newcanvas = document.getElementById("doodlecanvas");
              let newdataURL = newcanvas.toDataURL();

              // substituir desenho antigo
              $(`#${currentNumber}.desenho`)
                .children("#imagem")
                .attr("src", `${newdataURL}`);

              // GRAVAR NO STORAGE
              // ir buscar ao storage
              m.p5projs = localStorage.getItem("projs");
              // transforma numa variável
              m.p5projs = JSON.parse(m.p5projs);
              // substituir conteudo
              m.p5projs[i][`doodle${currentNumber}`] = `${newdataURL}`;

              let JSONp5projs = JSON.stringify(m.p5projs);
              // gravar
              localStorage.setItem("projs", JSONp5projs);

              // esconder menu de items
              setTimeout(function () {
                $(".addItem").hide();
              }, 100);
              $(".itemMenu > ul").slideUp(100);

              // voltar a ligar botão de gravar desenho
              $(".doodle > .save").on("click", saveDoodle);
              // desligar botão de gravar mudança
              $(".doodle > .save").off("click", saveDoodleChange);
            }

            // CANCELAR MUDANÇA
            $(".doodle > .closebtn").on("click", cancelDoodleChange);

            function cancelDoodleChange() {
              // voltar a ligar botão de gravar nota
              $(".doodle > .save").on("click", saveDoodle);
              // desligar botão de gravar mudança
              $(".doodle > .save").off("click", saveDoodleChange);
            }
          });

          // ADICIONAR IMAGEM  ----> https://stackoverflow.com/questions/49710239/image-upload-and-display-without-page-refresh-jquery-mvc/49711942
          $("#image").on("click", addImage);

          function addImage(evt) {
            // impedir bugs
            evt.stopImmediatePropagation();

            // esconder menu de items
            $(".addItem").hide();
            $(".itemMenu").show();
            $(".itemMenu > ul").hide();

            // se já houver imagens
            if ($(".items").children(".upload").length > 0) {
              // ir buscar ultimo numero utilizado
              imgnumber = $(".upload:last").attr("id");
              // passar de string para numero
              imgnumber = parseInt(imgnumber, 10);
            }

            imgnumber += 1;

            // criar elemento
            let newImg = `<div class="upload ${i}" id="${imgnumber}">
                                <img class="deleteImg" src="img/x.png">
                                <input type='file' class="imgInp" style="display:none" />
                                <img class="img" src="img/placeholder.png" alt="placeholder" width="100%">
                            </div>`;

            // mostrar na pagina
            $(".items").append(newImg);
            $(".upload").slideDown(400);

            // abrir input de selecionar imagem
            $(".img").click(function () {
              $(this).prev(".imgInp").click();
              $(".img").off();
            });

            // preview the image
            function readURL(input) {
              if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                  $(`.upload#${imgnumber}`)
                    .children(".img")
                    .attr("src", e.target.result);

                  // GRAVAR NO STORAGE
                  // ir buscar ao storage
                  m.p5projs = localStorage.getItem("projs");
                  // transforma numa variável
                  m.p5projs = JSON.parse(m.p5projs);
                  // criar novo item no objeto
                  m.p5projs[i][`imagem${imgnumber}`] = `${e.target.result}`;

                  let JSONp5projs = JSON.stringify(m.p5projs);
                  //gravar
                  localStorage.setItem("projs", JSONp5projs);
                };

                reader.readAsDataURL(input.files[0]);
              }
            }

            $(`.upload#${imgnumber}`)
              .children(1)
              .change(function () {
                readURL(this);
                $(this).off();
              });

            // DELETE IMAGE
            $(document).on("click", ".deleteImg", function () {
              // ir buscar numero da imagem
              let selected = $(this).parent().attr("id");

              // ir buscar ao storage
              m.p5projs = localStorage.getItem("projs");
              // transforma numa variável
              m.p5projs = JSON.parse(m.p5projs);

              // apagar do registo
              delete m.p5projs[i][`imagem${selected}`];

              let JSONp5projs = JSON.stringify(m.p5projs);
              // gravar
              localStorage.setItem("projs", JSONp5projs);

              // fazer slideup da imagem
              let deletedImg = $(this).parent();
              $(deletedImg).slideUp();
              // apagar
              setTimeout(function () {
                $(deletedImg).remove();
              }, 500);
            });
          }

          // desativar click nos blobs
          enabled = false;

          // MOSTRAR ITEMS EXISTENTES DE CADA PROJ

          m.p5projs = localStorage.getItem("projs");
          m.p5projs = JSON.parse(m.p5projs);

          // ir buscar keys do objeto
          let keys = Object.keys(m.p5projs[i]);

          // filtrar os que são notas
          let result = keys.filter((item) => item.includes("nota"));

          // filtrar os que são listas
          let result2 = keys.filter((item) => item.includes("lista"));

          // filtrar os que são desenhos
          let result3 = keys.filter((item) => item.includes("doodle"));

          // filtrar os que são imagens
          let result4 = keys.filter((item) => item.includes("imagem"));

          // para cada nota no registo, fazer um sticky note na pag do proj
          result.forEach(function (note) {
            // ir buscar numero da nota
            let number = note.slice(-1);

            // criar novo sticky note
            let el = $(
              `<div class="sticky ${i}" id="${number}"><img class="deleteNote" src="img/x-white.png"><img class="edit" src="img/down-white.png"> <p>${
                m.p5projs[i][`nota${number}`]
              }</p></div>`
            );

            // acrescentar na pagina do proj
            $(".items").append(el);
            // mostrar
            $(`.sticky.${i}`).show();
            // dar cor secundaria do tema
            $(`.sticky.${i}`).css("background-color", `${m.p5projs[i].corsec}`);
          });

          // para cada lista no registo, fazer uma lista na pag do proj
          result2.forEach(function (list) {
            // ir buscar numero da lista
            let number2 = list.slice(-1);

            // ir buscar conteudo
            let el = m.p5projs[i][`lista${number2}`];

            // criar nova lista
            let lista = `<div class="toDo ${i}" id="${number2}" style="display: block;">${el}</div>`;

            // acrescentar na pagina do proj
            $(".items").append(lista);
            // mostrar
            $(`.list.${i}`).show();

            // para cada linha
            $(".toDo div").each(function () {
              // se estiver checked, risca o texto e muda para a cor secundaria
              if ($(this).hasClass("checked")) {
                m.p5projs = localStorage.getItem("projs");
                m.p5projs = JSON.parse(m.p5projs);
                $(this).css("border-color", `${m.p5projs[i].corsec}`);
                $(this).css("outline-color", `${m.p5projs[i].corsec}`);
                $(this)
                  .next("li")
                  .children("textarea")
                  .css("color", `${m.p5projs[i].corsec}`);
                $(this).next("li").css("color", `${m.p5projs[i].corsec}`);
              }
            });
          });

          // para cada desenho no registo, fazer um doodle na pag do proj
          result3.forEach(function (doodle) {
            // ir buscar numero do desenho
            let number3 = doodle.slice(-1);

            // criar novo desenho
            let el = $(
              `<div class="desenho ${i}" id="${number3}"><img class="deleteDoodle" src="img/x.png"><img class="editDoodle" src="img/down.png"> <img src="${
                m.p5projs[i][`doodle${number3}`]
              }" id="imagem"> </div>`
            );

            // acrescentar na pagina do proj
            $(".items").append(el);
            // mostrar
            $(`.desenho.${i}`).show();
          });

          // para cada desenho no registo, fazer um doodle na pag do proj
          result4.forEach(function (image) {
            // ir buscar numero do desenho
            let number4 = image.slice(-1);

            // criar novo desenho
            let el = $(`<div class="upload ${i}" id="${number4}">
            <img class="deleteImg" src="img/x.png">
            <input type='file' class="imgInp" style="display:none" />
            <img class="img" src="${
              m.p5projs[i][`imagem${number4}`]
            }" alt="placeholder" width="100%">
          </div>`);

            // acrescentar na pagina do proj
            $(".items").append(el);
            // mostrar
            $(`.upload.${i}`).show();
          });

          // ao abrir projeto
          // se houver items...
          if ($(`.${i}`).length > 0) {
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
        //---------------------------------------------------------------------------------------------
        // adicionar blobs
        m.bolas.push(bola);
      }
      m.drawShapes = true;
    } else {
      m.drawShapes = false;
    }
  };

  m.draw = function () {
    m.background(255);
    if (m.drawShapes) {
      for (bola of m.bolas) {
        // movimento dos blobs no espaço
        m.translate(p5.Vector.fromAngle(m.millis() / 1000, 3));

        m.push();
        m.translate(bola.x, bola.y);

        m.noStroke();
        m.fill(bola.theme);

        m.px_offset = bola.deadline / 1;

        // desenhar forma blobs
        m.beginShape();
        for (m.a = 0; m.a < m.TWO_PI; m.a += m.TWO_PI / m.vertices_amount) {
          m.x = bola.deadline * m.sin(m.a);
          m.y = bola.deadline * m.cos(m.a);
          m.new_x =
            m.x +
            m.noise(
              (m.x_off + m.x) / m.NOISE_SCALE,
              (m.y_off + m.y) / m.NOISE_SCALE,
              m.z_off
            ) *
              m.px_offset *
              m.sin(m.a);
          m.new_y =
            m.y +
            m.noise(
              (m.x_off + m.x) / m.NOISE_SCALE,
              (m.y_off + m.y) / m.NOISE_SCALE,
              m.z_off
            ) *
              m.px_offset *
              m.cos(m.a);
          m.vertex(m.new_x, m.new_y);
        }
        m.endShape();
        m.pop();
        // update noise offsets
        m.z_off += m.Z_SPEED;
        m.x_off += m.X_SPEED;
        m.y_off += m.Y_SPEED;
        // texto
        m.fill(bola.theme);
        m.textSize(20);
        m.text(
          bola.name,
          bola.x + bola.deadline * 1.5,
          bola.y + bola.deadline * 1.5
        );
      }
    }
  };

  m.mousePressed = function () {
    // se o mousePressed estiver ativo
    if (enabled == true) {
      for (let i = 0; i < m.bolas.length; i++) {
        m.bolas[i].clicked(m.mouseX, m.mouseY);
      }
      // se não estiver ativo, não permite clicar nos blobs
    } else {
    }
  };

  // update canvas no resize da janela
  m.windowResized = function () {
    m.resizeCanvas(m.windowWidth, m.windowHeight);
    //page reload
    //location.reload();
  };
};

//_______________________________________________________________
//_______________________________________________________________
// DOODLE SKETCH
//2.1: Variables in p5.js (mouseX, mouseY) - p5.js Tutorial (básicos de uma ferramenta de desenho simples)
//https://youtu.be/7A5tKW9HGoM

let doodlesketch = function (d) {
  d.button;
  d.r;
  d.g;
  d.b;
  d.strWeight;
  d.cnv;
	
  //definir se o doodle está aberto ou não para não desenhar com doodle fechado
  doodleenabled = false;


  d.setup = function () {

    //criar canvas de doodle
    d.cnv = d.createCanvas(d.windowWidth, d.windowHeight);
    d.background(255);

    //atribuir-lhe ID e parent
    d.cnv.id("doodlecanvas");
    d.cnv.parent("doodleframe");

    d.r = 0;
    d.g = 0;
    d.b = 0;
    d.strWeight = 5;

    //criar botões para as diferentes funcionalidades da ferramenta
    //botão cor: vermelho
    d.button = d.createButton("red");
    d.button.mousePressed(d.redDraw);
    d.button.addClass("doodlebuttoncolor");
    d.button.parent("doodleframecolor");

    //botão cor: verde
    d.button = d.createButton("green");
    d.button.mousePressed(d.greenDraw);
    d.button.addClass("doodlebuttoncolor");
    d.button.parent("doodleframecolor");

    //botão cor: azul/roxo
    d.button = d.createButton("blue");
    d.button.mousePressed(d.blueDraw);
    d.button.addClass("doodlebuttoncolor");
    d.button.parent("doodleframecolor");

    //botão cor: preto
    d.button = d.createButton("black");
    d.button.mousePressed(d.blackDraw);
    d.button.addClass("doodlebuttoncolor");
    d.button.parent("doodleframecolor");

    //botão ferramenta: leve
    d.button = d.createButton("light");
    d.button.mousePressed(d.lightWeight);
    d.button.addClass("doodlebuttontool");
    d.button.parent("doodleframetool");

    //botão ferramenta: médio
    d.button = d.createButton("medium");
    d.button.mousePressed(d.mediumWeight);
    d.button.addClass("doodlebuttontool");
    d.button.parent("doodleframetool");

    //botão ferramenta: grande
    d.button = d.createButton("heavy");
    d.button.mousePressed(d.heavyWeight);
    d.button.addClass("doodlebuttontool");
    d.button.parent("doodleframetool");

    //botão reset
    d.button = d.createButton("reset");
    d.button.mousePressed(d.resetDoodle);
    d.button.addClass("doodlebuttontool");
    d.button.parent("doodleframetool");

    //botão de apagar
    d.button = d.createButton("eraser");
    d.button.mousePressed(d.eraserTool);
    d.button.addClass("doodlebuttontool");
    d.button.parent("doodleframetool");
  };

  //determinar que sempre que o rato é pressionado (sem sobrepor aos botões ou limites verticais da página e só se o doodle estiver aberto) 
  //desenhar uma linha com as suas coordenadas no canvas

  d.draw = function () {
    if (d.mouseIsPressed && doodleenabled && d.mouseY > (d.windowHeight*0.15) && d.mouseY < (d.windowHeight - (d.windowHeight*0.15))) {
      d.stroke(d.r, d.g, d.b);
    d.strokeWeight(d.strWeight);
    d.line(d.pmouseX,d.pmouseY,d.mouseX,d.mouseY);
    }
  };

  //limpar o canvas de linhas anteriores ao abrir um doodle diferente
  $("#doodle").on("click", function () {
    doodleenabled = true;
    d.resetDoodle();
    d.r = 0;
    d.g = 0;
    d.b = 0;
    d.strWeight = 5;
  });
	
	
	//limpar o canvas de linhas anteriores ao abrir um doodle diferente
  $(document).on("click", ".editDoodle", function () {
    doodleenabled = true;
    d.r = 0;
    d.g = 0;
    d.b = 0;
    d.strWeight = 5;
    d.resetDoodle();
	  
	  //ir buscar o "contexto" do canvas
	  let canvas = document.getElementById("doodlecanvas");
      let ctx = canvas.getContext("2d");
      
	  //ir buscar desenho atual
	  let currentDoodle = $(this).next("img").attr("src");
	  
	  //usar como background no canvas   -----> https://newbedev.com/html5-canvas-background-image 
    //para poder reabrir desenhos anteriores para editar
	  var background = new Image();
	  background.src = currentDoodle;
	  
		background.onload = function(){		
			ctx.drawImage(background, 0, 0, d.windowWidth, d.windowHeight);   
		}
  });	

  //não desenhar depois de fechar o doodle
  $(".doodle > .closebtn").on("click", function () {
    doodleenabled = false;
  });
	
//se clicar o botão vermelho: novas coordenadas de cor
  d.redDraw = function () {
    d.r = 240;
    d.g = 74;
    d.b = 77;
  };

//se clicar o botão verde: novas coordenadas de cor
  d.greenDraw = function () {
    d.r = 113;
    d.g = 210;
    d.b = 123;
  };

//se clicar o botão azul/roxo: novas coordenadas de cor
  d.blueDraw = function () {
    d.r = 84;
    d.g = 53;
    d.b = 210;
  };

//se clicar o botão preto: novas coordenadas de cor
  d.blackDraw = function () {
    d.r = 0;
    d.g = 0;
    d.b = 0;
  };

//se clicar o botão de apagar: pincel branco grande
  d.eraserTool = function () {
    d.r = 255;
    d.g = 255;
    d.b = 255;
    d.strWeight = 50;
  };

//se clicar o botão leve: menos stroke weight 
  d.lightWeight = function () {
    d.strWeight = 5;
    if ( d.r >= 255 && d.g >= 255 && d.b >= 255) {
      d.r = 0;
      d.g = 0;
      d.b = 0;
  }
  };

 //se clicar o botão médio: stroke weight médio
  d.mediumWeight = function () {
    d.strWeight = 10;
    if ( d.r >= 255 && d.g >= 255 && d.b >= 255) {
      d.r = 0;
      d.g = 0;
      d.b = 0;
    }
  };

  //se clicar o botão grande: stroke weight maior 
  d.heavyWeight = function () {
    d.strWeight = 30;
    if ( d.r >= 255 && d.g >= 255 && d.b >= 255) {
      d.r = 0;
      d.g = 0;
      d.b = 0;
    }
  };

  //se clicar no botão reset: apagar o desenho atual
  d.resetDoodle = function() {
    $("#doodlecanvas").css("background-image", "none");
    d.erase();
    d.rect(0,0,d.windowWidth, d.windowHeight);
    d.noErase();
    console.log("reset!");
  };
};

//iniciar ambos os p5: os dois sketches dentro deste documento
let myp5_1 = new p5(mainsketch);
let myp5_2 = new p5(doodlesketch);
