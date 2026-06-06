
import nodemailer from 'nodemailer';
import { OWNER } from '../../ownerConfig';

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
const OWNER_EMAIL = OWNER.email;

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
        <div style="max-width: 1000px; margin: 40px auto; background-color: white; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #0f172a, #1e293b); padding: 20px 30px; text-align: center;">
            <h2 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">Chat Transcript</h2>
            <p style="color: #94a3b8; margin: 8px 0 0; font-size: 14px;">A copy of your conversation with ${OWNER.name}'s Portfolio Assistant</p>
          </div>

          <!-- Chat Container -->
          <div style="padding: 30px; background-color: #ffffff;">
            ${chatBubbles}
          </div>

          <!-- Footer -->
          <div style="padding: 20px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
            <p style="margin: 0; color: #64748b; font-size: 12px;">
              &copy; ${new Date().getFullYear()} ${OWNER.name}. All rights reserved.
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
        from: `"${OWNER.name}'s AI Assistant" <${GMAIL_USER}>`,
        to: body.email, // Send TO the user
        replyTo: OWNER_EMAIL, // If they reply, it goes to you
        subject: `Your Chat Transcript with ${OWNER.name}'s AI`,
        text: body.message,
        html: htmlContent,
      };

    } else {
      // CASE 2: SEND CONTACT FORM TO OWNER — Premium Notification Email
      const subjectLine = body.subject 
        ? `⚡ New Inquiry · ${body.subject}` 
        : `⚡ New Inquiry from ${body.name}`;

      const sentAt = new Date().toLocaleString('en-US', { 
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', 
        hour: '2-digit', minute: '2-digit', timeZoneName: 'short' 
      });

      const senderInitial = body.name.trim().charAt(0).toUpperCase();

      const htmlContent = `
      <!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <title>New Portfolio Inquiry</title>
        <!--[if mso]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
          table { border-spacing: 0; border-collapse: collapse; }
          img { border: 0; line-height: 100%; outline: none; text-decoration: none; }
        </style>
      </head>
      <body style="margin: 0; padding: 0; width: 100%; background-color: #f0f2f5; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        
        <!-- Outer Wrapper -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f2f5;">
          <tr>
            <td align="center" style="padding: 40px 16px;">
              
              <!-- Main Container -->
              <table role="presentation" width="1000" cellpadding="0" cellspacing="0" style="max-width: 1000px; width: 100%; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 60px rgba(0,0,0,0.12), 0 4px 20px rgba(0,0,0,0.06);">
                
                <!-- ========== HEADER with Abstract Elements ========== -->
                <tr>
                  <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0f172a 100%); padding: 0; position: relative;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 24px 40px; position: relative;">
                          
                          <!-- Abstract Decorative Orbs (inline SVG circles for email compatibility) -->
                          <div style="position: absolute; top: -30px; right: -20px; width: 180px; height: 180px; border-radius: 50%; background: radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%); pointer-events: none;"></div>
                          <div style="position: absolute; bottom: -40px; left: 30px; width: 120px; height: 120px; border-radius: 50%; background: radial-gradient(circle, rgba(14,165,233,0.25) 0%, transparent 70%); pointer-events: none;"></div>
                          <div style="position: absolute; top: 20px; left: 50%; width: 80px; height: 80px; border-radius: 50%; background: radial-gradient(circle, rgba(168,85,247,0.20) 0%, transparent 70%); pointer-events: none;"></div>
                          
                          <!-- Accent Line -->
                          <div style="width: 50px; height: 4px; border-radius: 4px; background: linear-gradient(90deg, #6366f1, #0ea5e9, #a855f7); margin-bottom: 12px;"></div>
                          
                          <!-- Header Text -->
                          <h1 style="margin: 0 0 6px; font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; line-height: 1.2;">
                            New Inquiry Received
                          </h1>
                          <p style="margin: 0; font-size: 14px; color: #94a3b8; font-weight: 500; letter-spacing: 0.2px;">
                            Someone reached out through your portfolio
                          </p>
                          
                          <!-- Timestamp Badge -->
                          <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top: 12px;">
                            <tr>
                              <td style="background-color: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.10); border-radius: 10px; padding: 8px 14px;">
                                <span style="font-size: 11px; color: #cbd5e1; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;">
                                  &#128337;&nbsp; ${sentAt}
                                </span>
                              </td>
                            </tr>
                          </table>
                          
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- ========== BODY ========== -->
                <tr>
                  <td style="background-color: #ffffff; padding: 0;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      
                      <!-- Sender Profile Card -->
                      <tr>
                        <td style="padding: 32px 40px 0;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #f8fafc, #f1f5f9); border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
                            <tr>
                              <td style="padding: 24px;">
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <!-- Avatar -->
                                    <td style="width: 56px; vertical-align: top;">
                                      <div style="width: 52px; height: 52px; border-radius: 16px; background: linear-gradient(135deg, #6366f1, #8b5cf6); display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 22px; font-weight: 800; line-height: 52px; text-align: center;">
                                        ${senderInitial}
                                      </div>
                                    </td>
                                    <!-- Info -->
                                    <td style="padding-left: 16px; vertical-align: top;">
                                      <p style="margin: 0 0 2px; font-size: 18px; font-weight: 700; color: #0f172a; line-height: 1.3;">
                                        ${body.name}
                                      </p>
                                      <p style="margin: 0; font-size: 13px; color: #6366f1; font-weight: 600;">
                                        ${body.email}
                                      </p>
                                    </td>
                                    <!-- Priority Badge -->
                                    <td style="vertical-align: top; text-align: right;">
                                      <span style="display: inline-block; background: linear-gradient(135deg, #ecfdf5, #d1fae5); color: #059669; font-size: 10px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase; padding: 6px 12px; border-radius: 8px; border: 1px solid #a7f3d0;">
                                        ● New Lead
                                      </span>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            ${body.subject ? `
                            <tr>
                              <td style="padding: 0 24px 20px;">
                                <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 16px;">
                                  <span style="font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">Subject</span>
                                  <p style="margin: 4px 0 0; font-size: 15px; font-weight: 600; color: #1e293b;">${body.subject}</p>
                                </div>
                              </td>
                            </tr>
                            ` : ''}
                          </table>
                        </td>
                      </tr>

                      <!-- Message Section -->
                      <tr>
                        <td style="padding: 28px 40px 0;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td>
                                <p style="margin: 0 0 12px; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px;">
                                  &#9993;&nbsp; Message
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td style="background-color: #fafbfc; border: 1px solid #e8ecf1; border-radius: 14px; padding: 24px 28px;">
                                <p style="margin: 0; font-size: 15px; line-height: 1.75; color: #334155; font-weight: 450; white-space: pre-wrap; word-wrap: break-word;">
${body.message}
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- CTA Button -->
                      <tr>
                        <td style="padding: 32px 40px 0;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td align="center">
                                <!--[if mso]>
                                <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="mailto:${body.email}?subject=Re: ${encodeURIComponent(body.subject || 'Your Portfolio Inquiry')}&body=${encodeURIComponent('Hi ' + body.name + ',\\n\\nThank you for reaching out through my portfolio.\\n\\n')}" style="height:52px;v-text-anchor:middle;width:280px;" arcsize="50%" fillcolor="#0f172a">
                                  <w:anchorlock/>
                                  <center style="color:#ffffff;font-family:sans-serif;font-size:15px;font-weight:bold;">Reply to ${body.name}</center>
                                </v:roundrect>
                                <![endif]-->
                                <!--[if !mso]><!-->
                                <a href="mailto:${body.email}?subject=Re: ${encodeURIComponent(body.subject || 'Your Portfolio Inquiry')}&body=${encodeURIComponent('Hi ' + body.name + ',\n\nThank you for reaching out through my portfolio.\n\n')}"
                                   style="display: inline-block; background: linear-gradient(135deg, #0f172a, #1e293b); color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; padding: 16px 40px; border-radius: 14px; letter-spacing: 0.3px; box-shadow: 0 4px 14px rgba(15,23,42,0.25), 0 0 0 1px rgba(255,255,255,0.05) inset; transition: all 0.2s;">
                                  &#9993;&nbsp;&nbsp;Reply to ${body.name} →
                                </a>
                                <!--<![endif]-->
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- Divider -->
                      <tr>
                        <td style="padding: 32px 40px 0;">
                          <div style="height: 1px; background: linear-gradient(90deg, transparent, #e2e8f0, transparent);"></div>
                        </td>
                      </tr>

                      <!-- Technical Metadata (Discreet) -->
                      <tr>
                        <td style="padding: 20px 40px 0;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 10px; border: 1px solid #f1f5f9;">
                            <tr>
                              <td style="padding: 14px 18px;">
                                <p style="margin: 0 0 2px; font-size: 9px; font-weight: 700; color: #cbd5e1; text-transform: uppercase; letter-spacing: 1.5px;">Request Metadata</p>
                                <p style="margin: 0; font-size: 11px; color: #94a3b8; line-height: 1.6; word-break: break-all;">
                                  <span style="color: #64748b; font-weight: 600;">IP</span>&nbsp; ${ip}&nbsp;&nbsp;·&nbsp;&nbsp;<span style="color: #64748b; font-weight: 600;">UA</span>&nbsp; ${userAgent}
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>

                <!-- ========== FOOTER ========== -->
                <tr>
                  <td style="background-color: #ffffff; padding: 32px 40px 40px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      
                      <!-- Gradient Separator -->
                      <tr>
                        <td style="padding-bottom: 24px;">
                          <div style="height: 3px; border-radius: 3px; background: linear-gradient(90deg, #6366f1, #0ea5e9, #a855f7, #6366f1);"></div>
                        </td>
                      </tr>
                      
                      <!-- Footer Content -->
                      <tr>
                        <td align="center">
                          <p style="margin: 0 0 6px; font-size: 15px; font-weight: 700; color: #0f172a; letter-spacing: -0.3px;">${OWNER.name}</p>
                          <p style="margin: 0 0 16px; font-size: 12px; color: #94a3b8; font-weight: 500;">${OWNER.role} · ${OWNER.company}</p>
                          
                          <!-- Social Links -->
                          <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                            <tr>
                              <td style="padding: 0 6px;">
                                <a href="${OWNER.portfolio}" style="display: inline-block; padding: 8px 14px; background-color: #f1f5f9; border-radius: 8px; text-decoration: none; font-size: 11px; font-weight: 600; color: #475569; border: 1px solid #e2e8f0;">&#127760; Portfolio</a>
                              </td>
                              <td style="padding: 0 6px;">
                                <a href="${OWNER.linkedin}" style="display: inline-block; padding: 8px 14px; background-color: #eff6ff; border-radius: 8px; text-decoration: none; font-size: 11px; font-weight: 600; color: #2563eb; border: 1px solid #dbeafe;">&#128279; LinkedIn</a>
                              </td>
                              <td style="padding: 0 6px;">
                                <a href="${OWNER.github}" style="display: inline-block; padding: 8px 14px; background-color: #f8fafc; border-radius: 8px; text-decoration: none; font-size: 11px; font-weight: 600; color: #334155; border: 1px solid #e2e8f0;">&#128187; GitHub</a>
                              </td>
                            </tr>
                          </table>
                          
                          <p style="margin: 20px 0 0; font-size: 10px; color: #cbd5e1; font-weight: 500;">
                            Automated notification from your portfolio at ${OWNER.portfolio.replace('https://', '')}
                          </p>
                          <p style="margin: 4px 0 0; font-size: 10px; color: #e2e8f0;">
                            &copy; ${new Date().getFullYear()} ${OWNER.name}. Crafted with precision.
                          </p>
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>

              </table>
              <!-- /Main Container -->

            </td>
          </tr>
        </table>
        <!-- /Outer Wrapper -->

      </body>
      </html>
      `;

      mailOptions = {
        from: `"${OWNER.name} · Portfolio" <${GMAIL_USER}>`,
        to: OWNER_EMAIL, // Send TO you
        replyTo: body.email,
        subject: subjectLine,
        text: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n⚡ NEW PORTFOLIO INQUIRY\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nFrom:    ${body.name}\nEmail:   ${body.email}\nSubject: ${body.subject || '—'}\nTime:    ${sentAt}\n\n── Message ─────────────────────────\n\n${body.message}\n\n────────────────────────────────────\nIP: ${ip}\nUA: ${userAgent}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
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
