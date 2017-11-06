//Creado con Ardora - www.webardora.net
//bajo licencia Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
//para otros usos contacte con el autor
function initAct() {$(".imaCell_img img").mousedown(function () {imaSel = $(this).parent().attr("id").substring(3, 5);
moveCell(imaSel);
isCorrect();
});
$(".imaCell_img img").dblclick(function (event) {showImage();setTimeout(function () {
document.getElementById("ardoraActCanvas").style.zIndex = 0;document.getElementById("ardoraActCanvas").style["visibility"] = "hidden";
},3000);});
if (tiAval) {parent.iniciaActividade()}}
function showImage(){var canvas = document.getElementById("ardoraActCanvas");document.getElementById("ardoraActCanvas").style.zIndex = 5;
document.getElementById("ardoraActCanvas").style["visibility"] = "visible";canvas.width = canvas.width;var contexto = canvas.getContext("2d");
contexto.fillStyle = colorBack;contexto.fillRect(0, 0, canvas.width, canvas.height);
var ima = new Image();ima.src = original;ima.onload = function(){contexto.drawImage(ima,0,0)}}
function moveCell(init){var yInit=parseInt(init.substring(0,1))-1;var xInit=parseInt(init.substring(1,2))-1;
if (boardGame[xInit][yInit]!="X"){var xIma=-1;var yIma=-1;var xBoard=-1;var yBoard=-1;
if (xInit>0){if (boardGame[xInit-1][yInit]=="X"){xIma=yInit+1;yIma=xInit;
xBoard=xInit;yBoard=yInit;boardGame[xInit-1][yInit]="0";}}
if (xInit<3){if (boardGame[xInit+1][yInit]=="X"){xIma=yInit+1;yIma=xInit+1+1;
xBoard=xInit;yBoard=yInit;boardGame[xInit+1][yInit]="0";}}
if (yInit>0){if (boardGame[xInit][yInit-1]=="X"){xIma=yInit;yIma=xInit+1;
xBoard=xInit;yBoard=yInit;boardGame[xInit][yInit-1]="0";}}
if (yInit<3){if (boardGame[xInit][yInit+1]=="X"){xIma=yInit+1+1;yIma=xInit+1;
xBoard=xInit;yBoard=yInit;boardGame[xInit][yInit+1]="0";}}
if (xIma>-1){changeSrc(init,(xIma).toString()+(yIma).toString());boardGame[xBoard][yBoard]="X";}}}
function changeSrc(fromSrc,toSrc){var celTo; var celFrom; var srcTo; var srcFrom; var nameDivTo="ima"+toSrc+"_img"; var nameDivFrom="ima"+fromSrc+"_img";
celTo=document.getElementById(nameDivTo).getElementsByTagName("img")[0]; celFrom=document.getElementById(nameDivFrom).getElementsByTagName("img")[0]; srcTo=$(celTo).attr("src"); srcFrom=$(celFrom).attr("src");
$(celFrom).fadeOut("fast"); $(celFrom).attr("src",srcTo); $(celFrom).fadeIn("slow");$(celTo).fadeOut("fast");$(celTo).attr("src",srcFrom); $(celTo).fadeIn("slow");
$(celFrom).animate({"left": "0px", "top": "0px"});}
function randomSort() {var randX = Math.floor(Math.random()*4);var randY = Math.floor(Math.random()*4);
var nameDiv = "ima" + (randY+1).toString() + (randX+1).toString() + "_img";var cel = document.getElementById(nameDiv).getElementsByTagName("img")[0];
$(cel).attr("src", whiteCell);boardGame[randX][randY]="X";board[randX][randY]=whiteCell;var newX, newY;
for (i=0; i<1000; i++){var dir = Math.floor(Math.random()*4);if (dir==0){if (randX>0){newX=randX-1;newY=randY;}else{newX=randX+1;newY=randY;}}
if (dir==1){if (randX<3){newX=randX+1;newY=randY;}else{newX=randX-1;newY=randY;}}
if (dir==2){if (randY>0){newX=randX;newY=randY-1;}else{newX=randX;newY=randY+1;}}
if (dir==3){if (randY<3){newX=randX;newY=randY+1;}else{newX=randX;newY=randY-1;}}
var celTo;var celFrom;var srcTo;var srcFrom;var nameDivTo = "ima" + (newY+1).toString()+(newX+1).toString() + "_img";
var nameDivFrom = "ima" + (randY+1).toString()+(randX+1).toString() + "_img";celTo=document.getElementById(nameDivTo).getElementsByTagName("img")[0];
celFrom=document.getElementById(nameDivFrom).getElementsByTagName("img")[0];srcTo = $(celTo).attr("src");srcFrom = $(celFrom).attr("src");
$(celFrom).attr("src", srcTo);$(celTo).attr("src", srcFrom);
boardGame[randX][randY]="0";boardGame[newX][newY]="X";randX=newX;randY=newY;}}
function paintButtonTime(){if (tiTime || tiAttempts || tiScore || tiSuccesses ){clearInterval(timeInterval);}
var canvas = document.getElementById("ardoraActCanvas"); var contexto = canvas.getContext("2d");contexto.globalAlpha = 0.10;contexto.fillStyle = colorButton; contexto.fillRect(0,0,canvas.width,canvas.height);
contexto.font="18px " + fMenssage; var metricsW = contexto.measureText(textButtonTime).width; var x=(canvas.width / 2)-(metricsW / 2); var y=(canvas.height / 2); contexto.beginPath();
contexto.globalAlpha = 1; contexto.lineWidth = 2; contexto.fillStyle = colorBack; var xAnim=canvas.width/2; var wAnim=0;
interval = setInterval(function () { contexto.strokeStyle = colorText; roundedRect(contexto,xAnim,y-20,wAnim,30,5,colorBack);xAnim-=1;wAnim+=2;
if (wAnim>metricsW+30){clearInterval(interval); contexto.shadowColor = "black"; contexto.shadowBlur = 20; contexto.shadowOffsetX = 10; contexto.shadowOffsetY = 10;contexto.stroke();contexto.beginPath();
contexto.textAlign = "left"; contexto.fillStyle = colorText; contexto.fillText(textButtonTime,x,y);contexto.lineWidth = 5;contexto.stroke();}},1);
$("#ardoraActCanvas").mousedown(function(e){ if (tiTime || tiAttempts || tiScore || tiSuccesses ){ timeInterval=setInterval("paintTab()",1000); $("#ardoraActCanvas").css("cursor", "default"); $("#ardoraActCanvas").unbind("mousedown"); }});}
function isCorrect() {var correct = true;successes = 0;
for (i = 0; i <4;i++) {for (j = 0; j<4;j++) {var nameDiv="ima"+(j+1).toString()+(i+1).toString()+"_img";
var cel = document.getElementById(nameDiv).getElementsByTagName("img")[0];
if (board[i][j] != $(cel).attr("src")) {correct = false;} else {successes++;}}}
if (correct) {score=score+scoreInc;showMessage("Ok");}}
function goTime(){clearInterval(timeInterval);showMessage("Time");}
function showSol(oldTypeGame){
for (i = 0; i < 4; i++) {for (j = 0; j < 4; j++) {
var nameDiv = "ima" + (j + 1).toString() + (i + 1).toString() + "_img";
var cel = document.getElementById(nameDiv).getElementsByTagName("img")[0];$(cel).attr("src",board[i][j]);}}
var canvas = document.getElementById("ardoraActCanvas");canvas.width = canvas.width;var contexto = canvas.getContext("2d");contexto.globalAlpha = 0.20;contexto.fillStyle = colorBack;contexto.fillRect(0,0,canvas.width,canvas.height);}
function paintBack(){}
function puzleWords(input) {var output = ""; var chr1, chr2, chr3 = ""; var enc1, enc2, enc3, enc4 = "";var i = 0;
var btest = /[^A-Za-z0-9\+\/\=]/g; if (btest.exec(input)) { alert("Invalid characters");} input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
do { enc1 = wordsStr.indexOf(input.charAt(i++)); enc2 = wordsStr.indexOf(input.charAt(i++)); enc3 = wordsStr.indexOf(input.charAt(i++)); enc4 = wordsStr.indexOf(input.charAt(i++)); chr1 = (enc1 << 2) | (enc2 >> 4); chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);chr3 = ((enc3 & 3) << 6) | enc4;
output = output + String.fromCharCode(chr1);if (enc3 != 64) {output = output + String.fromCharCode(chr2);} if (enc4 != 64) {output = output + String.fromCharCode(chr3);}
chr1 = chr2 = chr3 = ""; enc1 = enc2 = enc3 = enc4 = "";} while (i < input.length);return unescape(output);}
Array.prototype.in_array=function(){ for(var j in this){ if(this[j]==arguments[0]){return true;}}return false;}
