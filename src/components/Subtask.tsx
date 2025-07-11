import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { boardSlice } from "../../redux/boardSlice";
import type { RootState } from "../../redux/store";

interface SubtaskProps {
  index: number;
  taskIndex: number;
  colIndex: number;
}

function Subtask({ index, taskIndex, colIndex }: SubtaskProps) {
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board?.columns.find((col, i) => i === colIndex);
  const task = col?.tasks.find((task, i) => i === taskIndex);
  const subtask = task?.subtasks.find((subtask, i) => i === index);
  const checked = subtask?.isCompleted;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      boardSlice.actions.setSubtaskCompleted({ index, taskIndex, colIndex })
    );
  };

  return (
    <div className=" w-full flex  rounded-md relative items-center justify-start  p-3 gap-4">
      <input
        className=" w-4 h-4  cursor-pointer "
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <p>{subtask?.title}</p>
    </div>
  );
}

export default Subtask;
