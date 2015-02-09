var mouseX;
var mouseY;
var tempId; //
var icon_name = new Array();
var w_Width = window.screen.availWidth;
var w_Height = window.screen.availHeight;

//桌面空白处菜单列表
//MenuItem API requires node-webkit >= 0.3.0
function backgroundMenu(){
	//Load native UI library
	var gui = require('nw.gui');
	var menu = new gui.Menu();
	var newCreate = new gui.Menu();
	newCreate.append(new gui.MenuItem({ label: '新建文件夹' }));
	newCreate.append(new gui.MenuItem({ label: '空白文档' }));
	menu.append(new gui.MenuItem({label: '新建' , submenu: newCreate })); //添加一个子菜单
	menu.append(new gui.MenuItem({ type: 'checkbox',label: '保持对齐' })); //nw的谷歌浏览器貌似对于checkbox的支持效果不是很好
	menu.append(new gui.MenuItem({ type: 'separator' }));
	menu.append(new gui.MenuItem({ label: '更换壁纸' }));
	menu.popup(0,0);
	menu.items[0].click = function() {
//		console.info("new");
	}
	newCreate.items[0].click = function() {
//		console.info("mkdir");
	}
	menu.items[3].click = function(){
//		console.info("change wallpaper");
		showDiv_changeBg();  //显示壁纸选择框
	}
}

//桌面空白处菜单列表
function iconMenu() {
	var gui = require('nw.gui');
	var menu = new gui.Menu();
	menu.append(new gui.MenuItem({ label: 'Test1' }));
	menu.append(new gui.MenuItem({ label: 'Test2' }));
	menu.append(new gui.MenuItem({ label: 'Test3' }));
	menu.append(new gui.MenuItem({ type: 'separator' }));
	menu.append(new gui.MenuItem({ label: 'Test4' }));
	menu.popup(0,0);
}

/*空白处（壁纸）鼠标事件*/
function bgMouseEvent(){ //
	var bgevent = document.getElementById("bg");
	bgevent.onmousedown = function(e){
		if (e.button == 2)
		{
			backgroundMenu();
		}	
	}	
}

function mouseEvent(divId){
	var moveFlag = false;
	var clickFlag = false;
	
	var div = document.getElementById(divId);
	div.onmousedown = function(e){
		if (e.button == 0){  //鼠标左击
			moveFlag = true;
			if (tempId){
				document.getElementById(tempId).style.zIndex = 0;
			}
			if (tempId != divId){
				tempId = divId; //存放上一个操作div的id值
			}			
			div.style.zIndex = 2;
			var clickEvent = window.event || e; //兼容性代码，区分IE与其他浏览器事件
			var mWidth = clickEvent.clientX - div.offsetLeft;
			var mHeight = clickEvent.clientY - div.offsetTop;
			
			document.onmousemove = function(e){

				var moveEvent = window.event || e;
				if (moveFlag){
					div.style.left = moveEvent.clientX - mWidth + "px";
					div.style.top = moveEvent.clientY -mHeight + "px";
					if (moveEvent.clientX <= mWidth){
						div.style.left = 0 + "px";
					}
					if (parseInt(div.style.left) + div.offsetWidth >= w_Width){
						div.style.left = w_Width - div.offsetWidth +"px";
					}
					if (moveEvent.clientY <= mHeight){
						div.style.top = 0 + "px";
					}
					if (parseInt(div.style.top) + div.offsetHeight >= w_Height){
						div.style.top = w_Height - div.offsetHeight + "px";
					}
					div.onmouseup = function(e){
						if (e.button == 0){
							moveFlag = false;
							div.style.zIndex = 1;
						}
					}
					document.onmouseup = function(e){
						var outEvent = window.event || e;
						if (outEvent.clientX <= 0 || outEvent.clientX >= w_Width || outEvent.clientY <= 0 || outEvent.clientY >= w_Height){
							moveFlag = false;
							div.style.zIndex = 1;
						}
					}                                                                                                 
				}
			}
			div.onmouseup = function(e){
				moveFlag = false;
				div.style.zIndex = 1;
				alert("Click, You can clickdown and moving!");
			}


		}

		if (e.button == 1){
			console.info("midle Event");
		}

		if (e.button == 2){/*可根据对象id获取对应的class，然后给出对应的菜单*/
			iconMenu();
		}
	}
}

//整个屏幕内拖动
function drag(divId){
	var moveFlag = false;
	
	var div = document.getElementById(divId);
	div.onmousedown = function(e){
		if (e.button == 0){  //鼠标左击
			moveFlag = true;
			var clickEvent = window.event || e; //兼容性代码，区分IE与其他浏览器事件
			var mWidth = clickEvent.clientX - div.offsetLeft;
			var mHeight = clickEvent.clientY - div.offsetTop;
			
			document.onmousemove = function(e){

				var moveEvent = window.event || e;
				if (moveFlag){
					div.style.left = moveEvent.clientX - mWidth + "px";
					div.style.top = moveEvent.clientY -mHeight + "px";
					if (moveEvent.clientX <= mWidth){
						div.style.left = 0 + "px";
					}
					if (parseInt(div.style.left) + div.offsetWidth >= w_Width){
						div.style.left = w_Width - div.offsetWidth +"px";
					}
					if (moveEvent.clientY <= mHeight){
						div.style.top = 0 + "px";
					}
					if (parseInt(div.style.top) + div.offsetHeight >= w_Height){
						div.style.top = w_Height - div.offsetHeight + "px";
					}
					div.onmouseup = function(e){
						if (e.button == 0){
							moveFlag = false;
						}
					}
					document.onmouseup = function(e){
						var outEvent = window.event || e;
						if (outEvent.clientX <= 0 || outEvent.clientX >= w_Width || outEvent.clientY <= 0 || outEvent.clientY >= w_Height){
							moveFlag = false;
						}
					}                                                                                                 
				}
			}
			div.onmouseup = function(e){
				moveFlag = false;
			}


		}
	}
}

