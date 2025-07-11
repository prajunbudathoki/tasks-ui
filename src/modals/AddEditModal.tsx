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
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { v4 as uuidv4 } from "uuid";

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
      size="md"
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
