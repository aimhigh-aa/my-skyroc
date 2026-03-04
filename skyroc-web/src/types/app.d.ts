declare namespace App{

    // global namespace
    namespace Global {
        interface Menu{
            children?: Menu[];
            icon: React.ReactElement | null;
            key: string;
            label: React.ReactNode;
            title?: string;
        }
    }
}