import express from "express";
import OpenAI from "openai";

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { alerts } = req.body;

    const prompt = `
You are a Dell EMC Data Domain support engineer.

Analyze the following alerts:

${alerts}

Provide:
- Alert Summary
- Root Cause
- Impact
- Severity
- Fix Steps
- Validation Commands
- Risk if Ignored
`;

    const response = await client.chat.completions.create({
      model: "gpt-5.1",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      analysis: response.choices[0].message.content,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Analysis failed",
    });
  }
});

export default router;
