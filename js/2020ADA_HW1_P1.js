var X = 9
var Y = 9

var creatTable = (id, callbackfn) => {
    $(`table#${id}>thead>tr`).empty();
    $(`table#${id}>thead>tr`).append($('<th>'))
    for (let i = 0; i <= X; i++) {
        $th = $('<th>').text(i)
        $(`table#${id}>thead>tr`).append($th)
    }
    $tbody = $(`table#${id}>tbody`).empty()
    for (let i = 0; i <= Y; i++) {
        $th = $('<th>').text(i)
        $tr = $('<tr>').append($th)
        for (let j = 0; j <= X; j++) {
            $td = callbackfn(j, i)
            $tr.append($td)
        }
        $tbody.append($tr)
    }
}

var updateProfit = (A) => {
    creatTable('profit', (x, y) => {
        return $('<td>').text(2 * A.x + x + 2 * A.x + y)
    })
    $(`#profit>tbody>tr:eq(${A.y})>td:eq(${A.x})`).css('background-color', 'rgba(0,123,255,.5)')
}


$(() => {
    creatTable('cost', (x, y) => {
        return $('<td>').text(x ** 2 + y ** 2)
    })

    let AList = Array.apply(null, {
        length: X + 1
    }).map((v, i) => {
        return {
            x: i,
            y: X - i
        }
    })
    let x = 0;
    let timeoutID = setInterval(() => {
        let A = AList[x++]
        updateProfit(A)
        x = (x > X) ? 0 : x
    }, 1000)


})