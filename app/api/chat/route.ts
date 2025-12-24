// app/api/chat/route.ts
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
- Master's student at Hofstra University (BS in Computer Science & Cybersecurity - December 2025, MS in Computer Science - May 2026)
- Undergraduate GPA: 3.61 | Graduate GPA: 3.57
- Graduating Cum Laude
- CS Tutor for 5 courses and Student Technician
- Founder & President of Hofstra C.O.D.E
- ACM Chapter Chair at Hofstra

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
- Winner: Pros vs Joes CTF (Delaware 2025)
- Winner: Amazon CTF (2025)
- Finalist: Amazon CTF (2023)
- Winner: Pensar AI Hackathon
- 7x Dean's List recipient

**Contact**
- Email: rahamriaz@gmail.com
- LinkedIn: linkedin.com/in/rahambutt
- GitHub: github.com/raham24
- Phone: +1 (929) 386-6493

## Supporting Documents
${documents || 'No additional documents loaded.'}

## Instructions
- Be conversational and friendly
- Give specific, detailed answers when you have the information
- Reference the documents (resumes, thesis proposal, transcripts) when relevant
- If asked about coursework, refer to the transcript documents
- If asked about projects or experience, refer to the resume documents
- If asked about thesis/research, refer to the thesis proposal document
- Do not mention CGPA unless specifically asked
- If asked about something not covered, politely say you don't have that info and suggest they reach out directly via email or LinkedIn
- Keep responses concise but informative
- Never make up information not provided in the documents`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      stream: false,
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Groq API error:', error);
    return new Response(JSON.stringify({ content: 'Sorry, something went wrong. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

  return new Response(JSON.stringify({ content: reply }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
