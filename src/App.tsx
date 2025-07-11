import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import {
  createTheme,
  MantineProvider,
  type MantineColorsTuple,
} from "@mantine/core";
import { Layout } from "./components/layout";
import { useState } from "react";
import AddEditBoardModal from "./modals/AddEditModal";

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
  return (
    <>
      <MantineProvider theme={theme}>
        <Layout openModal={() => setIsModalOpen(true)}>
          <h1>Main content</h1>
        </Layout>
        <AddEditBoardModal
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type="add"
        />
      </MantineProvider>
    </>
  );
}

export default App;
