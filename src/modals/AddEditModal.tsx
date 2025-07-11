import React, { useEffect, useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Box,
  Stack,
  Text,
  ActionIcon,
  Select,
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

interface Column {
  id: string;
  name: string;
  tasks: any[];
}
interface AddEditBoardModalProps {
  opened: boolean;
  onClose: () => void;
  type: "add" | "edit";
  defaultName?: string;
  defaultColumns?: Column[];
}

const AddEditBoardModal: React.FC<AddEditBoardModalProps> = ({
  opened,
  onClose,
  type,
  defaultName = "",
  defaultColumns = [
    { name: "Todo", tasks: [], id: uuidv4() },
    { name: "Doing", tasks: [], id: uuidv4() },
  ],
}) => {
  const [name, setName] = useState(defaultName);
  const [columns, setColumns] = useState<Column[]>(defaultColumns);
  const [assignee, setAssignee] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<string | null>(null);
  const [tags, setTags] = useState<string>("");

  useEffect(() => {
    if (type === "edit") {
      setName(defaultName);
      setColumns(
        defaultColumns.map((col) => ({
          ...col,
          id: uuidv4(),
        }))
      );
    }
  }, [type, defaultName, defaultColumns]);

  const updateColumnName = (id: string, newValue: string) => {
    setColumns((cols) =>
      cols.map((col) => (col.id === id ? { ...col, name: newValue } : col))
    );
  };

  const deleteColumn = (id: string) => {
    setColumns((cols) => cols.filter((col) => col.id !== id));
  };

  const addNewColumn = () => {
    setColumns((cols) => [...cols, { name: "", tasks: [], id: uuidv4() }]);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={type === "edit" ? "Edit Board" : "Add New Board"}
      centered
      size="lg"
      overlayProps={{ blur: 4 }}
    >
      <Box>
        <Stack>
          <Text size="sm" c="dimmed">
            Board Name
          </Text>
          <TextInput
            placeholder="e.g. Web Design"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
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

          <Text size="sm" c="dimmed" mt="md">
            Board Columns
          </Text>
          {columns.map((col) => (
            <Group key={col.id} align="center">
              <TextInput
                className="flex-1"
                value={col.name}
                onChange={(e) =>
                  updateColumnName(col.id, e.currentTarget.value)
                }
                style={{ flexGrow: 1 }}
              />
              <ActionIcon
                variant="subtle"
                color="red"
                onClick={() => deleteColumn(col.id)}
              >
                <IconX size={16} />
              </ActionIcon>
            </Group>
          ))}

          <Button
            variant="light"
            color="indigo"
            mt="sm"
            onClick={addNewColumn}
            fullWidth
          >
            + Add New Column
          </Button>

          <Button
            variant="filled"
            color="indigo"
            mt="md"
            fullWidth
            onClick={() => {
              console.log("Submit Board:", { name, columns });
              onClose();
            }}
          >
            {type === "add" ? "Create New Board" : "Save Changes"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddEditBoardModal;
