import {
  Stack,
  IconButton,
  Card,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ArrowBackIosNew } from "@mui/icons-material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useQuestionStore } from "./store/questions";
import { type Question as QuestionType } from "./assets/types";
import Footer from "./assets/Footer";
const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionStore((state) => state.selectAnswer);

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };
  const getBackgroundColor = (index: number) => {
    const { userSelectedAnswer, correctAnswer } = info;
    if (userSelectedAnswer == null) return "transparent";
    if (index !== correctAnswer && index !== userSelectedAnswer)
      return "transparent";
    if (index === correctAnswer) return "green";
    if (index === userSelectedAnswer) return "red";
    return "transparent";
  };
  return (
    <Card variant="outlined" sx={{ bgcolor: "#0A2E36", p: 3, color: "#ffff" }}>
      <Typography variant="h5">{info.question}</Typography>
      <SyntaxHighlighter language="javascript" style={dracula}>
        {info.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: "#265E6A" }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              onClick={createHandleClick(index)}
              sx={{ backgroundColor: getBackgroundColor(index) }}
            >
              <ListItemText primary={answer} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

const Game = () => {
  const questions = useQuestionStore((state) => state.questions);
  const currentQuestion = useQuestionStore((state) => state.currentQuestion);
  const getNextQuestion = useQuestionStore((state) => state.getNextQuestion);
  const getPreviousQuestion = useQuestionStore(
    (state) => state.getPreviousQuestion
  );

  const questionInfo = questions[currentQuestion];
  return (
    <>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        <IconButton
          onClick={getPreviousQuestion}
          disabled={currentQuestion === 0}
        >
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1}/ {questions.length}
        <IconButton
          onClick={getNextQuestion}
          disabled={currentQuestion >= questions.length - 1}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  );
};

export default Game;
