$(function () {
    //获取杀人时保存的死亡玩家数组
    var ii = JSON.parse(localStorage.getItem('ii'));
    console.log(ii);
    //获取发牌时保存的所有玩家数组
    var SZ = JSON.parse(localStorage.getItem('key'));
    console.log(SZ);
    //获取发牌时保存的杀手数组
    var SS = JSON.parse(localStorage.getItem('SS'));
    console.log(SS);
    //获取发牌时保存的平民数组
    var PM = JSON.parse(localStorage.getItem('PM'));
    console.log(PM);

    var main = $(".main");
    var Main = $("main");
    var headT1 = $(".headT1");

    if (SS.length == 0) {
        headT1.text("平民胜利");
    } else if (SS.length == PM.length) {
        headT1.text("卧底胜利");
    } else if(PM.length == 0){
        headT1.text("卧底胜利");
    }else{
        headT1.text("游戏结束");
    }
    var killer = $(".killer");
    var people = $(".people");
    killer.text("杀手" + SS.length + "人");
    people.text("平民" + PM.length + "人");


    var chnNumChar = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
    if (ii) {
        for (let i = 0; i < ii.length / 2 - 1; i++) {
            var cloneElement = main.clone(true);
            Main.append(cloneElement);
            var title = $(".title");
            title[i + 1].innerHTML = "第" + chnNumChar[i + 1] + "天";
        }
        var day = $(".day");
        for (let i = 0; i < ii.length; i++) {
            if (i % 2 == 0 || i == 0) {
                day.eq(i).text("晚上:" + (ii[i] + 1) + "被杀手杀死," + (ii[i] + 1) + "号是" + SZ[ii[i]]);
            } else {
                day.eq(i).text("白天:" + (ii[i] + 1) + "被全民投票投死," + (ii[i] + 1) + "号是" + SZ[ii[i]]);
            }
        }
    }
    var footButton = $(".foot-button");
    footButton.click(function () {
        location.href = "version.html";
        localStorage.clear();
    });
});