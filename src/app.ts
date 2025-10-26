import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { paymentMiddleware, Network } from "x402-express";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(
  paymentMiddleware("0xaaa", {
    "/api/weather": {
      price: "$0.001", // 每次调用价格（单位美元）
      network: "base", // Base 网络
      config: {
        discoverable: true, // ✅ 允许被 Bazaar 自动收录
        description: "Get current weather data for any location",
        inputSchema: {
          queryParams: {
            location: "City name or coordinates",
          },
        },
        outputSchema: {
          type: "object",
          properties: {
            temperature: { type: "number" },
            conditions: { type: "string" },
            humidity: { type: "number" },
          },
        },
      },
    },
  })
);

app.get("/", (_req: Request, res: Response) => {
  res.json({ ok: true, message: "Hello Express + pnpm (TS)!" });
});

export default app;
