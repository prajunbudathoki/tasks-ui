import React, { useEffect, useState } from "react";
import {
  Modal,
  TextInput,
  Textarea,
  Button,
  Group,
  Stack,
  Select,
  ActionIcon,
} from "@mantine/core";
import {
  IconCalendar,
  IconFlag,
  IconTag,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import { v4 as uuidv4 } from "uuid";
import { DatePickerInput } from "@mantine/dates";

interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface AddEditTaskModalProps {
  opened: boolean;
  onClose: () => void;
  type: "add" | "edit";
  initialData?: {
    title: string;
    description: string;
    subtasks: Subtask[];
    status: string;
    columnOptions: string[];
  };
  onSave: (task: {
    title: string;
    description: string;
    subtasks: Subtask[];
    status: string;
  }) => void;
}

const AddEditTaskModal: React.FC<AddEditTaskModalProps> = ({
  opened,
  onClose,
  type,
  initialData,
  onSave,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [subtasks, setSubtasks] = useState<Subtask[]>(
    initialData?.subtasks || [
      { id: uuidv4(), title: "", isCompleted: false },
      { id: uuidv4(), title: "", isCompleted: false },
    ]
  );
  const [status, setStatus] = useState(initialData?.status || "");
  const [columnOptions, setColumnOptions] = useState<string[]>(
    initialData?.columnOptions || []
  );
  const [assignee, setAssignee] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<string | null>(null);
  const [tags, setTags] = useState<string>("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setSubtasks(initialData.subtasks);
      setStatus(initialData.status);
      setColumnOptions(initialData.columnOptions);
    }
  }, [initialData]);

  const updateSubtask = (id: string, newTitle: string) => {
    setSubtasks((prev) =>
      prev.map((st) => (st.id === id ? { ...st, title: newTitle } : st))
    );
  };

  const deleteSubtask = (id: string) => {
    setSubtasks((prev) => prev.filter((st) => st.id !== id));
  };

  const addNewSubtask = () => {
    setSubtasks((prev) => [
      ...prev,
      { id: uuidv4(), title: "", isCompleted: false },
    ]);
  };

  const handleSubmit = () => {
    if (!title.trim() || subtasks.some((st) => !st.title.trim())) return;

    onSave({ title, description, subtasks, status });
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={type === "edit" ? "Edit Task" : "Add New Task"}
      centered
      size="lg"
    >
      <Stack>
        <TextInput
          label="Task Name"
          placeholder="e.g. Take coffee break"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />

        <Textarea
          label="Description"
          minRows={5}
          placeholder="e.g. Recharge with a quick break"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
        <Group
          grow
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
          gap={"xs"}
          mt="md"
        >
          <Select
            placeholder="Assignee"
            data={["Alice", "Bob", "Charlie"]}
            leftSection={<IconUser size={16} />}
            value={assignee}
            onChange={setAssignee}
          />
          <DatePickerInput
            placeholder="Due Date"
            value={dueDate}
            onChange={setDueDate}
            leftSection={<IconCalendar size={16} />}
          />
          <Select
            placeholder="Priority"
            data={["Low", "Medium", "High"]}
            leftSection={<IconFlag size={16} />}
            value={priority}
            onChange={setPriority}
          />
          <TextInput
            placeholder="Tags"
            value={tags}
            onChange={(e) => setTags(e.currentTarget.value)}
            leftSection={<IconTag size={16} />}
          />
        </Group>

        <Stack>
          <label>Subtasks</label>
          {subtasks.map((subtask) => (
            <Group key={subtask.id} grow>
              <TextInput
                value={subtask.title}
                onChange={(e) =>
                  updateSubtask(subtask.id, e.currentTarget.value)
                }
                placeholder="e.g. Prepare coffee"
              />
              <ActionIcon color="red" onClick={() => deleteSubtask(subtask.id)}>
                <IconX size={16} />
              </ActionIcon>
            </Group>
          ))}
          <Button variant="light" onClick={addNewSubtask}>
            + Add New Subtask
          </Button>
        </Stack>

        <Select
          label="Status"
          placeholder="Select column"
          data={columnOptions}
          value={status}
          onChange={(value) => value && setStatus(value)}
        />

        <Button fullWidth mt="md" onClick={handleSubmit}>
          {type === "edit" ? "Save Changes" : "Create Task"}
        </Button>
      </Stack>
    </Modal>
  );
};

export default AddEditTaskModal;
