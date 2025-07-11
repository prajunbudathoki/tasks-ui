import { Button } from "@mantine/core";
import { Sidebar } from "./sidebar/Sidebar";
import { IconPlus } from "@tabler/icons-react";

interface LayoutProps {
  children: React.ReactNode;
  openModal: () => void;
}

export function Layout({ children,openModal }: LayoutProps) {
  return (
    <div className="flex h-screen">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 p-6">
        <div className="flex justify-between  items-center mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <Button
            variant="filled"
            color="blue"
            onClick={openModal}
            leftSection={<IconPlus size={16} />}
            
          >
            Add New Task
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
