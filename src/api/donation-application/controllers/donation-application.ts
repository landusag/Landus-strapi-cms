/**
 * donation-application controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::donation-application.donation-application',
    ({ strapi }) => ({
        async create(ctx) {
            // Create entry
            const response = await super.create(ctx);
            const id = response.data.id;
        
            // Re-fetch the full entry with media populated (TS FIX: entry typed as ANY)
            const entry: any = await strapi.entityService.findOne(
              'api::donation-application.donation-application',
              id,
              {
                populate: ["supportingDocuments", "additionalSupportingDocuments"],
              }
            );
            try {
              // Extract fields
                const groupOrOrganizationApplying = entry.groupOrOrganizationApplying;
                const contactPerson = entry.contactPerson;
                const location = entry.location;
                const addressLine1 = entry.addressLine1;
                const addressLine2 = entry.addressLine2;
                const city = entry.city;
                const state = entry.state;
                const zipCode = entry.zipCode;
                const email = entry.email;
                const phoneNumber = entry.phoneNumber;
                const federalTaxIdNumber = entry.federalTaxIdNumber;
                const donationAmountRequested = entry.donationAmountRequested;
                const dateOfRequest = entry.dateOfRequest;
                const purposeOfDonation = entry.purposeOfDonation;
                const additionalInformation = entry.additionalInformation;
        
                // Media extraction
                // Build absolute URLs for attachments (works locally and in production)
                const baseUrl =
                  (strapi.config.get('server.url') as string) ||
                  process.env.STRAPI_URL ||
                  process.env.PUBLIC_URL ||
                  'http://localhost:1337';
        
                const getFileUrl = (file: any) => {
                  if (!file?.url) return null;
        
                  if (file.url.startsWith('http')) {
                    return file.url; // Strapi Cloud absolute URL
                  }
        
                  return `${baseUrl}${file.url}`; // Local/uploads URL
                };
        
                const suppDocUrl = getFileUrl(entry.supportingDocuments);
                const addSuppDocUrl = getFileUrl(entry.additionalSupportingDocuments);
        
                const adminEmails = (process.env.DONATION_ADMIN_EMAILS || '')
                  .split(',')
                  .map((e) => e.trim())
                  .filter(Boolean);
        
                // Cloud Mailer requires a plain email address in `from`
                const rawFrom = process.env.EMAIL_FROM || '';
                const fromAddressMatch = rawFrom.match(/<([^>]+)>/);
                const fromAddress = fromAddressMatch ? fromAddressMatch[1] : rawFrom;
                // Strapi v4 email service
        if (adminEmails.length) {
          // Build admin payload once for clearer logging
          const adminBasePayload = {
            from: fromAddress,
            subject: "New Donation Received",
            // Provide a plain-text body per schema
            text: `New Donation \nContact Person: ${contactPerson} \nEmail: ${email}\nPhone: ${phoneNumber}\nSupporting Documents: ${suppDocUrl ? "attached" : "missing"}\nAdditional Supporting Documents: ${addSuppDocUrl ? "attached" : "missing"}`,
            html: `
<div style="margin:0;padding:0;background:#F5F5F5;width:100%;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">

        <!-- MAIN CARD -->
        <table width="600" cellpadding="0" cellspacing="0" style="
          background:#ffffff;
          border-radius:0 0 12px 12px;
          padding:40px;
          box-shadow:0 8px 20px rgba(0,0,0,0.12);
          border-top:4px solid #62A73A;
        ">

          <!-- Title -->
          <tr>
            <td align="center" style="padding-bottom:30px;">
              
              <h1 style="margin:0;color:#333333;font-size:26px;font-weight:700;">
                New Donation
              </h1>

              <p style="color:#6A6A6A;font-size:15px;margin-top:8px;">
                A new donation has been received.
              </p>
            </td>
          </tr>

          <!-- Donor Info -->
          <tr>
            <td style="padding:25px;background:#FAFAFA;border:1px solid #E5E5E5;border-radius:10px;">
                <h3 style="
                    margin:0 0 12px;
                    color:#00563F;
                    font-size:18px;
                    border-bottom:2px solid #62A73A;
                    padding-bottom:6px;
                ">
                    Donor Details
                </h3>

                <p style="margin:6px 0;color:#333;"><strong>Group / Organization Applying:</strong> ${groupOrOrganizationApplying}</p>
                <p style="margin:6px 0;color:#333;"><strong>Contact Person:</strong> ${contactPerson}</p>
                <p style="margin:6px 0;color:#333;"><strong>Location:</strong> ${location}</p>
                <p style="margin:6px 0;color:#333;"><strong>Address Line 1:</strong> ${addressLine1}</p>
                <p style="margin:6px 0;color:#333;"><strong>Address Line 2:</strong> ${addressLine2}</p>
                <p style="margin:6px 0;color:#333;"><strong>City:</strong> ${city}</p>
                <p style="margin:6px 0;color:#333;"><strong>State:</strong> ${state}</p>
                <p style="margin:6px 0;color:#333;"><strong>Zip Code:</strong> ${zipCode}</p>
                <p style="margin:6px 0;color:#333;"><strong>Email:</strong> ${email}</p>
                <p style="margin:6px 0;color:#333;"><strong>Phone:</strong> ${phoneNumber}</p>
                <p style="margin:6px 0;color:#333;"><strong>Federal Tax Id Number:</strong> ${federalTaxIdNumber}</p>
                <p style="margin:6px 0;color:#333;"><strong>Donation Amount Requested:</strong> ${donationAmountRequested}</p>
                <p style="margin:6px 0;color:#333;"><strong>Date Of Request:</strong> ${dateOfRequest}</p>
                <p style="margin:6px 0;color:#333;"><strong>Purpose Of Donation:</strong> ${purposeOfDonation}</p>
                <p style="margin:6px 0;color:#333;"><strong>Additional Information:</strong> ${additionalInformation}</p>

            </td>
          </tr>

          <tr><td style="height:20px;"></td></tr>

          <!-- Documents -->
          <tr>
            <td style="padding:25px;background:#FAFAFA;border:1px solid #E5E5E5;border-radius:10px;">
              <h3 style="
                margin:0 0 12px;
                color:#00563F;
                font-size:18px;
                border-bottom:2px solid #62A73A;
                padding-bottom:6px;
              ">
                Uploaded Documents
              </h3>

              <p style="margin:6px 0;color:#333;">
                <strong>Supporting Documents:</strong>
                <span style="color:#4D8F2D;font-weight:600;">Attached ✔️</span>
              </p>

              <p style="margin:6px 0;color:#333;">
                <strong>Additional Supporting Documents:</strong>
                <span style="color:#4D8F2D;font-weight:600;">${addSuppDocUrl?"Attached ✔️" : "Missing ❌"}</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:40px;color:#999;font-size:12px;">
              © ${new Date().getFullYear()} Landus Cooperative • All Rights Reserved
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</div>

`,
allowAbsoluteUrls: true,
          };
          console.log("📤 Admin email base payload prepared", {
            toCount: adminEmails.length,
            from: adminBasePayload.from,
          });
          // Send individually to reduce provider errors
          for (const recipient of adminEmails) {
            const perRecipientPayload = { ...adminBasePayload, to: recipient } as any;
            try {
              await strapi.plugin("email").service("email").send(perRecipientPayload);
              console.log(`✅ Admin email queued to: ${recipient}`);
            } catch (e: any) {
              const status = e?.response?.status;
              const data = e?.response?.data;
              console.error(`❌ Admin email failed to ${recipient}`, { status, data });
              // continue to next recipient
            }
          }
        } else {
          console.warn(
            "⚠️ Donation_Admin_email is empty - admin notification skipped"
          );
        }if (email) {
      await strapi
            .plugin("email")
            .service("email")
            .send({
        to: email,
        from: fromAddress,
              subject: "Your Donation Was Received",
              text: `Thank you, ${contactPerson}! Your donation was received.\n\nContact Person: ${contactPerson} \nEmail: ${email}\nPhone: ${phoneNumber}`,
              html: `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f2f2f2; padding:20px; font-family: Arial;">
  <tr>
    <td align="center">
      <table width="600" style="background:#ffffff; border-radius:10px; padding:30px;">
        <tr>
          <td align="center">
            <h2 style="color:#11a400;">Thank You, ${contactPerson}! 🎉</h2>
            <p>Your donation has been successfully received.</p>
          </td>
        </tr>

        <tr><td><h3>Your Details</h3></td></tr>
        <p style="margin:6px 0;color:#333;"><strong>Group / Organization Applying:</strong> ${groupOrOrganizationApplying}</p>
                <p style="margin:6px 0;color:#333;"><strong>Contact Person:</strong> ${contactPerson}</p>
                <p style="margin:6px 0;color:#333;"><strong>Location:</strong> ${location}</p>
                <p style="margin:6px 0;color:#333;"><strong>Address Line 1:</strong> ${addressLine1}</p>
                <p style="margin:6px 0;color:#333;"><strong>Address Line 2:</strong> ${addressLine2}</p>
                <p style="margin:6px 0;color:#333;"><strong>City:</strong> ${city}</p>
                <p style="margin:6px 0;color:#333;"><strong>State:</strong> ${state}</p>
                <p style="margin:6px 0;color:#333;"><strong>Zip Code:</strong> ${zipCode}</p>
                <p style="margin:6px 0;color:#333;"><strong>Email:</strong> ${email}</p>
                <p style="margin:6px 0;color:#333;"><strong>Phone:</strong> ${phoneNumber}</p>
                <p style="margin:6px 0;color:#333;"><strong>Federal Tax Id Number:</strong> ${federalTaxIdNumber}</p>
                <p style="margin:6px 0;color:#333;"><strong>Donation Amount Requested:</strong> ${donationAmountRequested}</p>
                <p style="margin:6px 0;color:#333;"><strong>Date Of Request:</strong> ${dateOfRequest}</p>
                <p style="margin:6px 0;color:#333;"><strong>Purpose Of Donation:</strong> ${purposeOfDonation}</p>
                <p style="margin:6px 0;color:#333;"><strong>Additional Information:</strong> ${additionalInformation}</p>

      </table>
    </td>
  </tr>
</table>
`,
            });
          console.log(" Confirmation email queued to:", email);
        }
      } catch (err: any) {
        // Surface Cloud Mailer 422 details clearly
        const status = err?.response?.status;
        const data = err?.response?.data;
        if (status === 422) {
          console.error("❌ Cloud Mailer validation failed (422). Details:", {
            message: data?.message,
            details: data?.details,
          });
        } else {
          console.error(" Email sending error:", err);
        }
      }

      return response;
    },
  })
);