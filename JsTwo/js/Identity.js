$(function () {
    // 获取发牌时保存的数据
    var SZ = JSON.parse(localStorage.getItem('key'));
    console.log(SZ);
    //获取身份号元素节点
    var IdentityNumberElement = $("#IdentityNumber");
    //获取身份照片元素节点
    var IdentityAvatarElement = $("#IdentityAvatar");
    //获取身份描述元素节点
    var IdentityStatementElement = $("#IdentityStatement");
    //获取按钮元素节点
    var FootButtonElement = $(".foot-button");
    var IdentityAvatar = 1;
    //初始化
    IdentityNumberElement.text(IdentityAvatar);
    FootButtonElement.text("查看" + IdentityAvatar + "号身份");
    //查看信息
    function ViewIdentity() {
        IdentityNumberElement.text(IdentityAvatar);
        FootButtonElement.text("查看" + IdentityAvatar + "号身份");
        IdentityAvatarElement.attr("src", "img/block.png");
        IdentityStatementElement.text("");
    }
    //隐藏信息
    function HiddenIdentity() {
        IdentityAvatarElement.attr("src", "img/none.png");
        IdentityStatementElement.text(SZ[IdentityAvatar - 1]);
        FootButtonElement.text("隐藏并传递" + (IdentityAvatar + 1) + "号");
        IdentityAvatar++;
        if (IdentityAvatar > SZ.length) {
            FootButtonElement.text("法官查看");
            FootButtonElement.click(function () {
                location.href = "JudgeLog.html";
            });
        }
    }

    FootButtonElement.click(function () {
        var imgSrc = IdentityAvatarElement.attr("src");
        if (imgSrc == "img/block.png") {
            HiddenIdentity();
        }
        if (imgSrc == "img/none.png") {
            ViewIdentity();
        }
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