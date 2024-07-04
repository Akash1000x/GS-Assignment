import { Container } from "@mui/material";
import "./App.css";
import Form from "./Components/Form/Form";

function App() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 2 }}>
      <Container maxWidth="sm">
        <Form />
      </Container>
    </Container>
  );
}

export default App;
