import * as fs from "fs"
import * as fse from "fs-extra"
import * as path from "path"
import YAML from "yaml"
import { compile, compileFromFile } from 'json-schema-to-typescript'
import { globSync } from "glob"

const SCHEMA_MODEL_DIR = "web/src/schema"
const SCHEMA_DIR = "schema/"

function loadSchema(schemaPath: string) {
  const file = fs.readFileSync(schemaPath, "utf8")
  return YAML.parse(file)
}

function compileSchema(schemaPath: string, destDir: string) {
  const schemaFilename = schemaPath.split("/").pop() || ""
  const schemaName = schemaFilename.replace(".schema.yaml", "")

  const destSchemaPath = path.join(destDir, schemaName)

  const schema = loadSchema(schemaPath)
  compile(schema, schemaName)
    .then((ts: any) => fs.writeFileSync(destSchemaPath + '.d.ts', ts))

  console.log(`✅ Exported Schema ${schemaFilename} to ${destSchemaPath + '.d.ts'}`)
}

function main(){
  if (fse.existsSync(SCHEMA_MODEL_DIR)) {
    fse.removeSync(SCHEMA_MODEL_DIR)
  }

  fse.ensureDirSync(SCHEMA_MODEL_DIR)

  const files = globSync(path.join(SCHEMA_DIR,"*.yaml"))
  for (const file of files) {
    // Schema to TypeScript
    compileSchema(file, SCHEMA_MODEL_DIR)
  }
}

main();