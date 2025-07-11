import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import {
  createTheme,
  MantineProvider,
  type MantineColorsTuple,
} from "@mantine/core";
import { Layout } from "./components/layout";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddEditBoardModal from "./modals/AddEditModal";
import AddEditTaskModal from "./modals/AddEditTasksModal";
import { useDispatch, useSelector } from "react-redux";
import { boardSlice } from "../redux/boardSlice";
import Column from "./components/Columns";
import type { RootState } from "../redux/store";

const myColor: MantineColorsTuple = [
  "#ecf4ff",
  "#dce4f5",
  "#b9c7e2",
  "#94a8d0",
  "#748dc0",
  "#5f7cb7",
  "#5474b4",
  "#44639f",
  "#3a5890",
  "#2c4b80",
];

const theme = createTheme({
  primaryColor: "myColor",
  colors: {
    myColor,
  },
  components: {
    ActionIcon: {
      defaultProps: {
        variant: "default",
      },
    },
  },
});

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.boards);
  const board = boards.find((b) => b.isActive === true);
  console.log("board", board);
  const columns = board?.columns;
  console.log("columns", columns);
  return (
    <>
      <MantineProvider theme={theme}>
        <Layout openModal={() => setIsModalOpen(true)}>
          {board ? (
            columns?.map((_, colIndex) => (
              <Column key={colIndex} colIndex={colIndex} />
            ))
          ) : (
            <p style={{ padding: "1rem", color: "gray" }}>
              No active board found.
            </p>
          )}
        </Layout>

        {/* <AddEditBoardModal
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type="add"
        /> */}
        <AddEditTaskModal
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type="add"
          onSave={(task) => {
            dispatch(boardSlice.actions.addTask({ ...task, id: uuidv4() }));
          }}
        />
      </MantineProvider>
    </>
  );
}

export default App;
