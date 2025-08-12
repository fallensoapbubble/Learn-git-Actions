import express from "express";
import utils from "./utils.js";
const app = express();
const port = 4000;

// 1. Define your notes data
// In a real application, this would come from a database.

const notes = [
    {
        title: "What is PM2?",
        content:
            "PM2 is a process manager for Node.js applications. It helps keep your application alive forever, reloads it without downtime, and helps manage logs and performance.",
    },

    {
        title: "What is a GitHub Actions YAML file?",
        content:
            "It's a configuration file that defines automated workflows. Key parts include 'name' (workflow title), 'on' (triggers like push or pull_request), 'jobs' (tasks to run), and 'steps' (individual commands or actions).",
    },
    {
        title: "What does 'sudo chmod o+x' do?",
        content:
            "This command changes file permissions. 'sudo' runs it with admin rights, 'chmod' is the change mode command, and 'o+x' gives 'others' (all non-owner/group users) 'execute' permission on a file or directory.",
    },
    {
        title: "How does 'sudo pm2 restart' work?",
        content:
            "It restarts an application managed by PM2. For example, 'sudo pm2 restart app' will gracefully restart the application named 'app', applying new code without downtime.",
    },
    {
        title: "Why use 'nano .env' on an EC2 instance?",
        content:
            "It's used to securely create or edit a .env file directly on the server. This file stores environment-specific secrets (like API keys) that should never be committed to Git. 'nano' is a simple command-line text editor.",
    },
    {
        title: "GitHub-Hosted vs Self-Hosted Runners",
        content:
            "GitHub-hosted runners are managed by GitHub, offering a clean, maintenance-free environment. Self-hosted runners are your own machines, providing full control over the environment, hardware, and network access.",
    },
    {
        title: "What is Nginx?",
        content:
            "Nginx is a high-performance web server, reverse proxy, and load balancer. It can serve static files, forward requests to backend applications like a Node.js server, and distribute traffic across multiple servers.",
    },
    {
        title: "What are ESLint and Jest?",
        content:
            "ESLint is a linter that analyzes code to find and fix stylistic errors and potential bugs. Jest is a testing framework used to write and run tests to ensure that your code works as expected.",
    },
    {
        title: "What is `git branch -M`?",
        content:
            "This command renames the current branch. The `-M` is a shortcut for `--move --force`. It's most commonly used to rename the default `master` branch to `main` after initializing a repository.",
    },
    {
        title: "What is `git checkout -b`?",
        content:
            "This is a shortcut command that creates a new branch and immediately switches to it. It's used daily to start work on a new feature or bugfix in an isolated environment.",
    },
    {
        title: "The `git add` and `git commit` Workflow",
        content:
            'This is the two-step process for saving changes. `git add <file>` moves your changes to a "staging area". `git commit -m "message"` takes everything in the staging area and saves it permanently to your project\'s history with a descriptive message.',
    },
    {
        title: "What is `git remote add origin`?",
        content:
            "This command connects your local Git repository to a remote one (like on GitHub). `remote` manages connections, `add` creates a new one, and `origin` is the standard nickname for your remote URL.",
    },
    {
        title: "`git add --all` vs `git add .`",
        content:
            "In modern Git, they are very similar. The key difference is scope: `git add .` stages changes from the current directory down, while `git add --all` (or -A) stages all changes in the entire repository, regardless of where you run the command. Using `--all` is generally safer and more explicit.",
    },
];

// This is your original server start logic
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

//1

app.get("/str/:text", (req, res) => {
    try {
        // Get the text from the URL parameter
        const inputText = req.params.text;

        // Use the capitalize function from your utils library
        const capitalizedText = utils.capitalize(inputText);

        // Send a JSON response with the original and capitalized text
        res.json({
            original: inputText,
            capitalized: capitalizedText,
        });
    } catch (error) {
        // If the capitalize function throws an error (e.g., for empty input),
        // send a 400 Bad Request status with the error message.
        res.status(400).json({
            error: error.message,
        });
    }
});

