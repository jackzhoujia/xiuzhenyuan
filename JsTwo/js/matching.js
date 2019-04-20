
window.onload = mathching;
var playerElement = document.getElementById("quantity");//获取玩家总数量节点元素
var killerElement = document.getElementById("killer");//获取杀手节点元素
var civilianElement = document.getElementById("civilian");//获取平民节点元素
var SZ = new Array;
function mathching() {
    SZ = [];
    var playerTotal = parseInt(playerElement.value);
    if (playerTotal < 4 || parseInt(playerTotal) > 18) {
        playerTotal = "";
    }
    var killerTotal = parseInt(Math.floor(playerTotal / 3));
    var civilianTotal = parseInt(playerTotal - killerTotal);
    killerElement.value = killerTotal;
    civilianElement.value = civilianTotal;
    for (var i = 0; i < killerTotal; i++) {
        SZ.push("杀手");
    }
    for (var i = 0; i < civilianTotal; i++) {
        SZ.push("平民");
    }
    SZ = shuffle(SZ);
    console.log(SZ);
}
//输入事件
playerElement.oninput = function () {
    var x = /\D/g; //定义正则，非数字规则
    this.value = this.value.replace(x, ""); // 符合正则规则替换为空值
    mathching();
}
//数组乱序
function shuffle(a) {
    var b = [];
    while (a.length) {
        var index = ~~(Math.random() * a.length);
        b.push(a[index]);
        a.splice(index, 1);
    }
    return b;
}



