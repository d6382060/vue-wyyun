// 动画函数
export function animate (obj, target, callback) {
  // 先清除以前的定时器，只保留当前的一个定时器执行。
  clearInterval(obj.timer);
  // 定时器添加
  obj.timer = setInterval(() => {
    // 步长值要写在定时器里面
    // 步长值需要改为整数 ，避免使用小数
    // var step = Math.ceil((target - obj.offsetLeft) / 10);
    var step = (target - window.pageYOffset) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    // 判读停止定时器事件
    if (window.pageYOffset == target) {
      // 停止动画 
      clearInterval(obj.timer);
      // if (callback) {
      //     callback();
      // }
      callback && callback();
    } else {
      // 把每次加1 这个步长值改为一个慢慢变小的步长
      // 公式： (目标值 - 现在的位置) / 10；
      // obj.style.left = obj.offsetLeft + step + 'px';
      window.scroll(0, window.pageYOffset + step);
    }
  }, 10);
}