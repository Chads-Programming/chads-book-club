import { generateApiKey } from "../src/app/api/[[...route]]/utils/generate-api-key"

async function main() {
  const name = process.argv[2]
  if (!name) {
    console.error("Please provide a name for the API key")
    process.exit(1)
  }

  try {
    const apiKey = await generateApiKey(name)
    console.log("API key generated successfully:")
    console.log("Name:", apiKey.name)
    console.log("Key:", apiKey.key)
  } catch (error) {
    console.error("Error generating API key:", error)
    process.exit(1)
  }
}

main()
