//获取发牌时保存的所有玩家数组
var SZ = JSON.parse(localStorage.getItem('key'));
//获取发牌时保存的杀手数组
var SS = JSON.parse(localStorage.getItem('SS'));
//获取发牌时保存的平民数组
var PM = JSON.parse(localStorage.getItem('PM'));
console.log(PM);
//获取杀人时保存的死亡玩家数组
var ii = JSON.parse(localStorage.getItem('ii'));
//获取法官台本状态机状态
var gameStateDate = localStorage.getItem('gameStateDate');
var mainOne = document.getElementsByClassName("mainOne")[0];
var mainOnes = document.getElementsByClassName("mainOne");
var main = document.getElementsByTagName("main")[0];
var boxO = document.getElementsByClassName("boxO")[0];
var boxT = document.getElementsByClassName("boxT")[0];
var footButton = document.getElementsByClassName("foot-button")[0];
//为html中的元素添加文本节点
boxO.innerHTML = SZ[0];
boxT.innerHTML = "1号";
//克隆元素,添加文本节点
for (let i = 0; i < SZ.length - 1; i++) {
    var cloneElement = mainOne.cloneNode(true);
    main.appendChild(cloneElement);
    var item1 = cloneElement.firstElementChild;
    var item2 = item1.nextElementSibling;
    item1.innerHTML = SZ[i + 1];
    item2.innerHTML = (i + 2) + "号";
}
if (gameStateDate == "killer") {
    createTitle();
    if (ii) {
        for (let i = 0; i < ii.length; i++) {
            mainOnes[ii[i]].firstElementChild.style.backgroundColor = "gray";
        }
    }
    createNife();
}
//标题栏信息
function createTitle() {
    footButton.innerHTML = "确定";
    var mainTitle = document.getElementsByClassName("main-one")[0];
    var mainTitleFa = mainTitle.parentNode;
    mainTitleFa.style.display = "block";
    var mainThree = document.getElementsByClassName("main-three")[0];
    mainThree.style.display = "block";
    mainTitleFa.firstElementChild.firstElementChild.innerHTML = "杀手请睁眼，杀手请选择要杀的对象"
    mainThree.lastElementChild.innerHTML = "点击下方玩家头像，对被杀的对象进行标记";
}
//为每个格子添加显示小刀图标
function createNife() {
    for (let i = 0; i < SZ.length; i++) {
        mainOnes[i].onclick = function () {
            //初始化
            for (let i = 0; i < SZ.length; i++) {
                var dropDown = document.getElementsByClassName("drop-down")[i];
                dropDown.style.display = "none";
            }
            //改变小图标的显示方式
            var dropDown = document.getElementsByClassName("drop-down")[i];
            dropDown.style.display = "block";
            footButton.onclick = function () {

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
                if (gameStateDate == "killer") {
                    if (mainOnes[i].firstElementChild.firstChild.nodeValue == "杀手") {
                        alert("请选择需要干死的平民！");
                        return;
                    }
                }
                //将死人的背景色改为gry 并将下表push到ii数组中
                mainOnes[i].firstElementChild.style.backgroundColor = "gray";
                if (mainOnes[i].firstElementChild.firstChild.nodeValue == "平民") {
                    PM.splice(0, 1);
                    console.log(PM.length);
                } else {
                    SS.splice(0, 1);
                }
                location.href = "JudgeDesk.html";
                //将死亡的人的元素节点下表保存到ii数组中
                if (!JSON.parse(localStorage.getItem('ii'))) {
                    ii = [];
                } else {
                    ii = JSON.parse(localStorage.getItem('ii'));
                }
                ii.push(i);
                localStorage.setItem("ii", JSON.stringify(ii));
            }
        }
    }
}

function aa() {
    if (gameStateDate) {
        for (let i = 0; i < SZ.length; i++) {
            var dropDown = document.getElementsByClassName("drop-down")[i];
            if (dropDown.style.display = "none") {
                alert("请选择你需要干死的对象！");
                i = 100;
                return;
            }
        }
    }
    location.href = "JudgeDesk.html";
}