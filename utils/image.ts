import { time } from "console";
import OpenAI from "openai";

export const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const imageToText = async (base64Image: any) => {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
  });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Can you give me a response in a JSON format by reading this receipt and outputting each line item with its corresponding prices and information. The JSON should be contain the list of items, with the item name, its price and quantity. Make sure you only get the unit price, not the total fields. The json fields should be name, quantity, price.",
            },
            {
              type: "image_url",
              image_url: {
                url: base64Image,
              },
            },
          ],
        },
      ],
    });

    if (response.choices && response.choices.length > 0) {
      return response.choices[0].message.content;
    } else {
      console.error("No choices returned in the response.");
      return null;
    }
  } catch (error) {
    console.error("Error generating text:", error);
    return null;
  }
};
