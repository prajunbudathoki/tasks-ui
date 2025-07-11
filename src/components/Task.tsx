import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../modals/TaskModal";
import type { RootState } from "../../redux/store";

interface TaskProps {
  colIndex: number;
  taskIndex: number;
}

const Task: React.FC<TaskProps> = ({ colIndex, taskIndex }) => {
  const boards = useSelector((state: RootState) => state.boards);
  const board = boards.find((board) => board.isActive);
  const columns = board?.columns ?? [];
  const col = columns[colIndex];
  const task = col?.tasks?.[taskIndex];

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  if (!task) return null;

  const subtasks = task.subtasks ?? [];
  const completed = subtasks.filter((st) => st.isCompleted).length;

  const handleOnDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    <div>
      <div
        onClick={() => setIsTaskModalOpen(true)}
        draggable
        onDragStart={handleOnDrag}
        className="w-[280px] first:my-5 rounded-lg  py-6 px-3 shadow-lg cursor-pointer"
      >
        <p className="font-bold tracking-wide">{task.title}</p>
        <p className="font-bold text-xs tracking-tighter mt-2">
          {completed} of {subtasks.length} completed tasks
        </p>
      </div>

      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          opened={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Task;
