//submit do formulario para controller
$("#form-add-promo").submit(function (evt) {
    //bloquear o comportamento padrão do submit
    evt.preventDefault();

    var promo = {};
    promo.linkPromocao = $("#linkPromocao").val();
    promo.titulo = $("#titulo").val();
    promo.descricao = $("#descricao").val();
    promo.preco = $("#preco").val();
    promo.categoria = $("#categoria").val();
    promo.linkImagem = $("#linkImagem").attr("src");
    promo.site = $("#site").text();

    console.log('promo > ', promo);

    $.ajax({
        method: "POST",
        url: "/promocao/save",
        data: promo,
        success: function (data) {
            $("#alert").addClass("alert alert-success").text("OK! Promoção cadastrada com sucesso!");
            setTimeout(function () {
                $("#alert").removeClass("alert alert-danger").text("");
            }, 5000);
        },
        error: function (xhr) {
            console.log("> error: ", xhr.responseText);
            $("#alert").addClass("alert alert-danger").text("Não foi possivel salvar essa promoção.");
            setTimeout(function () {
                $("#alert").removeClass("alert alert-danger").text("");
            }, 5000);
        }
    })
})


//função para capturar as meta tags
$("#linkPromocao").on('change', function () {
    var url = $(this).val();

    if (url.length > 7) {
        $.ajax({
            method: "POST",
            url: "/meta/info?url=" + url,
            cache: false,
            beforeSend: function () {
                $("#alert").removeClass("alert alert-danger").text("");
                $("#titulo").val("");
                $("#site").text("");
                $("#linkImagem").attr("src", "");
                $("#loader-img").addClass("loader");
            },
            success: function (data) {
                // console.log(data);
                $("#titulo").val(data.title);
                $("#site").text(data.site.replace("@", ""));
                $("#linkImagem").attr("src", data.image);
            },
            statusCode: {
                404: function () {
                    $("#alert").addClass("alert alert-danger").text("Nenhuma informação pode ser recuperada dessa url.");
                    $("#linkImagem").attr("src", "/images/promo-dark.png");
                    setTimeout(function () {
                        $("#alert").removeClass("alert alert-danger").text("");
                    }, 5000);
                }

            },
            error: function (err) {
                $("#alert").addClass("alert alert-danger").text("Ops... algo deu errado tente maais tarde");
                $("#linkImagem").attr("src", "/images/promo-dark.png");
                setTimeout(function () {
                    $("#alert").removeClass("alert alert-danger").text("");
                }, 5000);
            },
            complete: function () {
                $("#loader-img").removeClass("loader");
            }
        });
    }
});