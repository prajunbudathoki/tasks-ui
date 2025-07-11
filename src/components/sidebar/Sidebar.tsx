import { Button, Code, Group, ScrollArea, Stack, Text } from "@mantine/core";
import { IconLayoutKanban, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { boardSlice } from "../../../redux/boardSlice";
import type { RootState } from "../../../redux/store";
import classes from "../sidebar/Sidebar.module.css";
import { ActionToggle } from "../theme/toggle";
import AddEditBoardModal from "../../modals/AddEditModal";

export function Sidebar() {
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.boards);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectBoard = (index: number) => {
    dispatch(boardSlice.actions.setBoardActive({ index }));
  };
  const handleCreateNewBoard = (name: string, columns: any[]) => {
    dispatch(boardSlice.actions.addBoard({ name, newColumns: columns }));
    setIsModalOpen(false);
  };
  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Code fw={700}>v3.1.2</Code>
        </Group>
      </div>
      <Button
        variant="filled"
        color="gray"
        mt={10}
        onClick={() => setIsModalOpen(true)}
        leftSection={<IconPlus size={18} />}
      >
        Create New Board
      </Button>
      <ScrollArea className={classes.links}>
        <Stack className={classes.linksInner} gap="xs">
          <Text size="xs" fw={700} className={classes.title}>
            All Boards ({boards.length})
          </Text>
          {boards.map((board, index) => (
            <Button
              key={board.name + index}
              leftSection={<IconLayoutKanban size={18} />}
              variant={board.isActive ? "filled" : "light"}
              color="myColor"
              fullWidth
              justify="flex-start"
              onClick={() => handleSelectBoard(index)}
            >
              {board.name}
            </Button>
          ))}
        </Stack>
      </ScrollArea>
      <ActionToggle />
      <AddEditBoardModal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="add"
      />
    </nav>
  );
}
