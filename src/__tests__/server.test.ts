import { connectDB } from "../server";
import db from "../config/db";

jest.mock("../config/db");

describe("connectDB", () => {
  test("Should handle database connection error", async () => {
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(new Error("Server failed to connect to DB"));
    const consoleSpy = jest.spyOn(console, "error");
    await connectDB();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Server failed to connect to DB")
    );
  });
});
