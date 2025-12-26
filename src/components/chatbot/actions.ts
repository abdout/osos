'use server';

import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY || ''
});

export async function sendMessage(messages: Message[]) {
  try {
    // Check if API key is available
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return {
        success: false,
        error: 'Groq API key not configured. Please add GROQ_API_KEY to your .env.local file.'
      };
    }

    const result = await generateText({
      model: groq('llama-3.1-8b-instant'),
      messages,
      system: `You are a Mazin Logistics assistant. Give VERY SHORT, practical answers (2-3 sentences max). Always provide specific options when relevant.

## Services & Capabilities:

**Shipping Services:**
- Sea Freight: FCL (Full Container Load) & LCL (Less than Container Load)
- Air Freight: Express and standard cargo delivery
- Ground Transport: Local and regional delivery services

**Key Features:**
- Real-time shipment tracking
- Customs clearance handling
- Warehouse management
- Multi-carrier support
- Door-to-door delivery

**Coverage:**
- International shipping to 150+ countries
- Regional coverage across Middle East and Africa
- Local delivery in Sudan

## Contact Information:
- Email: info@mazin.com
- WhatsApp: Available for instant support
- Working hours: Sunday-Thursday, 8AM-5PM

## Response Rules:
1. Keep answers under 40 words
2. Always give 2-3 specific options when discussing services/pricing
3. End with a clear next step or question
4. Use bullet points for options
5. For tracking questions, ask for the tracking number
6. For quotes, ask about shipment details (origin, destination, cargo type, weight)

Example: "We offer 2 shipping options:
• Sea Freight: Cost-effective for large cargo (7-14 days)
• Air Freight: Express delivery (2-5 days)
Which would you prefer?"`,
    });

    return {
      success: true,
      content: result.text
    };
  } catch (error) {
    console.error('Server Action Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    };
  }
}
