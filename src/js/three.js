import * as THREE from 'three'; // 引入ThreeJS
import fragmentShader from '../shaders/fragment.glsl'; // 导入片段着色器
import vertex from '../shaders/vertex.glsl'; // 导入顶点着色器

// 设备信息
const device = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: window.devicePixelRatio, // 设备像素比
}

export default class Three {
    constructor(canvas) {
        this.canvas = canvas; // bind canvas

        this.scene = new THREE.Scene(); // 创建场景

        this.camera = new THREE.PerspectiveCamera( // 创建透视相机
            75, // 视野角度
            device.width / device.height, // 宽高比
            0.1, // 近裁剪面
            1000 // 远裁剪面
        )
        this.camera.position.set(0, 0, 1); // 设置相机位置
        this.scene.add(this.camera); // 将相机添加到场景中

        this.renderer = new THREE.WebGLRenderer({ // 创建WebGL渲染器
            canvas: this.canvas, // 绑定到传入的canvas
            alpha: true, // 开启透明度
            antialias: true, // 开启抗锯齿
            preserveDrawingBuffer: true, // 保留绘制缓冲区
        })
        this.renderer.setSize(device.width, device.height); // 设置渲染器大小
        this.renderer.setPixelRatio(Math.min(device.pixelRatio, 2)); // 设置渲染器像素比

        this.clock = new THREE.Clock(); // 创建时钟

        this.setLights(); // 设置环境光和点光源
        this.setGeometry(); // 设置几何体
        this.render(); // 渲染场景
        this.setResize(); // 监听窗口大小变化
    }

    // 设置灯光
    setLights() {
        this.ambientLight = new THREE.AmbientLight(new THREE.Color(1, 1, 1, 1)); // 创建环境光
        this.scene.add(this.ambientLight); // 将环境光添加到场景中
    }

    // 设置几何体
    setGeometry() {
        this.planeGemetry = new THREE.PlaneGeometry(1, 1, 128, 128)
        this.planeMaterial = new THREE.ShaderMaterial({ // 着色器材质
            side: THREE.DoubleSide, // 双面可见
            wireframe: true, // 线框模式
            vertexShader: vertex, // 顶点着色器
            fragmentShader: fragmentShader,// 片段着色器
            uniforms: {// 着色器变量
                progress: { type: "f", value: 0.0 }
            }
        })

        this.planeMesh = new THREE.Mesh(this.planeGemetry, this.planeMaterial); // 创建网格
        this.scene.add(this.planeMesh); // 将网格添加到场景中
    }

    // 渲染场景
    render() {
        const elapsedTime = this.clock.getElapsedTime(); // 获取已用时间

        this.planeMesh.rotation.x = 0.3 * elapsedTime; // X轴旋转
        this.planeMesh.rotation.y = 0.6 * elapsedTime; // Y轴旋转

        this.renderer.render(this.scene, this.camera); // 渲染场景
        requestAnimationFrame(this.render.bind(this)); // 递归调用 render 方法
    }

    // 监听窗口大小变化
    setResize() {
        window.addEventListener('resize', this.onResize.bind(this)) // 监听 resize 事件
    }

    onResize() {
        device.width = window.innerWidth; // 更新设备宽度
        device.height = window.innerHeight; // 更新设备高度
        device.pixelRatio = window.devicePixelRatio; // 更新设备像素比

        this.camera.aspect = device.width / device.height; // 更新相机宽高比
        this.camera.updateProjectionMatrix(); // 更新相机投影矩阵

        this.renderer.setSize(device.width, device.height); // 设置渲染器大小
        this.renderer.setPixelRatio(Math.min(device.pixelRatio, 2)); // 设置渲染器像素比
    }
}