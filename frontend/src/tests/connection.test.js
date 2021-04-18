import axios from "axios";

describe("Prueba de conexión", () => {
  test("Ping probar conexión con backend", async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data, status, statusText } = await axios.get(
      "http://localhost:5000",
      config
    );

    expect(data).toBe("API is running...");
    expect(status).toBe(200);
    expect(statusText).toBe("OK");
  });
});
