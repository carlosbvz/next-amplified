import { ReactNode } from "react";
import { Container } from "@mui/material";
import Navigation from "../components/navigation";
import Footer from "../components/footer";

type Props = {
  children: ReactNode;
};

export default function PageLayout({ children }: Props) {
  return (
    <>
      <Navigation />
      <Container maxWidth="lg" style={{ minHeight: "calc(100vh - 145px)" }}>
        {children}
      </Container>
      <Footer />
    </>
  );
}
