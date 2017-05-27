/**
 * Created by wangyiming on 2017/5/27.
 */

/******** 1 获取元素 **********/
let gobang = document.querySelector("#gobang");
let conText = gobang.getContext("2d");

/******** 2 定义变量 **********/
//判断是下黑棋还是下白棋;
let me = true;
//存放棋盘的状态
let chessStatus = [];

/**
 * 初始化棋盘
 */
function init() {
    //初始化棋盘
    for (let i = 0; i < 15; i++) {
        chessStatus[i] = [];
        for (let j = 0; j < 15; j++) {
            chessStatus[i][j] = 0;
        }
    }
    drawChessBord();
}

init();

/**
 * 绘制棋盘
 */
function drawChessBord() {
    conText.strokeStyle = "#BFBFBF";
    for (let i = 0; i < 15; i++) {
        conText.moveTo(15 + 30 * i, 15);
        conText.lineTo(15 + 30 * i, 435);
        conText.stroke();
        conText.moveTo(15, 15 + 30 * i);
        conText.lineTo(435, 15 + 30 * i);
        conText.stroke();
    }
}

/**
 * 绘制棋子
 * @param i 棋盘列的索引
 * @param j 棋盘行的索引
 * @param me 决定下黑棋还是白棋
 */
let oneTstepn = (i, j, me) => {
    conText.beginPath();
    conText.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
    conText.closePath();
    let gradinet = conText.createRadialGradient(15 + i * 30 - 2, 15 + j * 30 - 2, 13, 15 + i * 30 - 2, 15 + j * 30 - 2, 0);
    if (me) {
        gradinet.addColorStop(0, "#0A0A0A");
        gradinet.addColorStop(1, "#636766");
    } else {
        gradinet.addColorStop(0, "#D1D1D1");
        gradinet.addColorStop(1, "#F9F9F9");
    }
    conText.fillStyle = gradinet;
    conText.fill();
    conText.stroke();
}

/**
 *  棋盘点击落子;
 * @param e 事件对象;
 */
gobang.onclick = e => {
    let {layerX: x, layerY: y} = e;
    x = x / 30 | 0;
    y = y / 30 | 0;
    if (!chessStatus[x][y]) {
        oneTstepn(x, y, me);
        if (me) chessStatus[x][y] = 1;
        else chessStatus[x][y] = 2;
        me = !me;
    }
}