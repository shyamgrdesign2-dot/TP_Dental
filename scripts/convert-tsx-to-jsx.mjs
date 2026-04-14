/**
 * Batch-convert .tsx → .jsx (strip TypeScript syntax only).
 * Run from repo root: node scripts/convert-tsx-to-jsx.mjs
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import ts from "typescript"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")

const SKIP_DIRS = new Set(["node_modules", ".next", ".git", "dist", "build"])

function walkTsx(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      if (SKIP_DIRS.has(ent.name)) continue
      walkTsx(p, acc)
    } else if (ent.name.endsWith(".tsx")) {
      acc.push(p)
    }
  }
  return acc
}

const files = walkTsx(root)
const report = { converted: 0, skipped: [], errors: [] }

for (const tsxPath of files) {
  const src = fs.readFileSync(tsxPath, "utf8")
  const { outputText, diagnostics } = ts.transpileModule(src, {
    fileName: tsxPath,
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
      skipLibCheck: true,
    },
  })

  const hardErrors = (diagnostics || []).filter((d) => d.category === ts.DiagnosticCategory.Error)
  if (hardErrors.length) {
    report.errors.push({
      file: path.relative(root, tsxPath),
      msg: hardErrors.map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n")).join("; "),
    })
    continue
  }

  const jsxPath = tsxPath.replace(/\.tsx$/, ".jsx")
  fs.writeFileSync(jsxPath, outputText)
  fs.unlinkSync(tsxPath)
  report.converted++
}

console.log(JSON.stringify(report, null, 2))
if (report.errors.length) process.exitCode = 1
