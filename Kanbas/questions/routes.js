import mongoose from "mongoose";
import * as dao from "./dao.js";

export default function QuestionsRoutes(app) {
  const deleteQuiz = async (req, res) => {
    try {
      const { qid, questionId } = req.params;

      const status = await dao.deleteQuestionByQuizIdAndQuestionId(
        qid,
        questionId
      );

      res.json({ status });
    } catch (error) {
      console.log(error);
      res.status(404).send("Quiz not deleted! Try again!");
    }
  };

  const updateQuiz = async (req, res) => {
    const { id } = req.params;
    const status = await dao.updateQuestions(id, req.body);
    res.sendStatus(204);
  };

  const getAllQuizzes = async (req, res) => {
    const quizzes = await dao.findAllQuestions();
    res.json(quizzes);
  };

  const getQuestionsByQuizId = async (req, res) => {
    const { qid } = req.params;
    const questions = await dao.findAllQuestionInQuiz(qid);
    if (!questions) {
      res.status(404).json([]);
      return;
    }
    res.json(questions);
  };

  const createQuestionForQuiz = async (req, res) => {
    try {
      const { qid } = req.params;
      const quiz = await dao.createQuestion({
        ...req.body,
        quizId: qid,
        _id: new mongoose.Types.ObjectId(),
      });
      res.json(quiz);
    } catch (error) {
      console.log(error);
      res.status(404).send("Quiz not created! Try again!");
    }
  };

  app.get("/api/quizzes/:qid/question", getQuestionsByQuizId);
  app.delete("/api/quizzes/:qid/:questionId", deleteQuiz);
  app.put("/api/quizzes/:id/question", updateQuiz);
  app.post("/api/courses/:cid/quizzes/:qid/question", createQuestionForQuiz);
}
