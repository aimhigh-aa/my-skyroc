import { ConfigProvider, theme } from "antd";
import { useAppSelector } from "@/store";
import { selectThemeMode } from "./themeStore";
import type { FC, PropsWithChildren } from "react";

/**
 * 主题 Provider
 * 
 * 功能：
 * 1. 根据 Redux 状态应用 Ant Design 主题
 * 2. 支持亮色/暗色模式切换
 */
export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const themeMode = useAppSelector(selectThemeMode);
  const isDark = themeMode === "dark";


  return (
    <ConfigProvider
      theme={{
        // 1. 核心：开启 CSS 变量支持（这是对接 UnoCSS 的桥梁）
        cssVar: {},
        
        // 2. 算法切换
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,

        components: {
          Layout: {
            // 关键：将 Layout 的专属背景变量强制指向全局 Container 变量
            // 这样 Header 和 Content 就会变成你想要的 #141414
            headerBg: "var(--ant-color-bg-container)",
            bodyBg: "var(--ant-color-bg-container)", 
            siderBg: "var(--ant-color-bg-container)",
          },
        },
        
        token: {
          // colorPrimary: '#1677ff', 
        },
      }}
    >
      {/*这里套一层 div，方便全局控制过渡动画 */}
      <div className="min-h-screen transition-colors duration-300">
        {children}
      </div>
    </ConfigProvider>
  );
};


