"use strict";
import express from "express";
const app = express();
const PORT: number | string = process.env.PORT || 3000;

app.get("/", (req: any, res: any) => {
  res.json({
    msg: "Hello, World!",
  });
});

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
