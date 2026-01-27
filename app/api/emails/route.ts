import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import type { CartItem, EmailRequest } from "../../../.utils/types";

export const runtime = "nodejs";


function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function buildTextEmail(data: EmailRequest) {
    const lines = [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.phone ? `Phone: ${data.phone}` : null,
        data.postalcode ? `Postal Code: ${data.postalcode}` : null,
        data.province ? `Province: ${data.province}` : null,
        data.address ? `Address: ${data.address}` : null,
        data.city ? `City: ${data.city}` : null,
        data.message ? `Message: ${data.message}` : null,
    ].filter(Boolean);

    return lines.join("\n");
}

/**
 * Generate HTML for a single cart item with its configuration
 */
function generateCartItemHtml(item: CartItem, _index: number) {
    const config = item.configuration;

    let configDetails = "";

    if (config) {
        const details: string[] = [];

        if (config.size) {
            details.push(
                `<tr><td style="padding: 4px 8px; color: #666;">Size:</td><td style="padding: 4px 8px;">${config.size.label || config.size.key}</td></tr>`
            );
        }

        if (config.woodType) {
            details.push(
                `<tr><td style="padding: 4px 8px; color: #666;">Wood Type:</td><td style="padding: 4px 8px;">${config.woodType.name}</td></tr>`
            );
        }

        if (config.stove) {
            details.push(
                `<tr><td style="padding: 4px 8px; color: #666;">Heater:</td><td style="padding: 4px 8px;">${config.stove.name}${config.stove.wifi ? " (WiFi)" : ""}</td></tr>`
            );
        }

        if (config.installation) {
            details.push(
                `<tr><td style="padding: 4px 8px; color: #666;">Installation:</td><td style="padding: 4px 8px;">${config.installation.name}</td></tr>`
            );
        }

        if (config.delivery) {
            const deliveryText = config.delivery.included
                ? "Included"
                : `$${config.delivery.cost.toLocaleString()}`;
            details.push(
                `<tr><td style="padding: 4px 8px; color: #666;">Delivery:</td><td style="padding: 4px 8px;">${deliveryText}</td></tr>`
            );
        }

        if (config.heaterOptions && config.heaterOptions.length > 0) {
            const heaterOptionsList = config.heaterOptions
                .map((option) => `${option.name} (+$${option.price.toLocaleString()})`)
                .join(", ");
            details.push(
                `<tr><td style="padding: 4px 8px; color: #666;">Heater Options:</td><td style="padding: 4px 8px;">${heaterOptionsList}</td></tr>`
            );
        }

        if (config.upgrades && config.upgrades.length > 0) {
            const upgradesList = config.upgrades
                .map((u) => `${u.name} (+$${u.price.toLocaleString()})`)
                .join(", ");
            details.push(
                `<tr><td style="padding: 4px 8px; color: #666;">Add-ons:</td><td style="padding: 4px 8px;">${upgradesList}</td></tr>`
            );
        }

        if (details.length > 0) {
            configDetails = `<table style="width: 100%; margin-top: 10px;">${details.join("")}</table>`;
        }
    } else if (item.selectedOptions) {
        // Legacy format fallback
        const details: string[] = [];
        Object.entries(item.selectedOptions).forEach(([key, option]) => {
            if (option) {
                details.push(
                    `<tr><td style="padding: 4px 8px; color: #666; text-transform: capitalize;">${key}:</td><td style="padding: 4px 8px;">${option.type}${option.price > 0 ? ` (+$${option.price.toLocaleString()})` : ""}</td></tr>`
                );
            }
        });
        if (details.length > 0) {
            configDetails = `<table style="width: 100%; margin-top: 10px;">${details.join("")}</table>`;
        }
    }

    return `
    <div style="background-color: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
      <div style="display: flex; align-items: flex-start; gap: 15px;">
        ${item.image ? `<img src="${item.image}" alt="${escapeHtml(item.name)}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;">` : ""}
        <div style="flex: 1;">
          <h3 style="margin: 0 0 5px 0; color: #333; font-size: 18px;">${escapeHtml(item.name)}</h3>
          <p style="margin: 0; color: #666;">Quantity: ${item.qty}</p>
          <p style="margin: 5px 0 0 0; color: #4E7302; font-weight: bold; font-size: 18px;">$${(item.price * item.qty).toLocaleString()}</p>
        </div>
      </div>
      ${configDetails}
    </div>
  `;
}

