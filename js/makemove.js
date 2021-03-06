/**
 * @file MakeMove
 * @author Cameron Terry <cwterry314@gmail.com>
 * @version 0.1
 */


/**
 * Moves the piece on the gui if possible.
 * @param {string} from - the square name to move from (note from is lowercase)
 * @param {string} to - the square name to move to (note to is lowercase)
 * @returns if the move can be made on the gui
 */
function makeMove(from, to) {
    // convert so they can be searched in SQUARES
    from = SQUARES[from.toUpperCase()];
    to = SQUARES[to.toUpperCase()];

    var castled = false; // check for castle later
    var promoted = false; // check for promotion later

    /* first check for castle */
    if (gameBoard.side == COLORS.WHITE) {
        if (from == SQUARES.D1 && to == SQUARES.B1) {
            // is king on correct square?
            if (gameBoard.area[SQUARES.D1].piece == PIECES.KING && gameBoard.area[SQUARES.D1].color == COLORS.WHITE) {
                var canCastle = gameBoard.checkCastle();

                if (canCastle) {
                    castled = true;

                    var piece_moved = movePiece(from, to, gameBoard);

                    if (piece_moved) { piece_moved = movePiece(SQUARES.A1, SQUARES.C1, gameBoard); }

                    if (piece_moved) {
                        updateBoard();
                        gameBoard.whiteCastle = false;
                        gameBoard.createFen();
                        updateFenGUI();
//                        gameBoard.printBoard();

                        // check for game over
                        gameBoard.checkState();

                        if (gameBoard.gameOver) {
                            gameBoard.side = -1;
                        } else {
                            gameBoard.side ^= 1;
                            // look for check
                            if (gameBoard.inCheck()) {
                                // find king square on board
                                var found_king = false;
                                for (var i = 0; i < gameBoard.area.length; i++) {
                                    found_king = gameBoard.area[i].piece == PIECES.KING && gameBoard.area[i].color == gameBoard.side;

                                    if (found_king) {
                                        var sq_name = '#' + gameBoard.printSq(i);
                                        if (gameBoard.side == COLORS.WHITE) {
                                            $(sq_name).attr("src","img/wK_check.png");
                                        } else {
                                            $(sq_name).attr("src","img/bK_check.png");
                                        }
                                    }
                                }
                            }

                        }

                        return true;
                    }
                }
            }
        }
    } else {
         if (from == SQUARES.D6 && to == SQUARES.B6) {
            // is king on correct square?
            if (gameBoard.area[SQUARES.D6].piece == PIECES.KING && gameBoard.area[SQUARES.D6].color == COLORS.BLACK) {
                var canCastle = gameBoard.checkCastle();

                if (canCastle) {
                    castled = true;

                    var piece_moved = movePiece(from, to, gameBoard);

                    if (piece_moved) { piece_moved = movePiece(SQUARES.A6, SQUARES.C6, gameBoard); }

                    if (piece_moved) {
                        updateBoard();
                        gameBoard.blackCastle = false;
                        gameBoard.createFen();
                        updateFenGUI();
//                        gameBoard.printBoard();

                        // check for game over
                        gameBoard.checkState();

                        if (gameBoard.gameOver) {
                            gameBoard.side = -1;
                        } else {
                            gameBoard.side ^= 1;
                            // look for check
                            if (gameBoard.inCheck()) {
                                // find king square on board
                                var found_king = false;
                                for (var i = 0; i < gameBoard.area.length; i++) {
                                    found_king = gameBoard.area[i].piece == PIECES.KING && gameBoard.area[i].color == gameBoard.side;

                                    if (found_king) {
                                        var sq_name = '#' + gameBoard.printSq(i);
                                        if (gameBoard.side == COLORS.WHITE) {
                                            $(sq_name).attr("src","img/wK_check.png");
                                        } else {
                                            $(sq_name).attr("src","img/bK_check.png");
                                        }
                                    }
                                }
                            }
                        }

                        return true;
                    }
                }
            }
        }
    }

    /* next check for promotion */
    if (gameBoard.side == COLORS.WHITE) {
        // is pawn advancing to opponent's first rank?
        if (((to == SQUARES.A6 || to == SQUARES.B6 || to == SQUARES.C6 || to == SQUARES.D6)) && gameBoard.area[from].piece == PIECES.PAWN
            && gameBoard.area[from].color == COLORS.WHITE) {
            promoted = movePiece(from, to, gameBoard);

            if (promoted) {
                gameBoard.area[to].piece = PIECES.QUEEN;
                gameBoard.area[to].color = COLORS.WHITE;
                updateBoard();
                gameBoard.createFen();
                updateFenGUI();
//                gameBoard.printBoard();
                gameBoard.fiftymove = 0;

                gameBoard.checkState();

                if (gameBoard.gameOver) {
                    gameBoard.side = -1;
                } else {
                    gameBoard.side ^= 1;
                    // look for check
                    if (gameBoard.inCheck()) {
                        // find king square on board
                        var found_king = false;
                        for (var i = 0; i < gameBoard.area.length; i++) {
                            found_king = gameBoard.area[i].piece == PIECES.KING && gameBoard.area[i].color == gameBoard.side;

                            if (found_king) {
                                var sq_name = '#' + gameBoard.printSq(i);
                                if (gameBoard.side == COLORS.WHITE) {
                                    $(sq_name).attr("src","img/wK_check.png");
                                } else {
                                    $(sq_name).attr("src","img/bK_check.png");
                                }
                            }
                        }
                    }
                }

                return true;
            }
        }
    } else {
        // is pawn advancing to opponent's first rank?
        if (((to == SQUARES.A1 || to == SQUARES.B1 || to == SQUARES.C1 || to == SQUARES.D1)) && gameBoard.area[from].piece == PIECES.PAWN
            && gameBoard.area[from].color == COLORS.BLACK) {
            promoted = movePiece(from, to, gameBoard);

            if (promoted) {
                gameBoard.area[to].piece = PIECES.QUEEN;
                gameBoard.area[to].color = COLORS.BLACK;
                updateBoard();
                gameBoard.createFen();
                updateFenGUI();
//                gameBoard.printBoard();
                gameBoard.fiftymove = 0;

                gameBoard.checkState();

                if (gameBoard.gameOver) {
                    gameBoard.side = -1;
                } else {
                    gameBoard.side ^= 1;
                    // look for check
                    if (gameBoard.inCheck()) {
                        // find king square on board
                        var found_king = false;
                        for (var i = 0; i < gameBoard.area.length; i++) {
                            found_king = gameBoard.area[i].piece == PIECES.KING && gameBoard.area[i].color == gameBoard.side;

                            if (found_king) {
                                var sq_name = '#' + gameBoard.printSq(i);
                                if (gameBoard.side == COLORS.WHITE) {
                                    $(sq_name).attr("src","img/wK_check.png");
                                } else {
                                    $(sq_name).attr("src","img/bK_check.png");
                                }
                            }
                        }
                    }
                }

                return true;
            }
        }
    }

    /* normal move */
    if (!castled && !promoted) {

        var possible_moves = [];

        var sq = gameBoard.area[from];
        var p_move = [];

        if (!sq.piece == PIECES.EMPTY && sq.color == gameBoard.side) {
            var p_move = [];
            if (!sq.offboard) {
                p_move = gameBoard.createMoves(from, sq.piece);
                if (p_move.length > 0) {
                    for (var m in p_move) {
                        possible_moves.push(p_move[m]);
                    }
                }
            }
        }

        gameBoard.moves = possible_moves;

//        console.log('making move from ' + from + ' to ' + to + '.');

        if (gameBoard.moves.length > 0) {
            for (var move in gameBoard.moves) {
                if (move.length > 0) {
                    try {
                        if (gameBoard.moves[move][0] == from && gameBoard.moves[move][1] == to) {
                            var captured_piece = gameBoard.area[to].piece;
                            var piece_moved = movePiece(from, to, gameBoard);

                            if (piece_moved) {
                                // is it a capture?
                                if (captured_piece != PIECES.EMPTY) {
                                    gameBoard.fiftymove = 0;
                                }
                                /* check if rook or king move */

                                if (gameBoard.side == COLORS.WHITE) {
                                    if (((gameBoard.area[to].piece == PIECES.ROOK) && (gameBoard.area[to].color == COLORS.WHITE))
                                    || ((gameBoard.area[to].piece == PIECES.KING) && (gameBoard.area[to].color == COLORS.WHITE))) {
                                        gameBoard.whiteCastle = false;
                                    }
                                } else {
                                    if (((gameBoard.area[to].piece == PIECES.ROOK) && (gameBoard.area[to].color == COLORS.BLACK))
                                     || ((gameBoard.area[to].piece == PIECES.KING) && (gameBoard.area[to].color == COLORS.BLACK))) {
                                        gameBoard.blackCastle = false;
                                     }
                                }

                                updateBoard();
                                gameBoard.createFen();
                                updateFenGUI();
//                                gameBoard.printBoard();

                                gameBoard.checkState();

                                if (gameBoard.gameOver) {
                                    gameBoard.side = -1;
                                } else {
                                    gameBoard.side ^= 1;
                                    // look for check
                                    if (gameBoard.inCheck()) {
                                        // find king square on board
                                        var found_king = false;
                                        for (var i = 0; i < gameBoard.area.length; i++) {
                                            found_king = gameBoard.area[i].piece == PIECES.KING && gameBoard.area[i].color == gameBoard.side;

                                            if (found_king) {
                                                var sq_name = '#' + gameBoard.printSq(i);
                                                if (gameBoard.side == COLORS.WHITE) {
                                                    $(sq_name).attr("src","img/wK_check.png");
                                                } else {
                                                    $(sq_name).attr("src","img/bK_check.png");
                                                }
                                            }
                                        }
                                    }
                                }

                                return true;
                            }
                        }
                    } catch(err) {
                        continue;
                    }
                }
            }
        } else {
            return false;
        }
    }

    return false;
}

/**
 * Moves the piece on a game board if possible.
 * @param {number} from - the square to move from
 * @param {number} to - the square to move to
 * @returns {boolean} if piece was moved
 */
function movePiece(from, to, board) {
    // save in case move is not valid
    var from_pce = board.area[from].piece;
    var from_color = board.area[from].color;
    var to_pce = board.area[to].piece;
    var to_color = board.area[to].color;

    board.area[from].piece = PIECES.EMPTY;
    board.area[from].color = COLORS.NONE;
    board.area[to].piece = from_pce;
    board.area[to].color = board.side;

//    console.log("in check: " + board.inCheck() + ", side white: " + (board.side == COLORS.WHITE));
    if (board.inCheck()) {
        takeMove(from, to, from_pce, to_pce, from_color, to_color, board);
        return false;
    }

    return true;
}

function takeMove(from, to, from_pce, to_pce, from_color, to_color, board) {
    board.area[to].piece = to_pce;
    board.area[from].piece = from_pce;
    board.area[from].color = from_color;
    board.area[to].color = to_color;
}