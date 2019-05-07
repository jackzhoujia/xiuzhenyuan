$(function () {
    window.onload = mathching;
    var playerElement = $("#quantity"); //获取玩家总数量输入框元素节点
    var killerElement = $("#killer"); //获取杀手输入框元素节点
    //按照比例分配杀手与平民并添加到数组中
    function mathching() {
        var SZ = [];
        var SS = [];
        var PM = [];
        var playerTotal = parseInt(playerElement.val());
        if (playerTotal < 4 || playerTotal > 18) {
            playerTotal = "";
        }
        var killerTotal = parseInt(Math.floor(playerTotal / 3));
        killerElement.val(killerTotal);
        var civilianTotal = parseInt(playerTotal - killerTotal);
        var civilianElement = $("#civilian"); //获取平民输入框元素节点
        civilianElement.val(civilianTotal);
        for (var i = 0; i < killerTotal; i++) {
            SZ.push("杀手");
            SS.push("杀手");
        }
        for (var i = 0; i < civilianTotal; i++) {
            SZ.push("平民");
            PM.push("平民");
        }
        //数组乱序
        SZ = shuffle(SZ);
        localStorage.setItem("key", JSON.stringify(SZ)); //保存总数据
        localStorage.setItem("SS", JSON.stringify(SS)); //保存杀手数据集合
        localStorage.setItem("PM", JSON.stringify(PM)); //保存平民数据集合
    }
    //输入事件
    playerElement.bind('input propertychange', function () {
        var x = /\D/g; //定义正则，非数字规则
        var aa = playerElement.val();
        playerElement.val(aa.replace(x, "")); // 符合正则规则替换为空值
        mathching();
    });

    //数组乱序
    function shuffle(a) {
        var b = [];
        while (a.length) {
            var index = Math.floor(Math.random() * a.length);
            b.push(a[index]);
            a.splice(index, 1);
        }
        return b;
    }

    // function shuffle2(A) {
    //     var input = A;
    //     for (var i = input.length - 1; i >= 0; i--) {
    //         var randomIndex = Math.floor(Math.random() * (i + 1));
    //         var itemAtIndex = input[randomIndex];
    //         input[randomIndex] = input[i];
    //         input[i] = itemAtIndex;
    //     }
    //     return input;
    // }


    var footButton = $(".foot-button");
    footButton.click(function () {
        if (killerElement.val() > 0) {
            location.href = "Identity.html";
        } else {
            alert("请填写正确的玩家数量！");
        }
    });
});