(function(){
    var SG = window.SG = (window.SG || {});





    var Coor = SG.Coor = function(i,j){
        this.i = i;
        this.j = j;
    };

    Coor.prototype.equal = function(other){
        return (this.i == other.i) && (this.j == other.j);
    };

    Coor.prototype.plus = function(other){
        return new Coor(this.i + other.i, this.j + other.j);
    };

    Coor.prototype.isOpposite = function(other){
        return ((this.i ==( -1 * other.i)) && (this.j == (-1 * other.j)));
    }

    var Apple = SG.Apple = function(board){
        this.board = board;
        this.replace();
    };

    Apple.SYMBOL = "A";

    Apple.prototype.valid = function(pos){
        var snake = this.board.snake;
        var result = true;
        snake.segments.forEach(function(seg){
            if (seg.equal(pos)){

                result =  false;
            }
        });

        return result;
    };

    Apple.prototype.replace = function(){
        // var pos = this.board.snake.head();
        // alert(this.valid(this.pos));

        //
        var x = Math.floor(Math.random() * this.board.dim);
        var y = Math.floor(Math.random() * this.board.dim);
        var pos = new Coor(x, y);
        while (!this.valid(pos)){
            var x = Math.floor(Math.random() * this.board.dim);
            var y = Math.floor(Math.random() * this.board.dim);
            var pos = new Coor(x, y);
        }

        this.pos = pos;

    };

    var Snake = SG.Snake = function(board){
        this.board = board;
        this.dir = "N";
        var center = new Coor(this.board.dim/2, this.board.dim/2);
        this.segments =[center];
    };

    Snake.SYMBOL = "S";

    Snake.DIFFS = {
        "N": new Coor(-1,0),
        "S": new Coor(1,0),
        "E": new Coor(0,1),
        "W": new Coor(0, -1)
    };

    Snake.prototype.head = function(){
        return this.segments[this.segments.length -1];
    };

    Snake.prototype.move = function(){

        this.segments.push(this.head().plus(Snake.DIFFS[this.dir]));

        if (!(this.head().equal(this.board.apple.pos) )){
            this.segments.shift();

            if (this.dead()){
                alert("Game Over!");
                this.segments=[];

            }
        } else {
            this.board.apple.replace();
        }
        // alert("done:"+ this.segments.length);

    };

    Snake.prototype.turn = function(dir){
        if ((this.segments.length>1) && (Snake.DIFFS[this.dir].isOpposite(Snake.DIFFS[dir]))){
            return;
        } else {
            this.dir = dir;
        }
    };

    Snake.prototype.dead = function(){
        var snake = this;
        var row = this.head().i;
        var col = this.head().j;
        if(row<0 || row >= this.board.dim || col<0 || col >= this.board.dim){
            return true;
        } else {
            this.segments.forEach(function(seg){
                if(seg == snake.head()){
                    return true;
                }
            });
            return false;
        }
    };

    var Board = SG.Board = function(dim){
        this.dim = dim;
        this.snake = new Snake(this);
        this.apple = new Apple(this);
    };

     Board.EMPTY = ".";

    Board.blankGrid = function(dim){
        var grid = [];
        for (var i=0; i < dim; i++){
            var row = [];
            for (var j =0; j < dim; j++){
                row.push(Board.EMPTY);
            }
            grid.push(row);
        }
        return grid;
    };

    Board.prototype.render = function(){
        var grid = Board.blankGrid(this.dim);

        this.snake.segments.forEach(function(seg){
            grid[seg.i][seg.j] = Snake.SYMBOL;
        });

        grid[this.apple.pos.i][this.apple.pos.j] = Apple.SYMBOL;

        grid.map(function(row){
            return row.join("");
        }).join("\n");
    };

})();