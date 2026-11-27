import express from "express";
import cors from "cors";
import chatRouter from "./routes/chat.js";
import booksRouter from "./routes/books.js";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "5mb"}));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/chat", chatRouter);
app.use("/api", booksRouter);


app.use("/api", (req, res) => {
  res.status(404).json({ pesan: "Endpoint tidak ditemukan" });
});


app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ pesan: err.message || "Terjadi kesalahan pada server" });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});