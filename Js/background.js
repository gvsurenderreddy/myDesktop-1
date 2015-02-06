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

//壁纸选择框
function showDiv_changeBg(){
	var tempChoosediv = document.getElementById("choosediv");
	tempChoosediv.style.left = (w_Width - 600)/2 + "px";
	tempChoosediv.style.top = (w_Height - 400)/2 + "px";
	drag("choosediv");  //允许拖拽
	tempChoosediv.style.display = "block";
}

//显示文件选择框中的默认壁纸
function showWallpapers(){
	
}

/*创建文件(壁纸)选择框*/
function chooseFile(){
	var chooseDiv = document.createElement("div");
	chooseDiv.setAttribute('id','choosediv');
	document.body.appendChild(chooseDiv);
	chooseDiv.style.display = "none";

	var tempDiv = document.createElement("div");
	tempDiv.setAttribute('id','choosewp');
	chooseDiv.appendChild(tempDiv);

	var inputChoose = document.createElement("input");
	inputChoose.setAttribute('id','choosefile');
	inputChoose.setAttribute('type','file');
	inputChoose.setAttribute('accept','.png,.jpg，.jpeg'); //过滤文件类型
	chooseDiv.appendChild(inputChoose);
	inputChoose.style.display = "none";


	var chooseBtn = document.createElement("input");
	chooseDiv.appendChild(chooseBtn);
	chooseBtn.setAttribute('id','choosefile_button');
	chooseBtn.setAttribute('type','button');
	chooseBtn.setAttribute('value', 'test');
	chooseBtn.style.cssText = "position:absolute; left:10px; top:370px; background-color: #ffffff";
	chooseBtn.onclick = function(){
		var a=document.createEvent("MouseEvents");//FF的处理 
		a.initEvent("click", true, true);
//		document.getElementById("choosefile").dispatchEvent(a);
		inputChoose.dispatchEvent(a);
	}

	var cancel = document.createElement("input");
	cancel.setAttribute('type','button');
	cancel.setAttribute('value','取消');
	cancel.setAttribute('onclick','document.getElementById("choosediv").style.display = "none";');
	chooseDiv.appendChild(cancel);
	cancel.style.cssText = "position:absolute; left:400px; top:370px; width:80px; background-color: #ffffff";

	var getPath = document.createElement("input");
	getPath.setAttribute('type','button');
	getPath.setAttribute('value','应用(预览)');//目前此处相当于预览，此处不对数据做事实的保存处理，在今后实现对配置文件的更改才会实现真正的应用功能
	getPath.setAttribute('onclick','bgChange();');
	chooseDiv.appendChild(getPath);
	getPath.style.cssText = "position:absolute; left:300px; top:370px; width:80px; background-color: #ffffff";
}

function bgChange(){
//	console.info("-----bg change!-----");
	
	var bgPath = document.getElementById("choosefile").value;
	console.info(bgPath);
	document.getElementById("choosediv").style.display = "none";

	if (bgPath == ""){
		console.info("------do not get name------");
	}
	bg(bgPath);
}


