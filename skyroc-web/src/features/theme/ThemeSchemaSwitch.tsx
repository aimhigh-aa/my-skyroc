import { BulbOutlined, BulbFilled } from "@ant-design/icons";
import { ButtonIcon } from "@/Layout/components/ButtonIcons";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleThemeMode, selectThemeMode } from "./themeStore";

interface ThemeSchemaSwitchProps {
  className?: string;
}

/**
 * 主题模式切换组件
 * 
 * 功能：
 * 1. 切换亮色/暗色主题
 * 2. 根据当前主题显示不同图标
 * 3. 状态持久化到 localStorage
 */
export function ThemeSchemaSwitch({ className }: ThemeSchemaSwitchProps) {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);

  const isDark = themeMode === "dark";

  const handleToggle = () => {
    dispatch(toggleThemeMode());
  };

  return (
    <ButtonIcon
      className={className}
      tooltipContent={isDark ? "切换到亮色模式" : "切换到暗色模式"}
      onClick={handleToggle}
    >
      {isDark ? (
        <BulbFilled style={{ fontSize: "18px", color: "#faad14" }} />
      ) : (
        <BulbOutlined style={{ fontSize: "18px" }} />
      )}
    </ButtonIcon>
  );
}