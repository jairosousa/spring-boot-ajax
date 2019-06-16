$(document).ready(function () {
    $("#table-server").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        lengthMenu: [ 10,15,20,25 ],
        ajax: {
            url: "/promocao/datatables/server",
            data: "data"
        },
        columns: [
            {data: 'id'},
            {data: 'titulo'},
            {data: 'site'},
            {data: 'linkPrtomocao'},
            {data: 'descricao'},
            {data: 'preco'},
            {data: 'likes'},
            {data: 'dtCadastro'},
            {data: 'categoria.titulo'}
        ]
    })
});