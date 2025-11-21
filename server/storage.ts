import {
  type User,
  type InsertUser,
  type ContactMessage,
  type InsertContactMessage,
  type ParkReview,
  type InsertParkReview,
  users,
  contactMessages,
  parkReviews,
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  createParkReview(review: InsertParkReview): Promise<ParkReview>;
  getParkReviews(parkId: string, limit?: number, offset?: number): Promise<ParkReview[]>;
  getAllReviews(limit?: number, offset?: number): Promise<ParkReview[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactMessages: Map<string, ContactMessage>;
  private parkReviews: Map<string, ParkReview>;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.parkReviews = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date()
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async createParkReview(insertReview: InsertParkReview): Promise<ParkReview> {
    const id = randomUUID();
    const review: ParkReview = {
      ...insertReview,
      id,
      createdAt: new Date()
    };
    this.parkReviews.set(id, review);
    return review;
  }

  async getParkReviews(parkId: string): Promise<ParkReview[]> {
    return Array.from(this.parkReviews.values())
      .filter(review => review.parkId === parkId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getAllReviews(): Promise<ParkReview[]> {
    return Array.from(this.parkReviews.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    if (!db) throw new Error("Database not initialized");
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!db) throw new Error("Database not initialized");
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    if (!db) throw new Error("Database not initialized");
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    if (!db) throw new Error("Database not initialized");
    const [message] = await db.insert(contactMessages).values(insertMessage).returning();
    return message;
  }

  async createParkReview(insertReview: InsertParkReview): Promise<ParkReview> {
    if (!db) throw new Error("Database not initialized");
    const [review] = await db.insert(parkReviews).values(insertReview).returning();
    return review;
  }

  async getParkReviews(parkId: string, limit: number = 10, offset: number = 0): Promise<ParkReview[]> {
    if (!db) throw new Error("Database not initialized");
    const reviews = await db
      .select()
      .from(parkReviews)
      .where(eq(parkReviews.parkId, parkId))
      .orderBy(desc(parkReviews.createdAt))
      .limit(limit)
      .offset(offset);
    return reviews;
  }

  async getAllReviews(limit: number = 50, offset: number = 0): Promise<ParkReview[]> {
    if (!db) throw new Error("Database not initialized");
    const reviews = await db
      .select()
      .from(parkReviews)
      .orderBy(desc(parkReviews.createdAt))
      .limit(limit)
      .offset(offset);
    return reviews;
  }
}

export const storage = process.env.DATABASE_URL ? new DbStorage() : new MemStorage();
