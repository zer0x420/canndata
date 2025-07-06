import Ajv from "ajv"
import addFormats from "ajv-formats"
import * as fs from "fs"
import YAML from "yaml"
import { globSync } from "glob"

// Ajv Setup Global for Cache reason
const ajv = new Ajv()
addFormats(ajv) 

function loadSchema(schemaPath: string) {
  const file = fs.readFileSync(schemaPath, "utf8")
  return YAML.parse(file)
}

function validateFiles(schemaPath: string, pattern: string) {
  const schema = loadSchema(schemaPath)
  const validate = ajv.compile(schema)

  const files = globSync(pattern)
  console.log(`Validate "${pattern}" with Schema "${schemaPath}"...`)
  if(files.length == 0){
      console.error(` ❓ No Data found in ${schemaPath}:`)
  }

  for (const file of files) {
    const raw = fs.readFileSync(file, "utf8")
    const data = YAML.parse(raw)

    const valid = validate(data)
    if (!valid) {
      console.error(` ❌ Schema in is invalid for ${file}:`)
      console.error(validate.errors)
      process.exitCode = 1
    } else {
      console.log(` ✅ Schema in ${file} is valid`)
    }
  }
}


function main(){
  // Validate strains
  validateFiles("schema/strain.schema.yaml", "data/strains/**/*.yaml")

  // Validate reports
  validateFiles("schema/report.schema.yaml", "data/reports/**/*.yaml")

  // Validate products
  validateFiles("schema/product.schema.yaml", "data/products/**/*.yaml")
}

main();
