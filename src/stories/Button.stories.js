import { Button } from "@mui/material";

export default {
  title: "Components/Button",
  component: Button,
};

export const Text = () => <Button>Text Variant</Button>;
export const Contained = () => (
  <Button variant="contained">Contained Variant</Button>
);
export const Outlined = () => (
  <Button variant="outlined">Outlined Variant</Button>
);
