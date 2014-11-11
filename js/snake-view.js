(function(){
    var SG = window.SG = (window.SG || {});

    var View = SG.View = function($el){

        this.$el = $el;

        this.board = new SG.Board(20);

        this.render();

        $(window).on("keydown", this.handleKeyEvent.bind(this));

    };

    View.prototype.handleKeyEvent = function(event){
        if(event.which == 37){
            this.board.snake.turn("W");

        } else if(event.which == 38){
            this.board.snake.turn("N");

        } else if (event.which ==39){
            this.board.snake.turn("E");

        } else if (event.which ==40){

            this.board.snake.turn("S");

        } else {

        };

        this.board.snake.move();
        this.render();

    };

    View.prototype.render = function(){

        this.$el.empty();
        var view = this;
        var board = this.board;
        for (var i=0; i < board.dim; i++){
            var $row = $("<div>");
            for(var j=0; j < board.dim;j++){
                var $cell = $('<div class="cell"></div>');
                board.snake.segments.forEach(function(seg){
                    if(seg.i==i && seg.j==j){
                        $cell.addClass("snake");
                    };
                    if(i == board.snake.head().i && j == board.snake.head().j){
                        $cell.addClass("head");

                    }

                });
                if (board.apple.pos.i==i && board.apple.pos.j ==j){
                    $cell.addClass("apple");
                }
                $row.append($cell);
            }
            view.$el.append($row);
        }


    }
})();