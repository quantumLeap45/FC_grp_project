import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertParkReviewSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ success: true, message });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ success: false, error: "Invalid contact form data" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const validatedData = insertParkReviewSchema.parse(req.body);
      const review = await storage.createParkReview(validatedData);
      res.status(201).json({ success: true, review });
    } catch (error) {
      console.error("Review submission error:", error);
      res.status(400).json({ success: false, error: "Invalid review data" });
    }
  });

  app.get("/api/reviews/:parkId", async (req, res) => {
    try {
      const { parkId } = req.params;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;
      const reviews = await storage.getParkReviews(parkId, limit, offset);
      res.json({ success: true, reviews });
    } catch (error) {
      console.error("Get reviews error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch reviews" });
    }
  });

  app.get("/api/reviews", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const reviews = await storage.getAllReviews(limit, offset);
      res.json({ success: true, reviews });
    } catch (error) {
      console.error("Get all reviews error:", error);
      res.status(500).json({ success: false, error: "Failed to fetch reviews" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
