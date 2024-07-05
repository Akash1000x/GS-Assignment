import { Container } from "@mui/material";
import "./App.css";
import Form from "./Components/Form/Form";

function App() {
  return (
    <main>
      <Container maxWidth="lg" className="container">
        <Container maxWidth="sm">
          <Form />
        </Container>
      </Container>
    </main>
  );
}

export default App;
