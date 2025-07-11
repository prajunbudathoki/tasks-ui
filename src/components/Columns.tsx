import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { boardSlice } from "../../redux/boardSlice";
import Task from "./Task";
import type { RootState } from "../../redux/store";
import { useMantineColorScheme } from "@mantine/core";

interface ColumnProps {
  colIndex: number;
}

const Column: React.FC<ColumnProps> = ({ colIndex }) => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-sky-500",
  ];

  const dispatch = useDispatch();
  const [color, setColor] = useState<string | null>(null);

  const boards = useSelector((state: RootState) => state.boards);
  const board = boards.find((b) => b.isActive);
  const col = board?.columns[colIndex];

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  }, []);

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );

    if (colIndex !== prevColIndex) {
      dispatch(
        boardSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex })
      );
    }
  };

  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  if (!col) return null;

  return (
    <>
      <div
        onDrop={handleOnDrop}
        onDragOver={handleOnDragOver}
        className={`scrollbar-hide min-w-[280px] rounded-xl p-2
      ${
        isDark
          ? "bg-[#1E1E1E] shadow-lg shadow-black/30 border border-neutral-700"
          : "bg-white shadow-md border border-gray-200"
      }
      transition-colors duration-300`}
      >
        <div
          className={`w-30 rounded-xs px-4  flex items-center justify-between ${color} text-white`}
        >
          {col.name} ({col.tasks.length})
        </div>
        {col.tasks.map((_, index) => (
          <Task key={index} taskIndex={index} colIndex={colIndex} />
        ))}
      </div>
      <div className="flex items-center gap-2 text-sm font-medium tracking-wide"></div>
    </>
  );
};

export default Column;
