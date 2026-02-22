export function SidebarHead({collapsed}: { collapsed: boolean }) {
  return (
    <>
      <div className="flex text-center w-[100%] bg-white border-r border-[#F0F0F0]">
        <div className="m-2 mr-10">
          <svg viewBox="0 0 100 100" className="w-10 h-10">
            <circle cx="50" cy="50" r="50" className="fill-blue-500" />

            <path d="" stroke="white" strokeWidth="5" />
          </svg>
        </div>
        {collapsed || <h2 className="text-blue-500 leading-[56px] font-bold whitespace-nowrap">后台管理系统</h2>}
      </div>
    </>
  );
}