/*截取某字符串内特定字符 前/后 的字符串。eg： 123a456 取a前后的话就是123,456,。参数为0代表截取前面的，参数为1代表截取后面的*/
function getStr(string,str,strFlag){
	if (strFlag == 0)
		return string.split(str)[0]; //截图str前面的字符串
	if (strFlag == 1)
		return string.split(str)[1]; //截图str后面的字符串
	else
		return string;
} 

/*截取长度为ilen长度的字符串istr。按照单字节的长度取，如2取一个汉字或者是两个字母，1取一个汉字或者是一个字母*/
function getmystr(istr, ilen){
	if(istr.replace(/[^\x00-\xff]/g,"xx").length <= ilen)
		return istr;
	var str = "";
	var l = 0;
	var schar;
	for (var i = 0; schar = istr.charAt(i); i++)
	{
		str += schar;
		l += (schar.match(/[^\x00-\xff]/) != null ?2:1);
		if (l >= ilen)
			break;
	}
	return str;
}

/*绘制icon & name*/
function drawImage(id){
//	console.info("----ID----", id);

	var canvas = document.getElementById(id);
	var ctx = canvas.getContext("2d");
	
	canvas.width = 80;
	canvas.height = 100;
	
	var img = new Image();
	img.src = "Icon/" + id;
	img.onload = function(){
		ctx.drawImage(img, 5, 0, 70, 80);
	}
	ctx.fillStyle = "#ffffff";
	ctx.textAlign = 'center';
	ctx.textBaseline = "top";
	ctx.font = "bold 12px sans-serif";
	id = getmystr(id, 12);  //截取名称字符串，使显示不超过12个实际长度
	ctx.fillText(id, 40, 83);
}

/*创建DIV与CANVAS*/
/*
function divCanvas(i){
	var t = 1;
	var t_div = new Array();
	var t_canvas = new Array();

	for (;t < i; t++)
	{
		t_div[t] = document.createElement("div");
		document.body.appendChild(t_div[t]);
//		console.info("-----Add div-----", t);

		t_div[t].setAttribute("class","cdiv");
		var divid = "div" + icon_name[t];
		t_div[t].setAttribute("id",divid);
		t_div[t].style.left = 20 + "px";
		t_div[t].style.top = 20 + 110*(t - 1) + "px";

		t_canvas[t] =document.createElement("canvas");
		t_canvas[t].setAttribute("class", "dcanvas");
		t_canvas[t].setAttribute("id", icon_name[t]);
		t_div[t].appendChild(t_canvas[t]);

		drawImage(icon_name[t]);  //绘制ICON & NAME
		mouseEvent(divid);  //DIV鼠标事件（左右击、拖拽等）
	}
}*/

/*屏幕分格*/
function gridsCreate(ght, gwt, gHeight, gWidth){
	var i, j, iconNumber;
	var nameFlag = true;
	for (i = 0; i < gwt; i++){
		for (j = 0; j < ght; j++){
			iconNumber = i * ght + j + 1;
//			console.info(icon_name[iconNumber]);
			if (icon_name[iconNumber] == null){
				nameFlag = false;
				break;
			} 
			var temp = document.createElement("div");
			document.body.appendChild(temp);
			temp.setAttribute("class","cdiv");
			var divid = "div" + icon_name[iconNumber];
//			console.info("----test-divid----",divid);
			temp.setAttribute("id",divid);
			/*确定icon_div位置，８０、１００分别是div宽高*/
			temp.style.left = i * gWidth + (gWidth - 80)/2 + "px";
			temp.style.top = j * gHeight + (gHeight - 100)/2 + "px";

			var tempCanvas = document.createElement("canvas");
			tempCanvas.setAttribute("class","dcanvas");
			tempCanvas.setAttribute("id",icon_name[iconNumber]);
			temp.appendChild(tempCanvas);

			drawImage(icon_name[iconNumber]);
			mouseEvent(divid);

		}
		if (nameFlag == false)
			break;
	}

}

//分隔大小设定
function screen_grids(){
	var gridHt = parseInt(w_Height/120);
	var gridWt = parseInt(w_Width/100); 
	var gridHeight = parseInt(w_Height/parseInt(w_Height/120));
	var gridWidth = parseInt(w_Width/parseInt(w_Width/100));
//	console.info(gridHt,gridWt,gridHeight,gridWidth);
	gridsCreate(gridHt,gridWt,gridHeight,gridWidth);
}

/*遍历指定文件目录下所有文件路径,并获取文件名*/
function getName(path){
	/* RD MODULE*/
	var i = 0;
	var rd = require("rd");
	rd.each(path, function(f, s, next){
				icon_name[i] = f.substring(f.lastIndexOf("/") + 1);  //截取最后一个“/”字符后面的字符串
//				console.info("---Icon_name---", icon_name[i]);
				i++;
				next();
			}, function (err){
				if (err) throw err;
//				divCanvas(i);  //创建DIV与canvas元素(未分格时方案)
				screen_grids(); //分格显示
			});
}


/*
function mouseXY(){
	onmousemove = function(e){
	mouseX = e.clientX;
	mouseY = e.clientY;
	console.info(mouseX,mouseY);
	}
}*/

window.onload = function() {
//	mouseXY();
	var path = "Icon/";
	bg("Wallpapers/test.jpg"); //绘制背景，需要加壁纸路径
	getName(path);  //遍历指定文件目录下所有文件路径,并获取文件名
	bgMouseEvent(); //空白处右键菜单
	chooseFile(); //创建文件(壁纸)选择框
}
