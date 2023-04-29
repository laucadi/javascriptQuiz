import { Button } from "@mui/material";
import { useQuestionStore } from "./store/questions";

const Start = () => {
  const fetchQuestions = useQuestionStore((state) => state.fecthQuestions);
  const handleClick = () => {
    fetchQuestions(5);
  };
  return (
    <Button onClick={handleClick} variant="contained">
      Empezar!
    </Button>
  );
};

export default Start;
