$(function () {
    //获取发牌时保存的所有玩家数组
    var SZ = JSON.parse(localStorage.getItem('key'));
    console.log(SZ);
    //获取发牌时保存的杀手数组
    var SS = JSON.parse(localStorage.getItem('SS'));
    console.log(SS);
    //获取发牌时保存的平民数组
    var PM = JSON.parse(localStorage.getItem('PM'));
    console.log(PM.length);
    //获取杀人时保存的死亡玩家数组
    var ii = JSON.parse(localStorage.getItem('ii'));
    console.log(ii);
    //获取法官台本状态机状态
    var gameStateDate = localStorage.getItem('gameStateDate');
    console.log(gameStateDate);
    var backScore = localStorage.getItem('backScore');
    console.log(backScore);



    //当前页面的一些元素节点


    var footButton = $(".foot-button");
    var boxO = $(".boxO").eq(0);
    boxO.text(SZ[0]);
    //克隆元素,添加文本节点
    for (let i = 0; i < SZ.length - 1; i++) {
        var mainOne = $(".mainOne").eq(0);
        var cloneElement = mainOne.clone(true);
        var main = $("main");
        main.append(cloneElement);
        $(".boxO").eq(i + 1).text(SZ[i + 1]);
        $(".boxT").eq(i + 1).text((i + 2) + "号");
    }
    if (gameStateDate && backScore != 1) {
        createTitle();
        createNife();
    }
    if (gameStateDate) {
        var backhome = $("#backhome");
        var off = $("#off");
        var header = $("header");
        backhome.css({
            "display": "none"
        });
        off.css({
            "display": "none"
        });
        header.css({
            "justify-content": "center"
        });
        if (ii) {
            for (let i = 0; i < ii.length; i++) {
                var mainOnes = $(".mainOne");
                mainOnes.eq(ii[i]).find(".boxO").css({
                    "background-color": "gray"
                });
            }
        }
    }
    if (backScore == 1) {
        footButton.text("继续游戏");
    }
    //标题栏信息以及按钮信息
    function createTitle() {
        var font = $(".font");
        var mainTitle = $(".main-one");
        var mainTitleFa = mainTitle.parent();
        mainTitleFa.css({
            "display": "block"
        });
        var mainThree = $(".main-three");
        mainThree.css({
            "display": "block"
        });
        footButton.text("确定");
        if (gameStateDate == "killer") {
            font.text("杀手杀人");
            mainTitleFa.find("div").text("杀手请睁眼，杀手请选择要杀的对象");
            mainThree.find("div").text("点击下方玩家头像，对被杀的对象进行标记");
        }
        if (gameStateDate == "a") {
            font.innerHTML = "投票";
            mainTitleFa.find("div").text("发言讨论结束");
            mainThree.find("div").text("点击得票数最多的人的头像");
        }
    }
    //为每个格子添加显示小刀图标并为按钮添加onclick事件
    function createNife() {
        var mainOnes = $(".mainOne");
        for (let i = 0; i < SZ.length; i++) {
            mainOnes.eq(i).click(function () {
                //初始化
                for (let i = 0; i < SZ.length; i++) {
                    var dropDown = $(".drop-down").eq(i);
                    dropDown.css({
                        "display": "none"
                    });
                }
                //改变小图标的显示方式
                var dropDown = $(".drop-down").eq(i);
                dropDown.css({
                    "display": "block"
                });
                footButton.unbind('click');
                footButton.click(function () {
                    //控制死人不能杀
                    if (ii) {
                        for (let a = 0; a < ii.length; a++) {
                            if (ii[a] == i) {
                                alert("请选择活着的人！");
                                a = 100;
                                return;
                            }
                        }
                    }
                    //在白天情况下不能杀狼人
                    if (gameStateDate == "killer" && mainOnes.eq(i).children(".boxO").text() == "杀手") {
                        alert("请选择需要干死的平民！");
                        return false;
                    }

                    //将死人的背景色改为gry 并将下表push到ii数组中
                    if (mainOnes.eq(i).children(".boxO").text() == "平民") {
                        PM.splice(0, 1);
                        localStorage.setItem("PM", JSON.stringify(PM));
                    } else {
                        SS.splice(0, 1);
                        localStorage.setItem("SS", JSON.stringify(SS));
                    }
                    //将死亡的人的元素节点下表保存到ii数组中
                    if (!ii) {
                        ii = [];
                    }
                    ii.push(i);
                    localStorage.setItem("ii", JSON.stringify(ii));
                    //分出胜负
                    if (PM.length == 0 || SS.length == 0 || SS.length == PM.length) {
                        location.href = "gameResult.html";
                        return;
                    }

                    location.href = "JudgeDesk.html";
                });
            });
        }
    }
    footButton.click(function () {
        
        if (gameStateDate && backScore != 1) {
            for (let i = 0; i < SZ.length; i++) {
                var dropDown = $(".drop-down").eq(i);
                if (dropDown.css("display") == "none") {
                    alert("请选择你需要干死的对象！");
                    i = 100;
                    return;
                }
            }
        }
        backScore = 0;
        localStorage.setItem("backScore", JSON.stringify(backScore));
        location.href = "JudgeDesk.html";
    });
    var close = $(".close");
    close.click(function () {
        var r = confirm("确定退出游戏？");
        if (r == true) {
            location.href = "version.html";
        } else {
            alert("您已取消！");
        }
    });

});