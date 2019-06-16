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

    // console.log('promo > ', promo);

    $.ajax({
        method: "POST",
        url: "/promocao/save",
        data: promo,
        beforeSend: function() {
            //Removendo as menssagens de erro
            $("span").closest(".error-span").remove();
            //Remover as bordas vermelhas
            $("#categoria").removeClass("is-invalid");
            $("#preco").removeClass("is-invalid");
            $("#titulo").removeClass("is-invalid");

            //habilita o load
            $("#form-add-promo").hide();
            $("#loader-form").addClass("loader").show();
        },
        success: function (data) {
            //Reset do formulario
            $("#form-add-promo").each(function () {
                this.reset();
            });
            $("#linkImagem").attr("src", "/images/promo-dark.png");
            $("#site").text("");

            $("#alert")
                .removeClass("alert alert-danger")
                .addClass("alert alert-success").text("OK! Promoção cadastrada com sucesso!");

            setTimeout(function () {
                $("#alert").removeClass("alert alert-danger alert-success").text("");
            }, 5000);
        },
        statusCode: {
            //Mostrar mensagem de erro de validação
            422: function (xhr) {
                // console.log(xhr.status);
                var errors = $.parseJSON(xhr.responseText);
                $.each(errors, function (key, val) {
                    $("#" + key).addClass("is-invalid");
                    $("#error-" + key)
                        .addClass("invalid-feedback")
                        .append("<span class='error-span'>" + val + "</span>");
                });
            }
        },
        error: function (xhr) {
            // console.log("> error: ", xhr.responseText);
            $("#alert").addClass("alert alert-danger").text("Não foi possivel salvar essa promoção.");
            setTimeout(function () {
                $("#alert").removeClass("alert alert-danger").text("");
            }, 5000);
        },
        complete: function () {
            $("#loader-form").fadeOut(800, function () {
                $("#form-add-promo").fadeIn(250);
                $("#loader-form").removeClass("loader");
            });
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
                $("#alert").removeClass("alert alert-danger alert-success").text("");
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