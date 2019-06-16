$(document).ready(function () {
    moment.locale('pt-br');
    $("#table-server").DataTable({
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
            {data: 'dtCadastro', render:
                    function (dtCadastro) {
                    return moment(dtCadastro).format('LLL');
                }},
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
                className: 'btn btn-primary'
            },
            {
                text: "Excluir",
                attr: {
                    id: 'btn-excluir',
                    type: 'button',
                    className: 'btn btn-danger'
                }
            }
        ]
    });

    $("#btn-editar").on("click", function () {
        alert("Click no botão editar");
    });

    $("#btn-excluir").on("click", function () {
        alert("Click no botão excluir");
    })

});