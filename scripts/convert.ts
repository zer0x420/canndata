import * as fs from "fs"
import * as path from "path"
import YAML from "yaml"
import { globSync } from "glob"
import * as fse from "fs-extra"

const YAML_DATA_DIR = "data/"
const PUBLIC_DATA_DIR = "web/public/data/"
const PUBLIC_IMAGES_DIR = path.join(PUBLIC_DATA_DIR, "images")

function loadYamlFiles(pattern: string): any[] {
  const files = globSync(pattern)
  return files.map(file => {
    const content = fs.readFileSync(file, "utf8")
    return { file, data: YAML.parse(content) }
  })
}

function loadData<T>(dataFolder: string, map: (data: T, file: string) => T): Array<T> {
  const filePattern = path.join(YAML_DATA_DIR, dataFolder, "/**/*.yaml")
  const dataFiles = loadYamlFiles(filePattern)
  return dataFiles.map(df => {
    return map(df.data, df.file);
  });
}

function exportData(output: any[], filename: string) {
  fse.ensureDirSync(PUBLIC_DATA_DIR)
  const outputPath = path.join(PUBLIC_DATA_DIR, filename)
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2))
  console.log(`✅ Exported ${output.length} Records to ${filename}`)
}

function copyAssets(dataFolder: string, outFolder: string) {
  const src = path.join(YAML_DATA_DIR, dataFolder);
  const dest = path.join(PUBLIC_IMAGES_DIR, outFolder);

  const files = globSync("**/*.{jpg,jpeg,png}", {
    cwd: src,
    absolute: false,
    nodir: true,
  });

  for (const fileRel of files) {
    const srcFile = path.join(src, fileRel);
    const destFile = path.join(dest, fileRel);

    fse.ensureDirSync(path.dirname(destFile));
    fse.copyFileSync(srcFile, destFile);
  }

  console.log(`📁 Copied ${files.length} Assets for ${dataFolder}`);
}

function copyAssetsPerEntry(dataFolder: string, getIdFromFile: (file: string) => string) {
  const basePath = path.join(YAML_DATA_DIR, dataFolder);
  const files = globSync("**/*.yaml", {
    cwd: basePath,
    absolute: false,
    nodir: true,
  });

  let total = 0;

  for (const yamlFile of files) {
    const yamlPath = path.join(basePath, yamlFile);
    const id = getIdFromFile(yamlPath);

    const entryDir = path.dirname(yamlPath);
    const images = globSync("**/*.{jpg,jpeg,png}", {
      cwd: entryDir,
      absolute: false,
      nodir: true,
    });

    for (const img of images) {
      const src = path.join(entryDir, img);
      const dest = path.join(PUBLIC_IMAGES_DIR, dataFolder, id, img);

      fse.ensureDirSync(path.dirname(dest));
      fse.copyFileSync(src, dest);
      total++;
    }
  }

  console.log(`📁 Copied ${total} Assets into per-entry folders for ${dataFolder}`);
}


function exportFull(dataFolder: string, dataMapper: (data: any, file: string) => any, assetMapper: (file: string) => string): void {
  exportData(loadData<any>(dataFolder, dataMapper), `${dataFolder}.json`)
  copyAssetsPerEntry(dataFolder, assetMapper)
}

function main() {
  if (fse.existsSync(PUBLIC_DATA_DIR)) {
    fse.removeSync(PUBLIC_DATA_DIR)
  }

  fse.ensureDirSync(PUBLIC_DATA_DIR)

  const mapIdWithFilename = (data: any, file: string) => {
    data["id"] = path.basename(file, path.extname(file));
    return data;
  };
  const mapIdWithFilenameNestedFunc = (
    mainFolder: string,
    path_key: string,
    depthFromMain: number
  ) => {
    return (data: any, file: string) => {
      const dirParts = path.dirname(file).split(path.sep);
      const mainIndex = dirParts.indexOf(mainFolder);
      const pathParts = dirParts.slice(mainIndex + 1, mainIndex + 1 + depthFromMain);
      const pathId = pathParts.join("-");
      const fileId = path.basename(file, path.extname(file));

      data["id"] = `${pathId}-${fileId}`;
      data[path_key] = pathId;

      return data;
    };
  };

  const getIdFromFile = (file: string) =>
    path.basename(file, path.extname(file));

  const mapIdWithFilenameNestedFuncAssets = (
    mainFolder: string,
    depthFromMain: number
  ) => {
    return (file: string) => {
      const dirParts = path.dirname(file).split(path.sep);
      const mainIndex = dirParts.indexOf(mainFolder);
      const pathParts = dirParts.slice(mainIndex + 1, mainIndex + 1 + depthFromMain);
      const pathId = pathParts.join("-");
      const fileId = path.basename(file, path.extname(file));

      return [pathId, fileId].join("-");
    };
}


  exportFull("strains", mapIdWithFilename, getIdFromFile)
  exportFull("products", mapIdWithFilenameNestedFunc("products", "strain_id", 1), mapIdWithFilenameNestedFuncAssets("products", 1))
  exportFull("reports", mapIdWithFilenameNestedFunc("reports", "product_id", 2), mapIdWithFilenameNestedFuncAssets("reports", 2))
}

main()
