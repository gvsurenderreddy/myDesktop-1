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

//壁纸选择框
function showDiv_changeBg(){
	var tempChoosediv = document.getElementById("choosediv");
	tempChoosediv.style.left = (w_Width - 600)/2 + "px";
	tempChoosediv.style.top = (w_Height - 400)/2 + "px";
	mouseEvent("choosediv");
	tempChoosediv.style.display = "block";
}

/*创建文件(壁纸)选择框*/
function chooseFile(){
	var chooseDiv = document.createElement("div");
	chooseDiv.setAttribute('id',"choosediv");
	document.body.appendChild(chooseDiv);
	chooseDiv.style.display = "none";

	var tempDiv = document.createElement("div");
	tempDiv.setAttribute('id','choosefile_div');
	chooseDiv.appendChild(tempDiv);
	tempDiv.style.cssText = "position:absolute; left:10px; top:10px; width:580px; height:350px; background-color: #ffffff"; 

	var inputChoose = document.createElement("input");
	inputChoose.setAttribute('id','choosefile');
	inputChoose.setAttribute('type','file');
	chooseDiv.appendChild(inputChoose);
	inputChoose.style.display = "none";
	inputChoose.style.cssText = "position:absolute; left:10px; top:370px; background-color: #ffffff";
//	inputChoose.click();

//	var chooseBtn = document.createElement("input");
//	chooseDiv.appendChild(chooseBtn);
//	inputChoose.setAttribute('id','choosefile_button');
//	chooseBtn.setAttribute('type','button');
//	chooseBtn.setAttribute('value', '预览');
//	chooseBtn.style.cssText = "position:absolute; left:10px; top:370px; background-color: #ffffff";
//	chooseBtn.setAttribute("onclick","console.info('1212')");
//	inputChoose.click();

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

