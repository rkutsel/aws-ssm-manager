// THIS CONFIG FILE CONTAINS DEFAULT CONFIGURATION VALUES

export const ssmConfigOptions = {
  format: { json: "JSON", text: "Text", file: "Save To File" },
  regions: ["US-WEST-2", "US-EAST-1", "EU-WEST-1"],
  tier: "Standard", //Standard | Advanced | Intelligent-Tiering
  override: false,
  outputDir: "./output",
};
