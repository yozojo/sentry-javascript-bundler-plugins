import { generateOptionsDocumentation } from "@sentry-internal/dev-utils";
import * as fs from "fs";
import * as path from "path";

const readmeTemplate = fs.readFileSync(path.join(__dirname, "..", "README_TEMPLATE.md"), "utf-8");
const readme = readmeTemplate.replace(
  /#OPTIONS_SECTION_INSERT#/,
  generateOptionsDocumentation("webpack")
);
fs.writeFileSync(path.join(__dirname, "..", "README.md"), readme, "utf-8");
