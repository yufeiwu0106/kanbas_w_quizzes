import * as questionsDao from "./dao.js";

export default function QuestionsRoutes(app) {
    // 获取所有题目
  app.get("/api/questions", async (req, res) => {
    const questions = await questionsDao.findAllQuestions();
    res.json(questions);
  });

  // 获取某个 Quiz 的所有题目
  app.get("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    const questions = await questionsDao.findQuestionsForQuiz(quizId);
    res.json(questions);
  });

  // 创建新题目
  app.post("/api/questions", async (req, res) => {
    const question = req.body;
    try {
      const createdQuestion = await questionsDao.createQuestion(question);
      res.status(201).json(createdQuestion);
    } catch (error) {
      console.error("Error creating question:", error);
      res.sendStatus(500);
    }
  });

  // 更新题目
  app.put("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const updates = req.body;
    try {
      const status = await questionsDao.updateQuestion(questionId, updates);
      if (status.modifiedCount === 1) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error("Error updating question:", error);
      res.sendStatus(500);
    }
  });

  // 删除题目
  app.delete("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    try {
      const status = await questionsDao.deleteQuestion(questionId);
      if (status.deletedCount === 1) {
        res.json({ message: `Question ${questionId} has been deleted.` });
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      res.sendStatus(500);
    }
  });
}
