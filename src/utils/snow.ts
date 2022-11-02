export default function snow() {
  let canvas:any = document.getElementById('snow'),
    // 初始化画笔
    context = canvas.getContext('2d'),
    // 定义画布宽高
    w = window.innerWidth,
    h = window.innerHeight,
    // 定义雪花数量和位置及大小集合
    num = 200,
    snows: any[] = [];
  // 设置画布大小
  canvas.width = w;
  canvas.height = h-5;
  // 随机雪花位置及大小
  for (let i = 0; i < num; i++) {
    snows.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 5+1
    })
  }
  // 半径[1,6), 大于6 从左往右飘,小于6从又往左飘, 上下推荐大于10
  let move = () => {
    for (let i = 0; i < num; i++) {
      let snow = snows[i];
      snow.y += (10-snow.r)/5
      snow.x += (8-snow.r)/5
      if (snow.x > w) snow.x = 0
      if (snow.y > h) snow.y = 0
    }
  }
  let draw = () => {
    context.clearRect(0, 0, w, h);
    context.beginPath();
    context.fillStyle = "rgba(255,255,255,.5)";
    context.shadowColor = "rgba(255,255,255,.5)";
    context.shadowBlur = 10;
    for (let i = 0; i < num; i++) {
      let snow = snows[i];
      context.moveTo(snow.x, snow.y)
      context.arc(snow.x, snow.y, snow.r, 0, Math.PI * 2)
    }
    context.fill();
    context.closePath();
    move()
  }
  draw()
  let timer = setInterval(draw, 50)
  return {
    timer:timer
  }
}