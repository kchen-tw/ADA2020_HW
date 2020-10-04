var X = 9
var Y = 9

var creatTable = (id, x, y, callbackfn) => {
    $(`table#${id}>thead>tr`).empty();
    $(`table#${id}>thead>tr`).append($('<th>'))
    for (let i = 0; i <= x; i++) {
        $th = $('<th>').text(i)
        $(`table#${id}>thead>tr`).append($th)
    }
    $tbody = $(`table#${id}>tbody`).empty()
    for (let i = 0; i <= y; i++) {
        $th = $('<th>').text(i)
        $tr = $('<tr>').append($th)
        for (let j = 0; j <= x; j++) {
            $td = callbackfn(j, i)
            $tr.append($td)
        }
        $tbody.append($tr)
    }
}

var updateProfit = (A) => {
    creatTable('profit', X, Y, (x, y) => {
        return $('<td>').text(2 * A.x * x + 2 * A.y * y)
    })
    $(`#profit>tbody>tr:eq(${A.y})>td:eq(${A.x})`).css('background-color', 'rgba(0,123,255,.5)')
}

var updtaeNet = () => {
    let x1 = +$('#inputX').find(":selected").val()
    let y1 = +$('#inputY').find(":selected").val()
    creatTable('net', X, Y, (x2, y2) => {
        return $('<td>').text(2 * x1 * x2 + 2 * y1 * y2 - (x1 ** 2 + y1 ** 2) - (x2 ** 2 + y2 ** 2))
    })
    $(`#net>tbody>tr:eq(${y1})>td:eq(${x1})`).css('background-color', 'rgba(0,123,255,.5)')
}

$(() => {
    creatTable('cost', X, Y, (x, y) => {
        return $('<td>').text(x ** 2 + y ** 2)
    })
    let AList1 = Array.apply(null, {
        length: X + 1
    }).map((v, i) => {
        return {
            x: i,
            y: i
        }
    })
    let AList2 = Array.apply(null, {
        length: X + 1
    }).map((v, i) => {
        return {
            x: i,
            y: X - i
        }
    })
    let AList3 = Array.apply(null, {
        length: X + 1
    }).map((v, i) => {
        return {
            x: i,
            y: (i <= 4) ? i : X - i,
        }
    })
    let AList4 = Array.apply(null, {
        length: X + 1
    }).map((v, i) => {
        return {
            x: (i <= 4) ? i : X - i,
            y: i,
        }
    })
    let AList5 = Array.apply(null, {
        length: X + 1
    }).map((v, i) => {
        return {
            x: i,
            y: 4,
        }
    })
    let AList6 = Array.apply(null, {
        length: X + 1
    }).map((v, i) => {
        return {
            x: 4,
            y: i,
        }
    })
    let AList = AList1.concat(AList2).concat(AList3).concat(AList4).concat(AList5).concat(AList6)
    let x = 0;
    let timeoutID = setInterval(() => {
        let A = AList[x++]
        updateProfit(A)
        x = (x >= AList.length) ? 0 : x
    }, 1000)


    updtaeNet()

    $('#inputX').on('change', updtaeNet)
    $('#inputY').on('change', updtaeNet)

})