/**
 * Generate cart quote email HTML
 */
function generateCartQuoteHtml(data: EmailRequest) {
    const {
        name,
        email,
        phone,
        postalcode,
        city,
        province,
        address,
        message,
        cartItems,
        cartSummary,
    } = data;

    const itemsHtml = (cartItems ?? [])
        .map((item, index) => generateCartItemHtml(item, index))
        .join("");
    const summary = cartSummary ?? {
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0,
    };

    return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 700px; margin: 0 auto; background-color: #f5f5f5; padding: 20px;">
      <!-- Header -->
      <div style="background-color: #4E7302; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 28px; font-weight: 600;">New Quote Request</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">High-Value Lead from Toronto Sauna Co.</p>
      </div>
      
      <!-- Customer Info -->
      <div style="background-color: #fff; padding: 25px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0;">
        <h2 style="color: #4E7302; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #4E7302; padding-bottom: 10px;">Customer Information</h2>
        <table style="width: 100%;">
          <tr><td style="padding: 8px 0; color: #666; width: 120px;"><strong>Name:</strong></td><td style="padding: 8px 0;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #4E7302;">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td><td style="padding: 8px 0;"><a href="tel:${escapeHtml(phone ?? "")}" style="color: #4E7302;">${escapeHtml(phone ?? "")}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #666;"><strong>Province:</strong></td><td style="padding: 8px 0;">${escapeHtml(province ?? "")}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;"><strong>Address:</strong></td><td style="padding: 8px 0;">${escapeHtml(address ?? "")}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;"><strong>City:</strong></td><td style="padding: 8px 0;">${escapeHtml(city ?? "")}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;"><strong>Postal Code:</strong></td><td style="padding: 8px 0;">${escapeHtml(postalcode ?? "")}</td></tr>
        </table>
        ${message
            ? `
          <div style="margin-top: 15px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
            <strong style="color: #666;">Additional Notes:</strong>
            <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
        `
            : ""
        }
      </div>
      
      <!-- Cart Items -->
      <div style="background-color: #f9f9f9; padding: 25px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0;">
        <h2 style="color: #4E7302; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #4E7302; padding-bottom: 10px;">Requested Items (${(cartItems ?? []).length})</h2>
        ${itemsHtml}
      </div>
      
      <!-- Summary -->
      <div style="background-color: #fff; padding: 25px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0; border-radius: 0 0 8px 8px;">
        <h2 style="color: #4E7302; margin: 0 0 15px 0; font-size: 20px; border-bottom: 2px solid #4E7302; padding-bottom: 10px;">Quote Summary</h2>
        <table style="width: 100%; max-width: 300px; margin-left: auto;">
          <tr><td style="padding: 8px 0; color: #666;">Subtotal:</td><td style="padding: 8px 0; text-align: right;">$${summary.subtotal.toLocaleString()}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Est. Shipping:</td><td style="padding: 8px 0; text-align: right;">$${summary.shipping.toLocaleString()}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Tax (13% HST):</td><td style="padding: 8px 0; text-align: right;">$${summary.tax.toLocaleString()}</td></tr>
          <tr style="border-top: 2px solid #4E7302;"><td style="padding: 12px 0; font-weight: bold; font-size: 18px;">Total:</td><td style="padding: 12px 0; text-align: right; font-weight: bold; font-size: 18px; color: #4E7302;">$${summary.total.toLocaleString()}</td></tr>
        </table>
      </div>
      
      <!-- Footer -->
      <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
        <p style="margin: 0;">This quote request was submitted via thetorontosaunaco.com</p>
        <p style="margin: 5px 0 0 0;">Please respond promptly to this high-value lead.</p>
      </div>
    </div>
  `;
}

export async function POST(req: Request) {
    try {
        const data = (await req.json()) as EmailRequest;
        const {
            name,
            email,
            phone,
            postalcode,
            subject,
            message,
            isConsultation,
            isCartQuote,
            cartItems,
            cartSummary,
            preferredDate,
            preferredTime,
            saunaType,
            budgetRange,
            contactMethod,
            province,
            address,
            city,
        } = data;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { message: "Missing required fields." },
                { status: 400 }
            );
        }

        if (!process.env.MAIL_USER || !process.env.MAIL_PWD) {
            return NextResponse.json(
                { message: "Email service is not configured." },
                { status: 500 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PWD,
            },
        });
        await transporter.verify();

        let emailContent;
        let emailSubject = subject;

        // Handle cart quote requests
        if (isCartQuote && cartItems && cartItems.length > 0) {
            if (!cartSummary) {
                return NextResponse.json(
                    { message: "Cart summary is required for quote requests." },
                    { status: 400 }
                );
            }
            emailContent = generateCartQuoteHtml(data);
            emailSubject = `🔥 HIGH-VALUE LEAD: Quote Request - $${cartSummary.total.toLocaleString()} - ${name}`;
        } else if (isConsultation) {
            emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">New Consultation Request</h2>
          
          <div style="background-color: #f9f9f9; padding: 15px; margin: 15px 0; border-radius: 5px;">
            <h3 style="color: #444; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
            
            <p><strong>Preferred Contact Method:</strong> ${escapeHtml(contactMethod ?? "")}</p>
          </div>

          <div style="background-color: #f9f9f9; padding: 15px; margin: 15px 0; border-radius: 5px;">
            <h3 style="color: #444; margin-top: 0;">Consultation Details</h3>
            <p><strong>Preferred Date:</strong> ${preferredDate ? escapeHtml(new Date(preferredDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })) : ""}</p>
            <p><strong>Preferred Time:</strong> ${escapeHtml(preferredTime ?? "")}</p>
            <p><strong>Sauna Type Interest:</strong> ${escapeHtml(saunaType ?? "")}</p>
            <p><strong>Budget Range:</strong> ${escapeHtml(budgetRange ?? "")}</p>
          </div>

          <div style="background-color: #f9f9f9; padding: 15px; margin: 15px 0; border-radius: 5px;">
            <h3 style="color: #444; margin-top: 0;">Additional Information</h3>
            <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
        </div>
      `;
        } else {
            emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">New General Inquiry</h2>
          
          <div style="background-color: #f9f9f9; padding: 15px; margin: 15px 0; border-radius: 5px;">
            <h3 style="color: #444; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
            ${postalcode ? `<p><strong>Postal Code:</strong> ${escapeHtml(postalcode)}</p>` : ""}
            ${province ? `<p><strong>Province:</strong> ${escapeHtml(province)}</p>` : ""}
            ${address ? `<p><strong>Address:</strong> ${escapeHtml(address)}</p>` : ""}
            ${city ? `<p><strong>City:</strong> ${escapeHtml(city)}</p>` : ""}
          </div>

          <div style="background-color: #f9f9f9; padding: 15px; margin: 15px 0; border-radius: 5px;">
            <h3 style="color: #444; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
        </div>
      `;
        }

        const ownerEmail =
            process.env.MAIL_TO ?? "damion.wilson@gmail.com";
        const mailOptions = {
            from: `Pacific Tide <${process.env.MAIL_USER}>`,
            to: ownerEmail,
            // to: "damion.wilson@gmail.com",
            subject: emailSubject,
            html: emailContent,
            text: buildTextEmail(data),
            replyTo: email,
        };

        const sendResult = await transporter.sendMail(mailOptions);

        return NextResponse.json(
            {
                message: "Email sent successfully!",
                messageId: sendResult.messageId,
                accepted: sendResult.accepted,
                rejected: sendResult.rejected,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            {
                message:
                    error instanceof Error ? error.message : "Error sending email",
            },
            { status: 500 }
        );
    }
}
