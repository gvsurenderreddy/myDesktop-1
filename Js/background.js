/*绘制桌面壁纸*/
function bg(url){
	var canvas_bg = document.getElementById("bg");
	var ctx = canvas_bg.getContext("2d");

	canvas_bg.width = w_Width;
	canvas_bg.height = w_Height;
	
	var desk = new Image();
	desk.src = url;
	desk.onload = function(){
		ctx.drawImage(desk, 0, 0, w_Width, w_Height);
	}
}

//显示壁纸选择框（显示位置以及可拖拽属性）
function showDiv_changeBg(){
	var tempChoosediv = document.getElementById("bgChoosediv");
	var oStyle = tempChoosediv.currentStyle? tempChoosediv.currentStyle : window.getComputedStyle(tempChoosediv, null);
	tempChoosediv.style.left = (w_Width - getStr(oStyle.width,"p",0))/2 + "px";
	tempChoosediv.style.top = (w_Height - getStr(oStyle.height,"p",0))/2 + "px";
	drag("bgChoosediv");  //允许拖拽
	tempChoosediv.style.display = "block";
}
0
//显示文件选择框中的默认壁纸
function showWallpapers(){
	
}

/*创建文件(壁纸)选择框*/
function chooseFile(){
	var chooseDiv = document.createElement("div"); //整个选择框
	chooseDiv.setAttribute('id','bgChoosediv');
	document.body.appendChild(chooseDiv);
	chooseDiv.style.display = "none";

	var tempDiv = document.createElement("div"); //默认壁纸显示部分
	tempDiv.setAttribute('id','bgChoosewp');
	chooseDiv.appendChild(tempDiv);

	var inputChoose = document.createElement("input"); //
	inputChoose.setAttribute('id','bgchoosefile');
	inputChoose.setAttribute('type','file');
	inputChoose.setAttribute('accept','.jpg,.jpeg'); //过滤文件(图片)类型
	chooseDiv.appendChild(inputChoose);
	inputChoose.style.display = "none";


	var chooseBtn = document.createElement("input"); //选择添加文件按钮
	chooseDiv.appendChild(chooseBtn);
	chooseBtn.setAttribute('id','bgchoosefile_button');
	chooseBtn.setAttribute('type','button');
	chooseBtn.setAttribute('value', '添加');
	chooseBtn.onclick = function(){
		var a=document.createEvent("MouseEvents");//FF的处理 
		a.initEvent("click", true, true);
//		document.getElementById("choosefile").dispatchEvent(a);
		inputChoose.dispatchEvent(a);
	}

	var cancel = document.createElement("input"); //取消按钮
	cancel.setAttribute('id','bgChoose_cancel');
	cancel.setAttribute('type','button');
	cancel.setAttribute('value','取消');
	cancel.setAttribute('onclick','document.getElementById("bgChoosediv").style.display = "none";');
	chooseDiv.appendChild(cancel);

	var getPath = document.createElement("input"); //应用预览按钮
	getPath.setAttribute('id','bgChoose_use');
	getPath.setAttribute('type','button');
	getPath.setAttribute('value','应用(预览)');//目前此处相当于预览，此处不对数据做事实的保存处理，在今后实现对配置文件的更改才会实现真正的应用功能
	getPath.setAttribute('onclick','bgChange();'); //绑定壁纸更换函数
	chooseDiv.appendChild(getPath);
}

function bgChange(){
//	console.info("-----bg change!-----");
	
	var bgPath = document.getElementById("bgchoosefile").value;
	console.info(bgPath);
	document.getElementById("bgChoosediv").style.display = "none";

	if (bgPath == ""){
		console.info("------do not get name------");
	}
	else
		bg(bgPath); //根据文件路径绘制壁纸
}


