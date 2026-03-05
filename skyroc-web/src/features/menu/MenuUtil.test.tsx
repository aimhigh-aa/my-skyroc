import { describe, it, expect } from "vitest";
import { filterRoutesToMenus } from "./MenuUtil";

describe("路由转菜单逻辑测试", () => {
  it("应当正确处理并排序路由", () => {
    const mockRoutes = [
      { path: "/b", handle: { title: "B", order: 2 } },
      { path: "/a", handle: { title: "A", order: 1 } },
    ];

    const result = filterRoutesToMenus(mockRoutes as any);

    expect(result[0].key).toBe("/a"); // 验证 order: 1 排在前面
    expect(result[1].key).toBe("/b");
  });

  it("应当拍平各种类型的“无路径”容器路由", () => {
    const mockRoutes = [
      {
        // 场景 A：完全没有 path 属性（你之前的写法）
        children: [{ path: "/a", handle: { title: "A" } }],
      },
      {
        // 场景 B：显式 path 为空字符串（常见的 Layout 容器写法）
        path: "",
        children: [{ path: "/b", handle: { title: "B" } }],
      },
      {
        // 场景 C：path 为 undefined
        path: undefined,
        children: [{ path: "/c", handle: { title: "C" } }],
      },
    ];

    const result = filterRoutesToMenus(mockRoutes as any);

    // 最终结果应该是 3 个独立的菜单项，父级容器全部消失
    expect(result).toHaveLength(3);
    expect(result.map((i) => i.key)).toEqual(["/a", "/b", "/c"]);
  });
  it("当路由有 path 时，不应当被拍平，而应作为父菜单项", () => {
    const mockRoutes = [
      {
        path: "/system",
        handle: { title: "系统设置" },
        children: [{ path: "/system/user", handle: { title: "用户" } }],
      },
    ];

    const result = filterRoutesToMenus(mockRoutes as any);

    expect(result).toHaveLength(1);
    expect(result[0].key).toBe("/system");
    expect(result[0].children).toHaveLength(1); // 子路由应该还在 children 里
  });
});
