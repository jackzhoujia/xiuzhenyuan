// 获取发牌时保存的数据
var SZ = JSON.parse(localStorage.getItem('key'));
console.log(SZ);
//获取身份号元素节点
var IdentityNumberElement = document.getElementById("IdentityNumber");
//获取身份照片元素节点
var IdentityAvatarElement = document.getElementById("IdentityAvatar");
//获取身份描述元素节点
var IdentityStatementElement = document.getElementById("IdentityStatement");
//获取按钮元素节点
var FootButtonElement = document.getElementsByClassName("foot-button")[0];


var IdentityAvatar = 1;
//初始化
IdentityNumberElement.innerHTML = IdentityAvatar;
FootButtonElement.innerHTML = "查看" + IdentityAvatar + "号身份";
//查看信息
function ViewIdentity() {
    IdentityNumberElement.innerHTML = IdentityAvatar;
    FootButtonElement.innerHTML = "查看" + IdentityAvatar + "号身份";
    IdentityAvatarElement.setAttribute("src", "img/block.png");
    IdentityStatementElement.innerHTML = "";
}
//隐藏信息
function HiddenIdentity() {
    IdentityAvatarElement.setAttribute("src", "img/none.png");
    IdentityStatementElement.innerHTML = SZ[IdentityAvatar - 1];
    FootButtonElement.innerHTML = "隐藏并传递" + (IdentityAvatar + 1) + "号";
    IdentityAvatar++;
    if (IdentityAvatar > SZ.length) {
        FootButtonElement.innerHTML = "法官查看"
        FootButtonElement.onclick = function () {
            location.href = "JudgeLog.html";
        }
    }
}


function aa() {
    var imgSrc = IdentityAvatarElement.getAttribute("src");
    if (imgSrc == "img/block.png") {
        HiddenIdentity();
    }
    if (imgSrc == "img/none.png") {
        ViewIdentity();
    }
}