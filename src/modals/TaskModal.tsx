import React, { useState } from "react";
import {
  Modal,
  Select,
  Text,
  Textarea,
  Stack,
  Button,
  Box,
  Group,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { boardSlice } from "../../redux/boardSlice";
import Subtask from "../components/Subtask";
import AddEditTaskModal from "../modals/AddEditTasksModal";
import type { RootState } from "../../redux/store";

interface TaskModalProps {
  taskIndex: number;
  colIndex: number;
  opened: boolean;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  taskIndex,
  colIndex,
  opened,
  onClose,
}) => {
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.boards);
  const board = boards.find((b) => b.isActive);
  const columns = board?.columns ?? [];
  const col = columns[colIndex];
  const task = col?.tasks?.[taskIndex];

  const [status, setStatus] = useState(task?.status ?? "");
  const [newColIndex, setNewColIndex] = useState(colIndex);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!task) return null;

  const completedCount = task.subtasks?.filter(
    (st: any) => st.isCompleted
  ).length;

  const handleStatusChange = (value: string | null) => {
    if (!value) return;
    const selectedIndex = columns.findIndex((col: any) => col.name === value);
    setStatus(value);
    setNewColIndex(selectedIndex);
  };

  const handleDelete = () => {
    dispatch(boardSlice.actions.deleteTask({ taskIndex, colIndex }));
    setIsDeleteModalOpen(false);
    onClose();
  };

  const handleClose = () => {
    dispatch(
      boardSlice.actions.setTaskStatus({
        taskIndex,
        colIndex,
        newColIndex,
        status,
      })
    );
    onClose();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleClose}
        title={task.title}
        size="lg"
        centered
      >
        <Stack>
          <Text size="sm" c="dimmed">
            {task.description || "No description provided."}
          </Text>

          <Text size="sm">
            Subtasks ({completedCount} of {task.subtasks.length})
          </Text>

          <Stack>
            {task.subtasks.map((_, index) => (
              <Subtask
                key={index}
                index={index}
                taskIndex={taskIndex}
                colIndex={colIndex}
              />
            ))}
          </Stack>

          <Box>
            <Text size="sm" mb="xs">
              Current Status
            </Text>
            <Select
              value={status}
              onChange={handleStatusChange}
              data={columns.map((col: any) => col.name)}
            />
          </Box>

          <Group grow mt="sm">
            <Button
              variant="default"
              color="red"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete Task
            </Button>
            <Button onClick={() => setIsEditModalOpen(true)}>Edit Task</Button>
          </Group>
        </Stack>
      </Modal>
      {/* {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDelete={handleDelete}
          itemName={task.title}
        />
      )} */}

      {isEditModalOpen && (
        <AddEditTaskModal
          setIsTaskModalOpen={onClose}
          type="edit"
          taskIndex={taskIndex}
          prevColIndex={colIndex}
        />
      )}
    </>
  );
};

export default TaskModal;
