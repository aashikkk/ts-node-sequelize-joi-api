import app from "./app";
import dotenv from "../config/dotenv";

const PORT = dotenv.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
