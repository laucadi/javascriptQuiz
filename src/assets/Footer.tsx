import { useQuestionsData } from "../hooks/useQuestionsData";
import { Button, Box } from "@mui/material";
import { useQuestionStore } from "../store/questions";

const Footer = () => {
  const { correct, incorrect, unanswer } = useQuestionsData();
  const reset = useQuestionStore((state) => state.reset);
  return (
    <footer>
      <strong>
        {`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ${unanswer} sin
        responder`}
      </strong>
      <Box sx={{ mt: 5 }}>
        <Button onClick={() => reset()}>empezar de nuevo! </Button>
      </Box>
    </footer>
  );
};

export default Footer;
