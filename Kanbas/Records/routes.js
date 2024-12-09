import express from "express";
import {
  createRecord,
  findRecordsForQuiz,
  findRecordsForUser,
  findRecordsForQuizAndUser,
  deleteRecord,
} from "./dao.js";

export default function RecordsRoutes(app) {
  const router = express.Router();
  app.use("/", router);

  // 创建新的记录
  router.post("/api/records", async (req, res) => {
    const record = req.body;
    console.log("POST /api/records - Incoming data:", record);
    try {
      const newRecord = await createRecord(record);
      console.log("POST /api/records - Created record:", newRecord);
      res.status(201).json(newRecord);
    } catch (error) {
      console.error("Error creating record:", error);
      res.status(500).send("Failed to create record.");
    }
  });

  // 获取某个 Quiz 的所有记录
  router.get("/api/records/quiz/:quizId", async (req, res) => {
    const { quizId } = req.params;
    console.log("GET /api/records/quiz/:quizId - quizId:", quizId);
    try {
      const records = await findRecordsForQuiz(quizId);
      res.json(records);
    } catch (error) {
      console.error("Error fetching records for quiz:", error);
      res.status(500).send("Failed to fetch records.");
    }
  });

  // 获取某个 User 的所有记录
  router.get("/api/records/user/:userId", async (req, res) => {
    const { userId } = req.params;
    console.log("GET /api/records/user/:userId - userId:", userId);
    try {
      const records = await findRecordsForUser(userId);
      res.json(records);
    } catch (error) {
      console.error("Error fetching records for user:", error);
      res.status(500).send("Failed to fetch records.");
    }
  });

  // 获取某个 Quiz 下某个 User 的所有记录
  router.get("/api/records/quiz/:quizId/user/:userId", async (req, res) => {
    const { quizId, userId } = req.params;
    console.log(
      "GET /api/records/quiz/:quizId/user/:userId - quizId:",
      quizId,
      "userId:",
      userId
    );
    try {
      const records = await findRecordsForQuizAndUser(quizId, userId);
      res.json(records);
    } catch (error) {
      console.error("Error fetching records for quiz and user:", error);
      res.status(500).send("Failed to fetch records.");
    }
  });

  // Fetch the Last Record of A User of A Quiz
  router.get(
    "/api/records/quiz/:quizId/user/:userId/last",
    async (req, res) => {
      const { quizId, userId } = req.params;

      try {
        // Fetch all records for the specified quizId and userId
        const records = await findRecordsForQuizAndUser(quizId, userId)
          .sort({ attemptTime: -1 }) // Sort by attemptTime in descending order to get the most recent record
          .limit(1); // Limit to 1 record to only get the latest one

        // if (records.length === 0) {
        //   // return null;
        //   res.status(404).send("No records found for this quiz and user.");
        // }
        if (records.length === 0) {
          // Explicitly return null if no records found
          return res.json(null);
        }
        // Send the latest record as response
        res.json(records[0]);
      } catch (error) {
        console.error(
          "Error fetching the last record for quiz and user:",
          error
        );
        res.status(500).send("Failed to fetch the last record.");
      }
    }
  );

  // 删除一条记录
  router.delete("/api/records/:recordId", async (req, res) => {
    const { recordId } = req.params;
    console.log("DELETE /api/records/:recordId - recordId:", recordId);
    try {
      const status = await deleteRecord(recordId);
      console.log("DELETE /api/records/:recordId - Delete status:", status);
      if (status.deletedCount === 1) {
        res.status(204).send("Record deleted successfully.");
      } else {
        res.status(404).send("Record not found.");
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      res.status(500).send("Failed to delete record.");
    }
  });
}
