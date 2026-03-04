varying vec2 vUv; // 声明变量

void main() {  // GPU执行入口
    vUv = uv; // 保存定点坐标

  // projectionMatrix 投影矩阵（决定视角）
  // modelViewMatrix 模型视图矩阵（决定物体位置和相机） 
  // vec4(position, 1.0) 将 3D 坐标转为 4D 齐次坐标
  // 计算最终顶点位置
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}