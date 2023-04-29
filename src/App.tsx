import "./App.css";
import { Container, Stack, Typography } from "@mui/material";
import { JsLogo } from "./JsLogo";
import Start from "./Start";
import { useQuestionStore } from "./store/questions";
import Game from "./Game";

function App() {
  const questions = useQuestionStore((state) => state.questions);

  return (
    <Container maxWidth="sm">
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        <JsLogo />
        <Typography variant="h2" component="h1">
          Javascript Quiz
        </Typography>
      </Stack>
      {questions.length === 0 && <Start />}
      {questions.length > 0 && <Game />}
    </Container>
  );
}

export default App;
