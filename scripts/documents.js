const fs = require("fs");
const path = require("path");

const sourceDir = "./src/documents/";
const targetDir = "./src/constants/";

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
}

const outputObject = {};

fs.readdirSync(sourceDir).forEach((file) => {
  const filePath = path.join(sourceDir, file);

  if (path.extname(filePath) === ".md") {
    const documentName = path.basename(file, ".md");
    const documentContent = fs.readFileSync(filePath, "utf-8");

    outputObject[documentName] = documentContent;
  }
});

const jsonFilePath = path.join(targetDir, "documents.json");
fs.writeFileSync(jsonFilePath, JSON.stringify(outputObject, null, 2));
