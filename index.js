const express = require("express");
const path = require("path");

const app = express();

// Define the path to your static files (game.html, CSS, JavaScript, etc.)
const staticPath = path.join(__dirname, 'static');

// Serve the static HTML file
app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "game.html"));
});

// Serve static assets from the 'static' directory
app.use(express.static(staticPath));

const port = process.env.PORT || 5001; // Use the specified port or 5000 as a default

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
