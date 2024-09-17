import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const regex = /win_error=[^\n]+([^\t]+wiredfurni\.view_in_menu=[^\n]+)/;

function removeHtmlTags(str: string): string {
  return str.replace(/<[^>]*>/g, "");
}

async function convertTxtResultToJson(
  url: string,
  folderToSave: string,
): Promise<void> {
  const response = await fetch(url);
  const data = await response.text();

  const match = data.match(regex);

  if (!match || match.length < 2) {
    console.log("No external variables found");
    return;
  }

  const externalVariablesContent = match[1].trim();
  const lines = externalVariablesContent.split("\n");

  const jsonResult: { [key: string]: any } = {};

  lines.forEach((line: string) => {

    const index = line.indexOf("=");
    if (index === -1) return;

    const key = line.substring(0, index).trim();
    let value = line.substring(index + 1).trim();

    if (key && value) {
      const keys = key.split(".");

      if (keys[0] === "wiredfurni") {
        keys.shift();
      }

      let current = jsonResult;

      value = removeHtmlTags(value).replace(/%(\w+)%/g, "{{$1}}");

      keys.forEach((part: string, index: number) => {
        if (index === keys.length - 1) {
          if (typeof current[part] === "object" && current[part] !== null) {
            current[part]["title"] = value;
          } else {
            current[part] = value;
          }
        } else {
          current[part] = current[part] || {};
          current = current[part];
        }
      });
    }
  });

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const folderPath = path.join(__dirname, "..", "locales", folderToSave);
  await fs.mkdir(folderPath, { recursive: true });

  const filePath = path.join(folderPath, "wired_params.json");
  await fs.writeFile(filePath, JSON.stringify(jsonResult, null, 2));
}

(async () => {
  const countries = ["br", "de", "en", "es", "fi", "fr", "it", "nl", "tr"];
  await Promise.all(
    countries.map(async (country) => {
      let updatedCountry = country;

      if (country === "en") {
        updatedCountry = "com";
      }

      if (country === "tr") {
        updatedCountry = "com.tr";
      }

      if (country === "br") {
        updatedCountry = "com.br";
      }

      const url = `https://www.habbo.${updatedCountry}/gamedata/external_flash_texts/0`;
      await convertTxtResultToJson(url, country);
    })
  );
})();
