import { Button } from "@mantine/core";
import { Sidebar } from "./sidebar/Sidebar";
import { IconPlus } from "@tabler/icons-react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-white border-r">
        <Sidebar />
      </div>
      <div className="flex-1 p-6 bg-gray-100">
        <div className="flex justify-between  items-center mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <Button variant="filled" color="blue">
            <IconPlus size={16}  />
            Add New Task
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
