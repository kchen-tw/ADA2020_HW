var T = []
var D = []
var P = []
var K = []

var creatTRwithHeadandArray = (head, Array) => {
    return $('<tr>').append(`<th>${head}</th>`).append($(Array.map(x => `<td>${x}</td>`).join('').trim()))
}

var creatProcessTable = (id, n) => {
    $tr = $('<tr>').append('<th>')
        .append(Array.apply(null, {
            length: n
        }).map((v, i) => `<th>${i+1}</th>`).join('').trim())
    $thead = $('<thead>').append($($tr))

    $tbody = $('<tbody>')
        .append(creatTRwithHeadandArray('T', T))
        .append(creatTRwithHeadandArray('D', D))
        .append(creatTRwithHeadandArray('P', P))
        .append(creatTRwithHeadandArray('K', K))
    $table = $('<table>').addClass('table').addClass('table-bordered')
        .append($thead).append($tbody)
    $(`#${id}`).append($table)
}

var eventToDiv = (event) => {
    let $div = $('<div>')
    let items = Object.keys(event).map(x => {
        return `${x}=${event[x]}`
    })
    items.forEach(v => {
        $div.append($('<div>').text(v))
    });
    return $div
}

var event_newuser = (event) => {
    T[event.c] = `<em>T<sub>${event.i}</sub></em>`
    D[event.c] = +event.d
}

var event_attack = (event) => {
    for (let i = event.l; i <= event.r; i++) {
        if (T[i] != 0) {
            P[i] = event.p
            if (D[i] <= event.p) {
                K[i] += +event.k
            }
        }
    }
}

var solve = (l, r, evemtsList) => {
    if (r - l <= 0) {
        $('#divide>tbody>tr').append($('<td>').append(eventToDiv(evemtsList[l])))
        return evemtsList[l]
    }
    let mid = (l + r) >> 1
    //let md = evemtsList[min];
    let levent = solve(l, mid, evemtsList)
    let revent = solve(mid + 1, r, evemtsList)
    if (levent.T == "P" && revent.T == "P") {
        event_newuser(levent)
        //event_newuser(revent)
        //creatProcessTable('merge', evemtsList.length)
    } else if (levent.T == "A" && revent.T == "A") {
        event_attack(levent)
        //event_attack(revent)
        //creatProcessTable('merge', evemtsList.length)
    } else if (levent.T == "P" && revent.T == "A") {
        event_newuser(levent)
        //creatProcessTable('merge', evemtsList.length)
        //return revent
    } else if (levent.T == "A" && revent.T == "P") {
        event_attack(levent)
        //creatProcessTable('merge', evemtsList.length)
        //return revent
    }
    creatProcessTable('merge', T.length)
    return revent
}

$(() => {
    $('#run').on('click', () => {
        let str = $("#input").val()
        let strEventsList = str.split('\n')
        let N = +strEventsList[0].split(' ')[0]
        let M = +strEventsList[0].split(' ')[1]
        T = Array.apply(null, {
            length: N
        }).map(x => 0)
        D = [...T]
        P = [...T]
        K = [...T]
        let evemtsList = []
        for (let i = 1; i <= M; i++) {
            let event = strEventsList[i].split(' ')

            if (event[0] == 'P') {
                evemtsList.push({
                    T: event[0],
                    i: i - 1,
                    c: event[1],
                    d: event[2],
                })
            } else if (event[0] == 'A') {
                evemtsList.push({
                    T: event[0],
                    l: event[1],
                    r: event[2],
                    p: event[3],
                    k: event[4],
                })
            } else {
                console.log('Events type error')
            }
        }
        // 增加表格行數，行數等於二分法的高，也就是 log2(M) 
        let L = Math.ceil(Math.log2(M))
        $(`#merge`).empty()
        solve(0, M - 1, evemtsList)
    })
})