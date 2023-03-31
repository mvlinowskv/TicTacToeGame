function GameTicTac(placeholder, sizeTable, callback) {

    this.placeholder = placeholder;
    this.paint(sizeTable);

    this.callback = callback;

    this.scores = {
        X: 0,
        O: 0
    };

    this.marks = {
        X: "X",
        O: "O",
        count: 0
    };

    return this;
}

GameTicTac.prototype.paint = function(grid_size) {

    var self = this;
    self.grid_size = grid_size;

    var html = '<table id="ticTacGame" align="center">';

    for (var i = 0; i < grid_size; i++) {
        html += '<tr>';
        for (var j = 0; j < grid_size; j++) {
            html += '<td></td>';
        }
        html += '</tr>';
    }

    html += '</table>';

    self.placeholder.innerHTML = html;

    self.columns = self.placeholder.getElementsByTagName("td");

    for (i = 0; i < this.columns.length; i++) {
        self.columns[i].addEventListener("click", markHandler);
    }

    function markHandler(e) {
        self.mark(e.target);
    }

};

GameTicTac.prototype.mark = function(column) {

    if (column.innerHTML) {
        return;
    }

    this.marks.count++;

    var current_mark = this.marks.count % 2 === 1 ? this.marks.X : this.marks.O;

    column.innerHTML = current_mark;
    column.classList.add(current_mark);

    if (this.didWin(current_mark)) {
        if (this.marks.count % 2 === 1) {
            this.scores.X++;
        } else {
            this.scores.O++;
        }
        this.callback(current_mark, this.scores);
    } else if (this.marks.count === this.columns.length) {
        this.callback("draw");
    }

};

GameTicTac.prototype.didWin = function(mark) {

    var sizeTable = this.grid_size;
    var countHorizontal,
        countVertical,
        countRightToLeft = 0,
        countLeftToRight = 0;


    for (var i = 0; i < sizeTable; i++) {

        countHorizontal = countVertical = 0;

        for (var j = 0; j < sizeTable; j++) {

            if (this.columns[i * sizeTable + j].innerHTML == mark) {
                countHorizontal++;
            }

            if (this.columns[j * sizeTable + i].innerHTML == mark) {
                countVertical++;
            }

        }

        if (countHorizontal == sizeTable || countVertical == sizeTable) {
            return true;
        }

        if (this.columns[i * sizeTable + i].innerHTML == mark) {
            countRightToLeft++;
        }

        if (this.columns[(sizeTable - 1) * (i + 1)].innerHTML == mark) {
            countLeftToRight++;
        }

    }

    if (countRightToLeft == sizeTable || countLeftToRight == sizeTable) {
        return true;
    }

    return false;
};

GameTicTac.prototype.empty = function() {
    for (var i = 0; i < this.columns.length; i++) {
        this.columns[i].innerHTML = '';
        this.columns[i].classList.remove(this.marks.X);
        this.columns[i].classList.remove(this.marks.O);

    }
    this.marks.count = 0;
};

GameTicTac.prototype.reset = function() {
    this.empty();
    this.scores = {
        X: 0,
        O: 0
    };
};




var placeholder = document.getElementById("placeholder");

var tictactoe = new GameTicTac(placeholder, 3, onResult);

function onResult(result, scores) {
    if (result == 'draw') {
        alert("Remis");
    } else {
        alert(result + " wygrał");
        updateScoreUsers(scores.X, scores.O);
    }
    tictactoe.empty();
}

function updateScoreUsers(X, O) {
    document.querySelector("#player1").innerHTML = X;
    document.querySelector("#player2").innerHTML = O;
}

function restart(grid_size) {
    tictactoe.reset();
    updateScoreUsers(0, 0);
    if (grid_size) {
        tictactoe.paint(grid_size);
    }
}