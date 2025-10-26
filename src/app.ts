import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { paymentMiddleware, Network } from "x402-express";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const PAY_TO = (process.env.WALLET_ADDRESS || "0x0000000000000000000000000000000000000000") as `0x${string}`;

app.use(
  paymentMiddleware(PAY_TO, {
    "/api/hello": {
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

app.get("/api/hello", (req, res) => {
  const name = req.query.name || "Guest";
  res.json({
    message: `Hello, ${name}! 👋 Welcome to x402 Bazaar.`,
    time: new Date().toISOString(),
  });
});

export default app;
