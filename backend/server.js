const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase=require('./config/database');
// Handling uncaught exception in the code 

process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down server due to uncaught exception');
    process.exit(1);
});

// Load environment variables from config.env
dotenv.config({ path: "backend/config/config.env" });

// connection database
connectDatabase();
// Start the server
const PORT = process.env.PORT || 5000; // Fallback port in case env variable isn't set
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Unhandled promise rejection;
process.on("unhandledRejection",err=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);
    server.close(()=>{
        process.exit(1);
    });
})