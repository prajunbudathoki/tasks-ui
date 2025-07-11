import { IconMoon, IconSun } from "@tabler/icons-react";
import {
  ActionIcon,
  Group,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";

export function ActionToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <Group justify="center">
      <ActionIcon
        onClick={() =>
          setColorScheme(computedColorScheme === "light" ? "dark" : "light")
        }
        variant="light"
        size="md"
        radius="xl"
        aria-label="Toggle color scheme"
      >
        {computedColorScheme == "light" ? (
          <IconMoon size={"22"} />
        ) : (
          <IconSun size={"22"} />
        )}
      </ActionIcon>
    </Group>
  );
}
