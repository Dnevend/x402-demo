import "dotenv/config";
import app from "./app.js"; // TypeScript + NodeNext 下 .js 后缀由编译映射

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
