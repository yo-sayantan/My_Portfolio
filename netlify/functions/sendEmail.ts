
import nodemailer from 'nodemailer';

interface EmailPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
  type?: 'contact' | 'transcript';
  transcript?: any[]; // Array of message objects
}

// Environment variables
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const OWNER_EMAIL = "sayantanbiswas.mycareer@gmail.com"; // Your email

export default async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }

  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const body = await req.json() as EmailPayload;
    const userAgent = req.headers.get('user-agent') || 'Unknown';
    // Netlify headers for IP
    const ip = req.headers.get('x-nf-client-connection-ip') || req.headers.get('client-ip') || 'Unknown'; 
    
    if (!body.email || !body.message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const isTranscript = body.type === 'transcript';

    // --- DEMO MODE / FALLBACK ---
    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
      console.log(`⚠️  GMAIL CREDENTIALS MISSING - RUNNING IN DEMO MODE (${isTranscript ? 'TRANSCRIPT' : 'CONTACT'})`);
      return new Response(JSON.stringify({ success: true, mode: 'demo' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // --- CONFIGURATION ---
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    let mailOptions;

    if (isTranscript) {
      // CASE 1: SEND TRANSCRIPT TO USER (Chat UI Style)
      const transcriptList = body.transcript || [];
      
      // Generate Chat Bubbles HTML
      const chatBubbles = transcriptList.map((msg: any) => {
        const isUser = msg.sender === 'user';
        const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        return `
          <div style="margin-bottom: 20px; display: flex; justify-content: ${isUser ? 'flex-end' : 'flex-start'}; align-items: flex-end;">
            ${!isUser ? `
              <div style="width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, #0ea5e9, #2563eb); display: flex; align-items: center; justify-content: center; margin-right: 8px; flex-shrink: 0; color: white; font-weight: bold; font-size: 12px;">AI</div>
            ` : ''}
            
            <div style="max-width: 75%;">
              <div style="
                padding: 12px 16px; 
                border-radius: 18px; 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                font-size: 14px; 
                line-height: 1.5;
                box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                ${isUser 
                  ? 'background-color: #0ea5e9; color: white; border-bottom-right-radius: 4px;' 
                  : 'background-color: #f8fafc; color: #334155; border: 1px solid #e2e8f0; border-bottom-left-radius: 4px;'
                }
              ">
                ${msg.text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
              </div>
              <div style="font-size: 10px; color: #94a3b8; margin-top: 4px; ${isUser ? 'text-align: right;' : 'text-align: left;'}">
                ${time}
              </div>
            </div>

            ${isUser ? `
              <div style="width: 30px; height: 30px; border-radius: 50%; background-color: #cbd5e1; display: flex; align-items: center; justify-content: center; margin-left: 8px; flex-shrink: 0; color: #64748b; font-size: 12px;">You</div>
            ` : ''}
          </div>
        `;
      }).join('');

      const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Chat Transcript</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', sans-serif;">
        <div style="max-width: 600px; margin: 40px auto; background-color: white; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0f172a, #1e293b); padding: 30px; text-align: center;">
            <h2 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">Chat Transcript</h2>
            <p style="color: #94a3b8; margin: 8px 0 0; font-size: 14px;">A copy of your conversation with Sayantan's Portfolio Assistant</p>
          </div>

          <!-- Chat Container -->
          <div style="padding: 30px; background-color: #ffffff;">
            ${chatBubbles}
          </div>

          <!-- Footer -->
          <div style="padding: 20px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
            <p style="margin: 0; color: #64748b; font-size: 12px;">
              &copy; ${new Date().getFullYear()} Sayantan Biswas. All rights reserved.
            </p>
            <p style="margin: 8px 0 0; color: #94a3b8; font-size: 11px;">
              Generated automatically by AI Portfolio Assistant.
            </p>
          </div>

        </div>
      </body>
      </html>
      `;

      mailOptions = {
        from: `"Sayantan's AI Assistant" <${GMAIL_USER}>`,
        to: body.email, // Send TO the user
        replyTo: OWNER_EMAIL, // If they reply, it goes to you
        subject: `Your Chat Transcript with Sayantan's AI`,
        text: body.message,
        html: htmlContent,
      };

    } else {
      // CASE 2: SEND CONTACT FORM TO OWNER
      const subjectLine = body.subject 
        ? `Portfolio: ${body.subject}` 
        : `Portfolio Inquiry: ${body.name}`;

      const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>New Contact Message</title></head>
      <body style="font-family: sans-serif; line-height: 1.6; color: #333; padding: 20px;">
        <div style="max-width: 650px; margin: 0 auto;">
          <div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 15px; margin-bottom: 25px;">
            <h2 style="color: #0f172a; margin: 0;">New Portfolio Contact</h2>
          </div>
          <p><strong>From:</strong> ${body.name} &lt;${body.email}&gt;</p>
          <p><strong>Subject:</strong> ${body.subject || 'N/A'}</p>
          <div style="background-color: #f8fafc; border-left: 3px solid #0ea5e9; padding: 16px; margin: 20px 0; white-space: pre-wrap;">${body.message}</div>
          <div style="font-size: 12px; color: #64748b; border-top: 1px solid #eee; padding-top: 10px;">
            <strong>IP:</strong> ${ip} | <strong>UA:</strong> ${userAgent}
          </div>
        </div>
      </body>
      </html>
      `;

      mailOptions = {
        from: `"Portfolio Notification" <${GMAIL_USER}>`,
        to: OWNER_EMAIL, // Send TO you
        replyTo: body.email,
        subject: subjectLine,
        text: `Name: ${body.name}\nEmail: ${body.email}\nSubject: ${body.subject || 'N/A'}\nMessage:\n${body.message}`,
        html: htmlContent,
      };
    }

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);

    return new Response(JSON.stringify({ success: true, messageId: info.messageId }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error: any) {
    console.error("SMTP Error:", error);
    return new Response(JSON.stringify({ error: "Failed to send email", details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
