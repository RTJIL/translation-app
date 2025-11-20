import OpenAI from "openai"

export const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

export async function generateResponse(userInput, language) {
  const messages = [
    {
      role: "developer",
      content: `Act like a proffesional translator. Translate the following text to ${language}. Do it as precise as possible, but if there are any complex words, translate them too like a native speaker.`,
    },
    {
      role: "user",
      content: userInput,
    },
  ]

  const response = await client.responses.create({
    model: "gpt-4.1-nano",
    input: messages,
    max_output_tokens: 500,
    temperature: 1.1,
    top_p: 0.8,
  })

  return response.output_text
}

// TODO: add DALLE-3 to generate image for hero
