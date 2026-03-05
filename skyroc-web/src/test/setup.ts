// src/test/setup.ts
import { vi } from 'vitest';
import '@testing-library/jest-dom'; // 如果安装了 testing-library

// 1. 模拟 Vite 的环境变量 (解决 VITE_MENU_ICON 报错)
vi.stubEnv('VITE_MENU_ICON', 'QuestionCircleOutlined');

// 2. 模拟全局国际化函数 $t (如果你的代码中用到了)
// @ts-ignore
global.$t = (key: string) => key;

// 3. 模拟可能用到的其他全局对象
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // 兼容旧版
    removeListener: vi.fn(), // 兼容旧版
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});