export default function divDrag(el, binding) {
  let dragBox = el; // 获取当前元素
  dragBox.draggable = "true"; // 设置当前元素可拖拽
  dragBox.ondragstart = e => {
    // 算出鼠标相对元素的位置
    let disX = e.clientX - dragBox.offsetLeft;
    let disY = e.clientY - dragBox.offsetTop;
    let alongside = binding.value
    dragBox.ondragend = e => {
      // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
      let left = e.clientX - disX;
      let top = e.clientY - disY;

      // 移动当前元素
      if (!alongside) {
        dragBox.style.left = left + "px";
        dragBox.style.top = top + "px";
      } else {
        switch (alongside) {
          case "yl":
            // 仅靠左竖直移动
            dragBox.style.top = top + "px";
            dragBox.style.left = 5 + "px";   // 回到初始x坐标
            break
          case "yr":
            // 仅靠右竖直移动
            dragBox.style.top = top + "px";
            dragBox.style.right = 5 + "px";   // 回到初始x坐标
            break
          case "xt":
            // 仅靠顶水平移动
            dragBox.style.left = left + "px";
            dragBox.style.top = 90 + "px";   // 回到初始y坐标
            break
          case "xb":
            // 仅靠底水平移动
            dragBox.style.left = left + "px";
            dragBox.style.bottom = 5 + "px";   // 回到初始y坐标
            break
          case "disabled":
            break
          default:
            dragBox.style.left = left + "px";
            dragBox.style.top = top + "px";
        }
      }
    };
  };
}