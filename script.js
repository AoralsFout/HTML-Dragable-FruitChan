const FLcanvas = document.getElementById("canvas");
const ctx = FLcanvas.getContext("2d");
const imageFolder = "image/";
const animationList = [
  "Dervish",
  "Held",
  "Hula",
  "Jumping",
  "Stepping",
  "Waiting",
  "Waving",
  "Windmill",
  "Zitabata",
  "Zombie",
];
const frameCount = 8;

let currentAnimation = 0;
let currentFrame = 0;
let animationSpeed = 1;
let animationTimer = null;

//预加载图片
function loadAnimation(animationName) {
  const animationFolder = imageFolder + animationName + "/";
  const frames = [];
  for (let i = 1; i <= frameCount; i++) {
    frames.push(new Image());
    frames[i - 1].src = animationFolder + i + ".png";
  }
  return frames;
}

//绘制帧
function drawAnimation() {
  ctx.clearRect(0, 0, FLcanvas.width, FLcanvas.height);
  ctx.drawImage(
    animationList[currentAnimation][currentFrame],
    0,
    0,
    FLcanvas.width,
    FLcanvas.height
  );
}

//更新动画
function updateAnimation() {
  currentFrame++;
  if (currentFrame >= frameCount) {
    currentFrame = 0;
  }
  ctx.clearRect(0, 0, FLcanvas.width, FLcanvas.height);
  drawAnimation();
  animationTimer = setTimeout(updateAnimation, animationSpeed);
}

//更改动画
function changeAnimation(animationName) {
  currentAnimation = animationList.indexOf(animationName);
  currentFrame = 0;
  animationSpeed = 1;
  updateBPM();
  animationTimer = null;
  updateAnimation();
}

//更新BPM
function updateBPM() {
  const bpm = parseInt(document.getElementById("bpm").value);
  animationSpeed = 60000 / bpm / 4;
  clearTimeout(animationTimer);
}

//监听bpm变化
document.getElementById("bpm").addEventListener("input", updateBPM);

//加载动画
for (let i = 0; i < animationList.length; i++) {
  animationList[i] = loadAnimation(animationList[i]);
}

//播放预设水果娘动画
changeAnimation(animationList[5]);

//拖动:
dragElement(document.getElementById("drag"));

function dragElement(elmnt) {
  temp = currentAnimation;
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    //切换水果娘动画
    changeAnimation(animationList[1]);
    // 在启动时获取鼠标光标位置:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // 每当光标移动时调用一个函数:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // 计算新的光标位置:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // 设置元素的新位置:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // 释放鼠标按钮时停止移动:
    document.onmouseup = null;
    document.onmousemove = null;
    //重新设置水果娘动画
    changeAnimation(animationList[temp]);
  }
}

//选项展开&收起
let detail = true;

function toggleDetail() {
  if (detail) {
    document.getElementById("dragheader").style.display = "none";
    document.getElementById("detail").style.display = "none";
    document.getElementById("zhanwei").style.display = "block";
    document.getElementById("tips").style.display = "none";
  } else {
    document.getElementById("dragheader").style.display = "block";
    document.getElementById("detail").style.display = "block";
    document.getElementById("zhanwei").style.display = "none";
    document.getElementById("tips").style.display = "block";
  }
  detail = !detail;
}
