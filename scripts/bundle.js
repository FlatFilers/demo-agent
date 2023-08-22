const fs = require("fs");
const path = require("path");
const ncc = require("@vercel/ncc");

const outDir = path.join(process.cwd(), "dist");

async function bundle() {
  return await ncc(path.join(outDir, "_entry.js"), {
    minify: false,
    target: "es2020",
    cache: false,
  })
    .then(({ code }) => {
      fs.writeFileSync(path.join(outDir, "demo.js"), code, "utf8");
    })
    .catch((error) => {
      console.error("ERROR Bundling Demo Agent: ", error);
    });
}

bundle();
