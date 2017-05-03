var COLS = 10, ROWS = 20;  // 横10、縦20マス
var board = [];  // 盤面情報
var lose;  // 一番上までいっちゃったかどうか
var interval;  // ゲームを実行するタイマーを保持する変数
var current; // 今操作しているブロックの形
var currentX, currentY; // 今操作しているブロックの位置

// 操作するブロックのパターン
var shapes = [
    [ 1, 1, 1, 1 ],
    [ 1, 1, 1, 0,
      1 ],
    [ 1, 1, 1, 0,
      0, 0, 1 ],
    [ 1, 1, 0, 0,
      1, 1 ],
    [ 1, 1, 0, 0,
      0, 1, 1 ],
    [ 0, 1, 1, 0,
      1, 1 ],
    [ 0, 1, 0, 0,
      1, 1, 1 ]
];

// ブロックの色
var colors = [
    'cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'purple'
];

// 盤面をまっさらにする
// 盤面上では、0 = 何もない、 1 ～ ブロック を表す
// ブロックが 1 ～ なのは、それぞれの番号が色を表す
// y,x は左上か(0,0)を表す。
function init() {
  for ( var y = 0; y < ROWS; ++y ) {
    board[ y ] = [];
    for ( var x = 0; x < COLS; ++x ) {
      board[ y ][ x ] = 0;
    }
  }
}

// 新しい操作ブロックをセットする
// shapes から談ダムにブロクのパターンを出力し、盤面の一番上にセットする
function newShape() {
  var id = Math.floor( Math.random() * shapes.length );  // ランダムにインデックスを出す
  var shape = shapes[ id ];
  // パターンを操作ブロックへセットする
  current = [];
  for ( var y = 0; y < 4; ++y ) {
    current[ y ] = [];
    for ( var x = 0; x < 4; ++x ) {
      var i = 4 * y + x;
      if ( typeof shape[ i ] != 'undefined' && shape[ i ] ) {
        current[ y ][ x ] = id + 1;
      }
      else {
        current[ y ][ x ] = 0;
      }
    }
  }
  // ブロックを盤面の上のほうにセットする
  currentX = 5;
  currentY = 0;
}

// メインのループ処理
// ゲームが始めると250ミリ秒毎に呼び出される tick()
// 1. 操作ブロックを下へ1ずらし
// 2. 操作ブロックが着地したら消去処理、ゲームオーバーの判定も行う
// valid() はその方向への移動出来るかどうかを返す関数
// freeze() は操作ブロックを盤面へ固定する関数
// clearLines() はブロックを消去出来るかどうか判別し、出来るなら処理する
function tick() {
  // １つ下へ移動する
  if ( valid( 0, 1 ) ) {
    ++currentY;
  }
  // もし着地していたら(１つしたにブロックがあったら)
  else {
    freeze();  // 操作ブロックを盤面へ固定する
    clearLines();  // ライン消去処理
    if (lose) {
      // もしゲームオーバなら最初から始める
      newGame();
      return false;
    }
    // 新しい操作ブロックをセットする
    newShape();
  }
}
// その方向へ操作ブロックを移動できるかどうかを返す
// 基本気に現在の操作ブロックがその方向（offsetX, offsetY）に動いたら、とうものを判定する
// newCurrent という引数を取った場合、そのブロックがその方向に動いたらというものを判定する
// 以下の場合をfalseを返し、そうでない場合をtrueを返す
// ・移動先が盤面外だった場合
// ・移動先に既に色のますが存在した場合
// もし、操作ブロックが盤面上に存在した場合は、ゲームオーバーにする
// lose フラグを true にする

// 指定された方向に、操作ブロックが動かせるかどうかチェックする
// ゲームオーバー判定もココで行う
function valid( offsetX, offsetY, newCurrent ) {
  offsetX = offsetX || 0;
  offsetY = offsetY || 0;
  offsetX = currentX + offsetX;
  offsetY = currentY + offsetY;
  newCurrent = newCurrent || current;
  for ( var y = 0; y < 4; ++y ) {
    for ( var x = 0; x < 4; ++x ) {
      if ( newCurrent[ y ][ x ] ) {
        if ( typeof board[ y + offsetY ] == 'undefined'
             || typeof board[ y + offsetY ][ x + offsetX ] == 'undefined'
             || board[ y + offsetY ][ x + offsetX ]
             || x + offsetX < 0
             || y + offsetY >= ROWS
             || x + offsetX >= COLS ) {
                    if (offsetY == 1 && offsetX - currentX == 0 && offsetY - currentY == 1) {
                        console.log('game over');
                        lose = true; // もし操作ブロックが盤面の上にあったらゲームオーバーにする
                    }
               return false;
             }
      }
    }
  }
  return true;
}

// 操作ブロックを盤面にセットする関数
// 操作ブロックが着地する際に呼び出される
function freeze(){
  for ( var y = 0; y < 4; ++y ) {
    for ( var x = 0; x < 4; ++x ) {
      if ( current[y][x] ) {
        board[y + currentY][x + currentX] = current[y][x];
      }
    }
  }
}

// freeze関数が呼び出された直後に実行される
// 処理の流れとしては以下
// ・1行がそろっている場所を調べる
// ・揃っていたらその上にあったブロックを1ずつずらず（消去）
// 1行がそろっているかどうかは rowFilled変数に代入する
function clearLines(){
  for ( var y = ROWS - 1; y >= 0; --y ){
    var rowFilled = true;
    // 1行がそろっているか調べる
    for ( var x = 0; x < COLS; ++x ) {
      if ( board[y][x] == 0 ) {
        rowFilled = false;
        break;
      }
    }
    
    // もし1っ行揃っていたら、それらを消す
    if ( rowFilled ) {
      // その上にあったブロックを一つずつ消していく
      for ( var yy = y; yy > 0; --yy ) {
        for ( var x = 0; x < COLS; ++x ) {
          board[yy][x] = board[yy - 1][x];
        }
      }
      ++y; // 1行落としたのでチェック処理を一つ下へ送る
    }
  }
}
// 新しいゲームを始めるメソッド
function newGame() {
  clearInterval(interval);  // ゲームタイマーをクリア
  init();  // 盤面をまっさらにする
  newShape();  // 操作ブロックをセット
  lose = false;  // 負けフラッグ
  interval = setInterval( tick, 250 );  // 250ミリ秒ごとにtickという関数を呼び出す
}

newGame();