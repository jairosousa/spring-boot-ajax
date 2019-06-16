$(document).ready(function () {
    moment.locale('pt-br');
    var table = $("#table-server").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        lengthMenu: [10, 15, 20, 25],
        ajax: {
            url: "/promocao/datatables/server",
            data: "data"
        },
        columns: [
            {data: 'id'},
            {data: 'titulo'},
            {data: 'site'},
            {data: 'linkPromocao'},
            {data: 'descricao'},
            {data: 'linkImagem'},
            {data: 'preco', render: $.fn.dataTable.render.number('.', ',', 2, 'R$ ')},
            {data: 'likes'},
            {
                data: 'dtCadastro', render:
                    function (dtCadastro) {
                        return moment(dtCadastro).format('LLL');
                    }
            },
            {data: 'categoria.titulo'}
        ],
        dom: 'Bfrtip',
        buttons: [
            {
                text: "Editar",
                attr: {
                    id: 'btn-editar',
                    type: 'button'
                },
                enabled: false
            },
            {
                text: "Excluir",
                attr: {
                    id: 'btn-excluir',
                    type: 'button'
                },
                enabled: false
            }
        ]
    });

    // Ação para marcar e desmarcar botões ao clicar na ordenação
    $("#table-server thead").on('click', 'tr', function () {
            table.buttons().disable();
    });

    // Ação para marcar/desmarcar linhas clicadas
    $("#table-server tbody").on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            table.buttons().disable();
        } else {
            $("tr.selected").removeClass('selected');
            $(this).addClass('selected');
            table.buttons().enable();
        }
    });

    $("#btn-editar").on("click", function () {
        var id = table.row(table.$('tr.selected')).data().id;
        alert("Click no botão editar: " + id);
    });

    $("#btn-excluir").on("click", function () {
        alert("Click no botão excluir");
    });

    $("#btn-editar").removeClass("btn-secondary").addClass("btn-primary");
    $("#btn-excluir").removeClass("btn-secondary").addClass("btn-danger");

});