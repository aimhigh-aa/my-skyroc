import {
  defineConfig,
  presetWind3,
  presetAttributify,
  presetIcons,
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(), // 必选：提供默认的原子类（类似 Tailwind）
    presetAttributify(), // 可选：支持属性化写法 <div border="2 color-red">
    presetIcons(), // 可选：支持直接使用图标类名
  ],
  // 这里定义你项目中反复提到的“语义化快捷方式”
  shortcuts: {
    'bg-container': 'bg-[var(--ant-color-bg-container)]',
    'text-base-text': 'text-[var(--ant-color-text)]',
    'transition-300': 'transition-all duration-300 ease-in-out',
  },
  theme: {
    // 也可以在这里扩展颜色
    colors: {
      primary: 'var(--ant-color-primary)',
    }
  }
})

