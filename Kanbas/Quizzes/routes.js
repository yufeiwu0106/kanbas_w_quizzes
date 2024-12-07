import * as quizzesDao from "./dao.js";

export default function QuizzesRoutes(app) {
  // 查询某课程的所有 Quizzes
  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    try {
      const quizzes = await quizzesDao.findQuizzesForCourse(courseId);
      res.json(quizzes);
    } catch (error) {
      console.error("Error fetching quizzes for course:", error);
      res.sendStatus(500);
    }
  });

  // 创建新的 Quiz
  app.post("/api/quizzes", async (req, res) => {
    const newQuiz = req.body;
    try {
      const createdQuiz = await quizzesDao.createQuiz(newQuiz);
      res.status(201).json(createdQuiz); // 返回新创建的 Quiz
    } catch (error) {
      console.error("Error creating quiz:", error);
      res.sendStatus(500);
    }
  });

  // 更新 Quiz
  app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    try {
      const status = await quizzesDao.updateQuiz(quizId, quizUpdates);
      if (status.modifiedCount === 1) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error("Error updating quiz:", error);
      res.sendStatus(500);
    }
  });

  // 删除 Quiz
  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    try {
      const status = await quizzesDao.deleteQuiz(quizId);
      if (status.deletedCount === 1) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error("Error deleting quiz:", error);
      res.sendStatus(500);
    }
  });

  // 查询所有 Quizzes（可选）
  app.get("/api/quizzes", async (req, res) => {
    try {
      const quizzes = await quizzesDao.findAllQuizzes();
      res.json(quizzes);
    } catch (error) {
      console.error("Error fetching all quizzes:", error);
      res.sendStatus(500);
    }
  });

  // 查询单个 Quiz（可选）
  app.get("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    try {
      const quiz = await quizzesDao.findQuizById(quizId);
      if (quiz) {
        res.json(quiz);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
      res.sendStatus(500);
    }
  });
}
