require('dotenv').config();

async function sendEmailNotification(name, email, message, pdfBuffer) {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
        throw new Error('No existe la API KEY de Resend en el archivo .env');
    }
    const emailPayload = {
        from: 'Teobu <onboarding@resend.dev>', 
        to: ['diegocarrion972@gmail.com'], 
        subject: `Nuevo Reporte Solicitado por ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif;">
                <h2>Reporte de Productos</h2>
                <p><strong>Solicitado por:</strong> ${name}</p>
                <p><strong>Email contacto:</strong> ${email}</p>
                <p><strong>Mensaje adjunto:</strong> ${message}</p>
                <hr>
                <p>Se adjunta el PDF generado automáticamente.</p>
            </div>
        `,
        attachments: [
            {
                filename: 'Reporte.pdf', 
                content: pdfBuffer.toString('base64'),      
                contentType: 'application/pdf' 
            }
        ]
    };
    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailPayload)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error Resend: ${errorText}`);
    }
    return true;
}

module.exports = { sendEmailNotification };