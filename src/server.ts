"use strict";
import { app } from "./routes";
const PORT: number | string = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Listening on PORT: ${PORT}`);
});
