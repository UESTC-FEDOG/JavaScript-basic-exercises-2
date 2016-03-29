// 此处负责事件绑定
(function(VisualQueue) {

    var buttons = Array.prototype.slice.call(document.querySelectorAll('button')),
        canvas = document.getElementById('canvas'),
        vq = new VisualQueue(canvas);
        
    buttons.forEach(function(ele) {
        ele.addEventListener('click', function() {
            var num = Number(document.getElementById('input').value);

            if (isNaN(num) || num < 10 || num > 100) {
                alert('输入不合法，必须是10~100间的数字');
                return false;
            }

            vq[this.dataset.type](num);
        });
    });

    canvas.addEventListener('click', function(e) {
        var that = this;
        if (e.target.matches('.vq')) {
            for (var index = 0; index < that.children.length; index++) {
                if (that.children[index] === e.target) break;
            }

            vq.remove(index);
        }
    });

} (VisualQueue));
