export default function QuizzesRoutes(app) {
    // update quiz
    app.put("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        const status = await quizzesDao.updateQuiz(quizId, quizUpdates);
        if (status.modifiedCount === 1) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    });

    // delete quiz
    app.delete("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const status = await quizzesDao.deleteQuiz(quizId);
        if (status.deletedCount === 1) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    });

}