// 2
app.get("/", (req, res) => {
    // We will build an HTML string to send back to the browser
    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Revision Notes</title>
      <style>
        body { font-family: sans-serif; line-height: 1.6; padding: 20px; background-color: #f4f4f4; }
        .container { max-width: 800px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; }
        .note { border-bottom: 1px solid #ddd; padding-bottom: 15px; margin-bottom: 15px; }
        .note:last-child { border-bottom: none; }
        h1 { color: #333; }
        h2 { color: #555; }
      </style>
    </head>
    <body>
      <div class="container">
      <a href="https://docs.github.com/en/actions">DOC1</a>
      <a href="https://github.com/actions">DOC2</a>
      <a href="/revision">IMP TABLE</a>

        <h1>Revision Page</h1>
        <p>Here are all the notes from the site content.</p>
        <hr>
  `;

    // Loop through the notes array and add each one to the HTML
    notes.forEach((note) => {
        html += `
      <div class="note">
        <h2>${note.title}</h2>
        <p>${note.content}</p>
      </div>
    `;
    });

    // Close the HTML tags
    html += `
      </div>
    </body>
    </html>
  `;

    // Send the complete HTML page as the response
    res.send(html);
});

//3
app.get("/revision", (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CommonJS vs. ES Modules</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          margin: 40px;
          background-color: #f9f9f9;
          color: #333;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          box-shadow: 0 2px 15px rgba(0,0,0,0.1);
          background-color: white;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 12px 15px;
          text-align: left;
          vertical-align: top;
        }
        th {
          background-color: #4CAF50;
          color: white;
          font-weight: bold;
        }
        tr:nth-child(even) {
          background-color: #f2f2f2;
        }
        code {
          background-color: #eee;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: "Courier New", Courier, monospace;
        }
        h1 {
          text-align: center;
          color: #444;
        }
      </style>
    </head>
    <body>
      <h1>CommonJS vs. ES Modules</h1>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>CommonJS (CJS)</th>
            <th>ES Modules (ESM)</th>
          </tr>
        </thead>
        <a href="/">HOME</a>
           <tbody>
          <tr>
            <td><strong>Enabling</strong></td>
            <td>Default in Node.js. Or explicitly set <code>"type": "commonjs"</code> in <code>package.json</code>.</td>
            <td>Set <code>"type": "module"</code> in <code>package.json</code> or use the <code>.mjs</code> file extension.</td>
          </tr>
          <tr>
            <td><strong>Importing a Single Item</strong></td>
            <td><code>const myModule = require('./file');</code></td>
            <td><code>import myModule from './file.js';</code></td>
          </tr>
          <tr>
            <td><strong>Exporting a Single Item</strong></td>
            <td><code>module.exports = myObject;</code></td>
            <td><code>export default myObject;</code></td>
          </tr>
          <tr>
            <td><strong>Importing Multiple Items</strong></td>
            <td>Uses object destructuring: <code>const { item1, item2 } = require('./file');</code></td>
            <td>Uses named imports with curly braces: <code>import { item1, item2 } from './file.js';</code></td>
          </tr>
           <tr>
            <td><strong>Exporting Multiple Items</strong></td>
            <td>Export an object with multiple properties: <code>module.exports = { item1, item2 };</code></td>
            <td>Use multiple named exports: <code>export const item1 = ...;</code><br><code>export const item2 = ...;</code></td>
          </tr>
          <tr>
            <td><strong>Loading</strong></td>
            <td><strong>Synchronous</strong>: Modules are loaded and executed one by one when <code>require()</code> is called.</td>
            <td><strong>Asynchronous</strong>: Modules are parsed and loaded before any code is executed, which can be more performant.</td>
          </tr>
          <tr>
            <td><strong>Key Difference</strong></td>
            <td>Dynamic and flexible. You can <code>require()</code> a module conditionally inside a function.</td>
            <td>Static and explicit. <code>import</code> statements must be at the top level of the file, allowing for better static analysis and optimizations.</td>
          </tr>
        </tbody>

      </table>
    </body>
    </html>
  `;
    res.send(html);
});
