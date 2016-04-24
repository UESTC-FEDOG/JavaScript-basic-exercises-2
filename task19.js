(function() {
	function queue() {
		this.array = [];
		this.ele = document.getElementById('chart');
		this.timeout = -500;
	}
	queue.prototype = {
		constructor: queue,
		creatEle: function(value) {
			var ele = document.createElement('div');
			ele.innerHTML = value;
			ele.className = "haha";
			ele.style.height = value * 2 + 'px';
			return ele;
		},
		render: function(array) {
			var self = this;
			array.forEach(function(item, index) {
				self.ele.children[index].innerHTML = item;
				self.ele.children[index].style.height = item * 2 + 'px';
			})
		},
		unshift: function(value) {
			this.array.unshift(value);
			var item = this.creatEle(value),
				ele = this.ele;
			if(ele.children.length > 0 ) {
				ele.insertBefore(item,ele.firstElementChild);
			}else {
				ele.appendChild(item);
			}
		},
		push: function(value) {
			this.array.push(value);
			var item = this.creatEle(value),
				ele = this.ele;
				ele.appendChild(item);
		},
		shift: function() {
			if(this.ele.children.length == 0) {
				return false;
			}
			this.ele.removeChild(this.ele.firstElementChild);
			alert(this.array.shift());
		},
		pop: function() {
			if(this.ele.children.length == 0) {
				return false;
			}
			this.ele.removeChild(this.ele.lastElementChild);
			alert(this.array.pop());
		},
		remove: function(index) {
			this.ele.removeChild(this.ele.children[index]);
			this.array.splice(index,1);
		},
		sort: function(array, left, right) {
			if(left > right) return;
			var i = left,
				j = right,
				temp = array[left],
				self = this;
			while(i != j) {
				while(array[j] >= temp && i < j) j--;
				while(array[i] <= temp && i < j) i++;
				if(i < j) {
					var t = array[i];
					array[i] = array[j];
					array[j] = t;
				}
			}
			array[left] = array[i];
			array[i] = temp;
			(function(array) {
				var array = array.slice();
			setTimeout(function(){
				self.render(array.slice());
			}, self.timeout += 1000);
			})(array)
			this.sort(array, left, i - 1);
			this.sort(array, i + 1, right);
		}
	}
	var queue = new queue();
	var button = Array.prototype.slice.call(document.getElementsByTagName('button'));
		button.forEach(function(item) {
		item.addEventListener('click', function(e) {
			var num = document.getElementById('value').value;
			if(item.value == 'shift' || item.value == 'pop') queue[item.value]();
			else if (item.value == 'sort') {
				queue[item.value](queue.array, 0, queue.array.length - 1);
			}else {
				if(isNaN(num)) {
					alert('You must input number');
					return false;
				}
				if(num < 10 || num > 100) {
					alert('You must input number 10-100');
					return false;
				}
				queue[item.value](num);
			}
		})
	});
	var chart = document.getElementById('chart');
	chart.addEventListener('click', function(e) {
		if(e.target.matches(".haha")) {
			for (var index = 0; index < chart.children.length; index++) {
				if (chart.children[index] === e.target) break;
			}
			queue.remove(index);
		}
	})
})()

