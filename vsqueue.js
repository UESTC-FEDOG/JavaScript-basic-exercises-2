var VisualQueue = (function() {

    function insertionSort(arr, callback) {
        var timeout = -500;
        if (arr.length <= 1) return arr;
        for (var i = 1, j, tmp; i < arr.length; i++) {
            tmp = arr[i];
            j = i;
            while (j > 0 && arr[j - 1] > tmp) {
                arr[j] = arr[j - 1];
                j--;
                arr[j] = tmp;
                setTimeout(callback.bind(null, arr.slice()), timeout += 1000);
            }
        }
    }
    // 根据一个数组来渲染DOM
    function render(data, canvas) {

        // 总是先清空画布
        canvas.innerHTML = '';

        var content = document.createDocumentFragment();
        data.forEach(function(value) {
            var divEle = document.createElement('div');

            // 设置好高度和内容等等
            divEle.className = 'vq';
            divEle.style.height = value * 2 + 'px';
            divEle.innerHTML = value;

            content.appendChild(divEle);
        });

        canvas.appendChild(content);

    }


    function VisualQueue(ele) {
        this.array = [];
        this.canvas = ele;
    }

    VisualQueue.createElement = function(num) {
        var domobj = document.createElement('div');
        domobj.innerHTML = num;
        domobj.className = 'vq';
        domobj.style.height = num * 2 + 'px';
        return domobj;

    };
    vqProto = VisualQueue.prototype;

    // 右侧入
    vqProto.push = function(num) {
        var domObj = VisualQueue.createElement(num);

        this.array.push(num);
        this.canvas.appendChild(domObj);
    };

    // 左侧入
    vqProto.unshift = function(num) {
        var domObj = VisualQueue.createElement(num),
            canvas = this.canvas;

        this.array.unshift(num);
        if (canvas.children.length > 0) canvas.insertBefore(domObj, canvas.firstElementChild);
        else canvas.appendChild(domObj);
    };

    // 右侧出
    vqProto.pop = function() {
        var canvas = this.canvas;
        canvas.removeChild(canvas.lastElementChild);
        alert(this.array.pop());
    };

    // 左侧出
    vqProto.shift = function() {
        var canvas = this.canvas;
        canvas.removeChild(canvas.firstElementChild);
        alert(this.array.shift());
    };

    // 中间出
    vqProto.remove = function(index) {
        this.canvas.removeChild(this.canvas.children[index]);
        this.array.splice(index, 1);
    };

    // 调用排序函数排序
    // 并渲染DOM
    vqProto.sort = function() {
        var that = this;
        insertionSort(this.array, (function() {
            return function(data) {
                render(data, that.canvas);
            };
        } ()));
    };

    return VisualQueue;


} ());