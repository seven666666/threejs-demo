// 初始化样式
import '../css/global.css';
import '../scss/global.scss'

// 初始化标题
import config from '../../_config.cjs';
const title = document.querySelector('#title');
title.textContent = config.title;  // ← 这行代码把标题文字填进去

// 初始化ThreeJS
import Three from './three.js';
window.addEventListener('load', () => {
    new Three(document.querySelector('#canvas'));
});