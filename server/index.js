const express = require("express");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");
const { connectDB } = require("./utils/db.utils");
const cors = require("cors")

const PORT = 8080;
// expres instance
const app = express();

connectDB()

app.use(express.json());
app.use(cors());

app.use('/api/auth',authRoutes)
app.use('/api/todos',todoRoutes)



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
