import request from "supertest";

import app from "../app";

describe("Auth API", () => {
    it("should register a new user", async () => {
        const res = await request(app).post("/api/users/register").send({
            name: "Test Joe",
            email: "testy@testou.test",
            password: "123456"
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("token");
    });

    it("sould not register a user with an existing email", async () => {
        await request(app).post("/api/users/register").send({
            name: "Test Joe",
            email: "testy@testou.test",
            password: "123456"
        });

        const res = await request(app).post("/api/users/register").send({
            name: "Test Joe",
            email: "testy@testou.test",
            password: "123456"
        });

        expect(res.statusCode).toBe(400);
    });

    it("should login with valid credentials", async () => {
        await request(app).post("/api/users/register").send({
            name: "Test Joe",
            email: "testy@testou.test",
            password: "123456"
        });

        const res = await request(app).post("/api/users/login").send({
            email: "testy@testou.test",
            password: "123456"
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
    });

    it("should not login with incorrect password", async () => {
        const res = await request(app).post("/api/users/login").send({
            email: "testy@testou.test",
            password: "wrongPassword123"
        });

        expect(res.statusCode).toBe(401);
    });
});