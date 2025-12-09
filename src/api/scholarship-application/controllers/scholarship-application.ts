import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::scholarship-application.scholarship-application",
  ({ strapi }) => ({
    async create(ctx) {
      // Create entry
      const response = await super.create(ctx);
      const id = response.data.id;

      // Re-fetch the full entry with media populated (TS FIX: entry typed as ANY)
      const entry: any = await strapi.entityService.findOne(
        "api::scholarship-application.scholarship-application",
        id,
        {
          populate: ["applicationFile", "referenceLetter"],
        }
      );
      try {
        // Extract fields
        const firstName = entry.firstName;
        const lastName = entry.lastName;
        const email = entry.email;
        const phone = entry.phoneNumber;

        // Media extraction
        const baseUrl = process.env.STRAPI_URL || "http://localhost:1337";
        const logoUrl =
          "https://proper-strength-b118ff89b5.media.strapiapp.com/landus_logo_6547c90a69.svg";
        console.log("LOGO URL:", logoUrl);
        console.log("Application File URL:", entry.applicationFile?.url);

        const getFileUrl = (file: any) => {
          if (!file?.url) return null;

          if (file.url.startsWith("http")) {
            return file.url; // Strapi Cloud absolute URL
          }

          return `${baseUrl}${file.url}`; // Local/uploads URL
        };

        const appFileUrl = getFileUrl(entry.applicationFile);
        const refFileUrl = getFileUrl(entry.referenceLetter);

        console.log("APP FILE DEV URL:", appFileUrl);
        console.log("REF FILE DEV URL:", refFileUrl);

        const adminEmails = process.env.SCHOLARSHIP_ADMIN_EMAILS?.split(
          ","
        ).map((e) => e.trim());

        // ---------------------- Admin Email HTML ----------------------
        // Strapi v4 email service
        await strapi
          .plugin("email")
          .service("email")
          .send({
            to: adminEmails,
            subject: "New Scholarship Application Received",
            html: `
<div style="margin:0;padding:0;background:#F5F5F5;width:100%;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">

        <!-- HEADER BAR -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#00304d;">
          <tr>
            <td style="padding:20px 30px;">
              <img src="${logoUrl}"
                   width="100"
                   alt="Landus Logo"
                   style="display:block;filter:brightness(105%);" />
            </td>
          </tr>
        </table>

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
                New Scholarship Application
              </h1>

              <p style="color:#6A6A6A;font-size:15px;margin-top:8px;">
                A new applicant has submitted the form.
              </p>
            </td>
          </tr>

          <!-- Applicant Info -->
          <tr>
            <td style="padding:25px;background:#FAFAFA;border:1px solid #E5E5E5;border-radius:10px;">
              <h3 style="
                margin:0 0 12px;
                color:#00563F;
                font-size:18px;
                border-bottom:2px solid #62A73A;
                padding-bottom:6px;
              ">
                Applicant Details
              </h3>

              <p style="margin:6px 0;color:#333;"><strong>First Name:</strong> ${firstName}</p>
              <p style="margin:6px 0;color:#333;"><strong>Last Name:</strong> ${lastName}</p>
              <p style="margin:6px 0;color:#333;"><strong>Email:</strong> ${email}</p>
              <p style="margin:6px 0;color:#333;"><strong>Phone:</strong> ${phone}</p>
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
                <strong>Application:</strong>
                <span style="color:#4D8F2D;font-weight:600;">Attached ✔️</span>
              </p>

              <p style="margin:6px 0;color:#333;">
                <strong>Reference Letter:</strong>
                <span style="color:#4D8F2D;font-weight:600;">Attached ✔️</span>
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
            attachments: [
              appFileUrl && { filename: "Application.pdf", path: appFileUrl },
              refFileUrl && {
                filename: "ReferenceLetter.pdf",
                path: refFileUrl,
              },
            ].filter(Boolean),
          });

        // ---------------------- Confirmation Email ----------------------
        if (email) {
          await strapi
            .plugin("email")
            .service("email")
            .send({
              to: email,
              subject: "Your Scholarship Application Was Received",
              html: `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f2f2f2; padding:20px; font-family: Arial;">
  <tr>
    <td align="center">
      <table width="600" style="background:#ffffff; border-radius:10px; padding:30px;">
        <tr>
          <td align="center">
            <h2 style="color:#11a400;">Thank You, ${firstName}! 🎉</h2>
            <p>Your scholarship application has been successfully submitted.</p>
          </td>
        </tr>

        <tr><td><h3>Your Details</h3></td></tr>
        <tr><td><strong>Name:</strong> ${firstName} ${lastName}</td></tr>
        <tr><td><strong>Email:</strong> ${email}</td></tr>
        <tr><td><strong>Phone:</strong> ${phone}</td></tr>

      </table>
    </td>
  </tr>
</table>
`,
            });
          console.log("✅ Confirmation email queued to:", email);
        }
      } catch (err) {
        console.error("❌ Email sending error:", err);
      }

      return response;
    },
  })
);
