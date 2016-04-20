window.onload=function(){
var data = []
 //从用户输入中获取数据并验证，向data中增加一条数据
function addData(){
	var input = document.getElementById('input');
	var text = input.value.trim();
	//验证内容
	if(text != ""){
		if(!/^\d+$/.test(text) || parseInt(text) < 10
		 || parseInt(text) > 100){
			alert('请输入10-100的整数！');
			input.focus();
			text = '';
			return;
			};
		}else {
		alert('请输入内容！！！');
		input.focus();
		return;
	}
	//验证长度
	if(data.length >= 10){
		alert('太多啦，不能超过六十个！');
		input.focus();
		return false;
	}
	return text;
}
// 渲染图表
function renderChart(){
	var chart = document.getElementById('chart');
	var content ="";
	for(var i = 0; i < data.length; i++){
	 content  += '<div style = "height:'+data[i]+'px"></div>'
	}
	chart.innerHTML = content;
	console.log(data);
}
// 从左进入
function leftIn(){
	var number = addData();
	if(number != null) {
		data.unshift(number);
	}
	renderChart();
}
//从左出去
function leftOut(){
	if(data.length == 0 ){
		alert('没有东西可以移出了');
		return false;
	}else{
		alert(''+data.shift()+'');
		renderChart();
	}
}
//从右进入
function rightIn(){
	clearInterval(sortData);
	var number = addData();
	if(number != null) {
		data.push(number);
	}
	renderChart();
}
//从右出去
function rightOut(){
	if(data.length == 0 ){
		alert('没有东西可以移出了');
		return false;
	}else{
		alert(''+data.pop()+'');
		renderChart();
	}	
}

//排序
function sortData(){
	var sort_data = document.getElementById('sort');
	var j=0;
	var move=setInterval(function(){
		if(i >=data.length){
			clearInterval(move);
			return false;
		}
		for(var i =j+1;i < data.length; i ++) {
			if(data[i] > data[j]) {
				tmp = data[i];
				data[i] = data[j];
				data[j] = tmp;
				renderChart();				
			}
		}
		j++;
	},300);

}

//绑定按钮
function initBtnEvent(){
	var left_In = document.getElementById('left-in');
	var left_Out = document.getElementById('left-out');
	var right_In = document.getElementById('right-in');
	var right_Out = document.getElementById('right-out');
	var sort_data = document.getElementById('sort');

	left_In.onclick = function(){leftIn();};
	left_Out.onclick = function(){leftOut();};
	right_In.onclick = function(){rightIn();};
	right_Out.onclick = function(){rightOut();};
	sort_data.onclick = function(){sortData();};


}
 //初始化
 renderChart();
initBtnEvent();
}

