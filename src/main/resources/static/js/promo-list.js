var pageNumber = 0;

//Rotina para quando abrir a pagina pela primeira vez
$(document).ready(function () {
    $("#loader-img").hide();
    $("#fim-btn").hide();
})

//efeito infinite-scroll
$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var conteudo = $(document).height() - $(window).height();

    // console.log("scrollTop: ", scrollTop, " | ", "conteudo", conteudo);

    if (scrollTop >= conteudo) {
        pageNumber++;
        setTimeout(function () {
            loadByScrollBar(pageNumber);
        }, 200);
    }
})

function loadByScrollBar(pageNumber) {
    $.ajax({
        method: "GET",
        url: "/promocao/list/ajax",
        data: {
            page: pageNumber
        },
        beforeSend: function () {
            $("#loader-img").show();
        },
        success: function (response) {
            // console.log("resposta", response);

            if (response.length > 150) {
                $(".row").fadeIn(500, function () {
                    $(this).append(response);
                })
            } else {
                //Mostra o botão retornar ao topo
                $("#fim-btn").show();
                $("#loader-img").removeClass("loader"); //evitar loader apareça quando chega fim página
            }

        },
        error: function (xhr) {
            alert("Ops... ocorreu erro: " + xhr.status + " - " + xhr.statusText);
        },
        complete: function () {
            $("#loader-img").hide();
        }
    })
}

// adicionar likes
$(document).on("click","button[id*='likes-btn-']", function () {
    var id = $(this).attr("id").split("-")[2];
    // console.log("id: ", id);

    $.ajax({
        method: "POST",
        url: "/promocao/likes/" + id,
        sucess: function (response) {
            $("#likes-count-" + id).text(response);
        },
        error: function (xhr) {
            alert("Ops...Ocorreu um erro: " + xhr.status + " - " + xhr.statusText);
        }
    })
})