const fs = require('fs');
const path = require('path');
const hbs = require('handlebars');
const puppeteer = require('puppeteer');

const crearPDF = async (datosFactura) => {
    
    const filePath = path.join(__dirname, 'bill.hbs');

    if (!fs.existsSync(filePath)) {
        throw new Error(`No se encontró la plantilla en: ${filePath}`);
    }

    const htmlTemplate = fs.readFileSync(filePath, 'utf-8');
    const template = hbs.compile(htmlTemplate);
    const htmlFinal = template(datosFactura);

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setContent(htmlFinal, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true
        });

        return pdfBuffer;

    } catch (error) {
        console.error("Error generando el PDF:", error);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};
module.exports = { crearPDF };