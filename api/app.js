
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const organizationRoutes = require("./routes/organization.routes");
const cors = require("cors");
const db = require("./config/database");

const PORT = 3000;
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/organisations", organizationRoutes);

db.query("SELECT 1")
	.then(() => {
		console.log("db connection established!!!");
		app.listen(PORT, () => {
			console.log(`Server is listening on port ${PORT}`);
		});
	})
	.catch((err) => console.log(`db connection failed. ${err}`));


