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
import { useDispatch, useSelector } from "react-redux";
import { boardSlice } from "../../redux/boardSlice";

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
  const dispatch = useDispatch();
  const [name, setName] = useState(defaultName);
  const [columns, setColumns] = useState<Column[]>(defaultColumns);


  const board = useSelector((state: any) => state.boards).find(
    (board: any) => board.isActive
  );

  useEffect(() => {
    if (type === "edit" && board) {
      setName(defaultName);
      setColumns(defaultColumns);
    }
  }, [type, defaultName, defaultColumns, board]);

  const updateColumnName = (id: string, newValue: string) => {
    setColumns((cols) =>
      cols.map((col) => (col.id === id ? { ...col, name: newValue } : col))
    );
  };

  const deleteColumn = (id: string) => {
    setColumns((cols) => {
      const updatedCols = cols.filter((col) => col.id !== id);
      return updatedCols.length > 0
        ? updatedCols
        : [{ name: "", tasks: [], id: uuidv4() }];
    });
  };

  const addNewColumn = () => {
    setColumns((cols) => [...cols, { name: "", tasks: [], id: uuidv4() }]);
  };

  const handleSubmit = () => {
    const payload = {
      name,
      newColumns: columns,
    };

    if (type === "add") {
      dispatch(boardSlice.actions.addBoard(payload));
    } else if (type === "edit" && board) {
      dispatch(boardSlice.actions.editBoard(payload));
    }

    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={type === "edit" ? "Edit Board" : "Add New Board"}
      centered
      size="lg"
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
            onClick={handleSubmit}
          >
            {type === "add" ? "Create New Board" : "Save Changes"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddEditBoardModal;
