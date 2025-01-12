// utils/logger.js
import fs from 'fs';
import path from 'path';

// Derive the directory name equivalent in ES Modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Define the log file path
const logFilePath = path.join(__dirname, '../logs/app.log');

// Function to log messages
export const log = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] - ${message}\n`;

  // Output the log message to the console
  console.log(logMessage);

  // Append the log message to the log file
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
};
