
var puzzle = document.createElement('div');
document.body.appendChild(puzzle);
puzzle.setAttribute('id', 'puzzle');

var controls = document.createElement('div');
document.body.appendChild(controls);
controls.setAttribute('id', 'controls');

var play=document.createElement('button');
controls.appendChild(play);
play.setAttribute('id','play');
play.setAttribute('onclick','start()');
play.innerText='PLAY';

var reset=document.createElement('button');
controls.appendChild(reset);
reset.setAttribute('id','reset');
reset.innerText='RESET';


function start() {

    var state = 1;
    var puzzle = document.getElementById('puzzle');

    play();

    puzzle.addEventListener('click', function (e) {
        if (state == 1) {

            puzzle.className = 'animate';
            shiftCell(e.target);
        }
    });
    document.getElementById('reset').addEventListener('click', reset);

    function play() {

        if (state == 0) {
            return;
        }

        puzzle.innerHTML = '';

        var n = 1;
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j <5; j++) {
                var cell = document.createElement('span');
                cell.id = 'cell-' + i + '-' + j;
                cell.style.left = (j * 90 + 1 * j + 1) + 'px';
                cell.style.top = (i * 90 + 1 * i + 1) + 'px';

                if (n <25) {
                    cell.classList.add('number');
                    cell.innerHTML = (n++).toString();
                } else {
                    cell.className = 'empty';
                }

                puzzle.appendChild(cell);
            }
        }

    }

    function shiftCell(cell) {

        if (cell.clasName != 'empty') {

            var emptyCell = getEmptyAdjacentCell(cell);

            if (emptyCell) {

                var tmp = { style: cell.style.cssText, id: cell.id };
                cell.style.cssText = emptyCell.style.cssText;
                cell.id = emptyCell.id;
                emptyCell.style.cssText = tmp.style;
                emptyCell.id = tmp.id;

                if (state == 1) {

                    checkOrder();
                }
            }
        }

    }

    function getCell(row, col) {

        return document.getElementById('cell-' + row + '-' + col);

    }

    function getEmptyCell() {

        return puzzle.querySelector('.empty');

    }

    function getEmptyAdjacentCell(cell) {

        var adjacent = getAdjacentCells(cell);

        for (var i = 0; i < adjacent.length; i++) {
            if (adjacent[i].className == 'empty') {
                return adjacent[i];
            }
        }
        return false;

    }

    function getAdjacentCells(cell) {

        var id = cell.id.split('-');
        var row = parseInt(id[1]);
        var col = parseInt(id[2]);
        var adjacent = [];
        if (row < 4) { adjacent.push(getCell(row + 1, col)); }
        if (row > 0) { adjacent.push(getCell(row - 1, col)); }
        if (col < 4) { adjacent.push(getCell(row, col + 1)); }
        if (col > 0) { adjacent.push(getCell(row, col - 1)); }

        return adjacent;

    }

    function checkOrder() {

        if (getCell(2, 2).className != 'empty') {
            return;
        }

        var n = 1;
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                if (n <25 && getCell(i, j).innerHTML != n.toString()) {

                    return;
                }
                n++;
            }
        }

    }

    function reset() {

        if (state == 0) {
            return;
        }

        puzzle.removeAttribute('class');
        state = 0;

        var previousCell;
        var i = 1;
        var interval = setInterval(function () {
            if (i <= 100) {
                var adjacent = getAdjacentCells(getEmptyCell());
                if (previousCell) {
                    for (var j = adjacent.length - 1; j >= 0; j--) {
                        if (adjacent[j].innerHTML == previousCell.innerHTML) {
                            adjacent.splice(j, 1);
                        }
                    }
                }
                previousCell = adjacent[rand(0, adjacent.length - 1)];
                shiftCell(previousCell);
                i++;
            } else {
                clearInterval(interval);
                state = 1;
            }
        }, 5);

    }

    function rand(from, to) {

        return Math.floor(Math.random() * (to - from + 1)) + from;

    }

};

