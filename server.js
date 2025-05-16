const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/home", require("./routes/home"));
app.use("/api/about", require("./routes/about"));
app.use("/api/ourscope", require("./routes/ourscope"));
app.use("/api/scholarships", require("./routes/scholarships"));
app.use("/api/institutions", require("./routes/institutions"));
app.use("/api/academy", require("./routes/academy"));
app.use("/api/vidhyavanam", require("./routes/vidhyavanam"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/donate", require("./routes/donate"));
app.use("/api/testimonials", require("./routes/testimonials"));
app.use("/api/newsEvents", require("./routes/newsEvents"));
app.use("/api/social", require("./routes/social"));
app.use("/api/user", require("./routes/user"));
app.use("/api/masterbanner", require("./routes/masterbanner"));
app.use("/api/masterquote", require("./routes/masterquote"));
app.use("/api/masterdonate", require("./routes/masterdonate"));
app.use("/api/mastercontact", require("./routes/mastercontact"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
