// app/api/chat/route.ts
import { GoogleGenAI } from "@google/genai";
import { readFileSync, readdirSync } from 'fs';
import path from 'path';

export const maxDuration = 30;

// Load docs at startup
function loadDocs(): string {
  const docsDir = path.join(process.cwd(), 'public/docs');
  
  try {
    const files = readdirSync(docsDir);
    const docs: string[] = [];

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.txt', '.md'].includes(ext)) {
        const content = readFileSync(path.join(docsDir, file), 'utf-8');
        docs.push(`<document name="${file}">\n${content}\n</document>`);
      }
    }

    return docs.join('\n\n');
  } catch {
    return '';
  }
}

const documents = loadDocs();

const systemPrompt = `You are a friendly AI assistant on Raham Butt's portfolio website. Answer questions about Raham based on the information below and the supporting documents.

## Quick Overview

**Current Status**
- Master's student at Hofstra University (graduated with BS in Computer Science & Cybersecurity Cum Laude in December 2025, MS in Computer Science expected May 2026)
- CS Tutor for 5 courses and Student Technician
- Founder & President of Hofstra C.O.D.E
- ACM Chapter Chair at Hofstra
- Most Recent Project: Zero Knowledge Proof Systems for Field Programmable Gate Arrays

**Master's Thesis**
Zero Knowledge Proof Systems for Field Programmable Gate Arrays - advised by Dr. Xiang Fu
- Comparing performance between AWS F1/F2 FPGA instances and CUDA-based GPU acceleration
- Focus on Montgomery multiplication for BN254 curves and Multi-Scalar Multiplication (MSM)
- Working on Nova folding framework optimization
- Target: 60% faster than GPU implementation
- Related projects: bn254_cuda, bn254_cuda_rust

**Technical Skills**
- Languages: Python, C/C++, Rust, Java, JavaScript, SQL (Postgres), MASM Assembly, PHP, Dart, SystemVerilog
- Cyber Tools: Ghidra, IDA Free, Metasploit Framework, Wireshark, GDB, Burp Suite, Kali Linux, Nmap, TCPdump
- Developer Tools: Git, Docker, Linux/Unix, Vim, VS Code, CI/CD pipelines
- Hardware: FPGA design, CUDA, Embedded systems (ESP32, Arduino, Raspberry Pi)
- Web: Next.js, React, Flask, Flutter, Node.js, PostgreSQL
- Analysis: Reverse Engineering, Memory forensics, Network traffic analysis, Threat modeling

**Notable Projects**
- AirSecure: Rogue access point & evil twin detection with ML-powered analysis (Team Lead, Scrum Master)
- PhishNet: ML-based phishing detection Chrome extension with 87% accuracy
- UniLoop: Flutter-based social app for educational institutions
- Abstract-Machine: 16-bit virtual machine implementation in C++
- Offensive Security: Custom Metasploit modules, binary exploitation, vulnerability research

**Achievements & CTF**
- Winner: Pros vs Joes CTF (Bsides Delaware 2025)
- Winner: Amazon CTF (2025)
- Finalist: Amazon CTF (2023)
- Winner: Pensar AI Hackathon
- 7x Dean's List recipient

**Contact**
- Email: rahamriaz@gmail.com
- LinkedIn: linkedin.com/in/rahambutt
- GitHub: github.com/raham24

## Supporting Documents
${documents || 'No additional documents loaded.'}

## Instructions
- Do not answer questions unrelated to Raham Butt
- Be conversational and friendly
- Give specific, detailed answers using the information from the documents above
- Answer questions directly - DO NOT tell users to "refer to" or "find more in" the documents, just provide the information
- Use the information from resumes, thesis proposal, and transcripts to answer comprehensively
- If asked about coursework, provide the course information but do not give the grade unless specifically asked
- Do not mention CGPA unless specifically asked
- If asked about something not covered in the documents, politely say you don't have that info and suggest they reach out directly via email or LinkedIn
- Keep responses concise but informative
- Never make up information not provided in the documents
- Do NOT use markdown formatting (no **bold**, *italics*, or # headings) - write in plain text only
- Do not give away personal information like phone number or home address`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const genai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY || '',
    });

    // Create the full prompt with system prompt and conversation history
    const conversationHistory = messages.map((msg: any) =>
      `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
    ).join('\n');

    const fullPrompt = `${systemPrompt}\n\nConversation:\n${conversationHistory}\n\nRespond directly without including "Assistant:" or any role prefix in your response.`;

    const result = await genai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: fullPrompt,
    });

    const reply = result.text || 'Sorry, I could not generate a response.';

    return new Response(JSON.stringify({ content: reply }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Gemini API error:', error);
    return new Response(JSON.stringify({ content: 'Sorry, something went wrong. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
