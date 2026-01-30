// generateRoutes.js
const fs = require('fs');
const path = require('path');

const pagesDir = path.resolve(__dirname, 'src/pages');
const indexFile = path.resolve(__dirname, 'src/index.jsx');

function getRoutes() {
    const files = fs.readdirSync(pagesDir);
    let routes = '';

    files.forEach(file => {
        if (file.endsWith('.jsx')) {
            const name = file.replace('.jsx', '');
            routes += `
        <Route path="/${name}" element={<${name} />} />
            `;
        }
    });

    return routes;
}

function generateIndexFile() {
    const routeImports = getRoutes();
    const indexContent = `
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ${routeImports.trim().replace(/<(\w+)>/g, (match, p1) => `import ${p1} from "./pages/${p1}";`)}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <Routes>
            ${routeImports}
        </Routes>
    </Router>
);
`;

    fs.writeFileSync(indexFile, indexContent);
}

generateIndexFile();
