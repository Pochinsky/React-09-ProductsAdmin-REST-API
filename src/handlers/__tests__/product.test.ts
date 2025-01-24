import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
  test("Should display validation errors", async () => {
    const response = await request(server).post("/api/products").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(4);
    expect(response.body.errors).not.toHaveLength(2);
    expect(response.status).not.toBe(404);
  });
  test("Should validate that the price is greater than 0", async () => {
    const response = await request(server)
      .post("/api/products")
      .send({ name: "Monitor", price: 0 });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors).not.toHaveLength(4);
    expect(response.status).not.toBe(404);
  });
  test("Should create a new product", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Product - Testing",
      price: 150,
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("error");
  });
});

describe("GET /api/products", () => {
  test("Should check if /api/products url exists", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).not.toBe(404);
  });
  test("Should return a JSON response with products", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(1);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/products/:id", () => {
  test("Should check a valid id in the url", async () => {
    const response = await request(server).get("/api/products/not-valid-id");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("El id no es válido");
  });
  test("Should return a 404 response for a non-existent product", async () => {
    const productId = 2000;
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Producto no encontrado");
  });
  test("Should return a JSON response for a single product", async () => {
    const response = await request(server).get("/api/products/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
});

describe("PUT /api/productd/:id", () => {
  test("Should check a valid id in the url", async () => {
    const response = await request(server)
      .put("/api/products/not-valid-id")
      .send({
        name: "Monitor actualizado",
        price: 450,
        availability: true,
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("El id no es válido");
  });
  test("Should display validation error messages when updating a product", async () => {
    const response = await request(server).put("/api/products/1").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(5);
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });
  test("Should validate that the price is greater than 0", async () => {
    const response = await request(server).put("/api/products/1").send({
      name: "Monitor actualizado",
      price: 0,
      availability: true,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("El valor no es válido");
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });
  test("Should return a 404 response for a non-existent product", async () => {
    const productId = 2000;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({
        name: "Monitor actualizado",
        price: 450,
        availability: true,
      });
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Producto no encontrado");
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });
  test("Should update an existing product with valid data", async () => {
    const response = await request(server).put("/api/products/1").send({
      name: "Monitor actualizado",
      price: 555,
      availability: true,
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("PATCH /api/products/:id", () => {
  test("Should return a 404 response for a non-existing product", async () => {
    const productId = 2000;
    const response = await request(server).patch(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Producto no encontrado");
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });
  test("Should update the product availability", async () => {
    const response = await request(server).patch("/api/products/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.availability).toBe(false);
    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("error");
  });
});

describe("DELETE /api/products/:id", () => {
  test("Should check valid id", async () => {
    const response = await request(server).delete("/api/products/not-valid-id");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toBe("El id no es válido");
  });
  test("Should return a 404 response for a non-existing product", async () => {
    const productId = 2000;
    const response = await request(server).delete(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Producto no encontrado");
  });
  test("Should delete a product", async () => {
    const reponse = await request(server).delete("/api/products/1");
    expect(reponse.status).toBe(200);
    expect(reponse.body.data).toBe("Producto eliminado");
    expect(reponse.status).not.toBe(400);
    expect(reponse.status).not.toBe(404);
  });
});
