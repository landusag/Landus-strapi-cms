"use strict";

const ExcelJS = require("exceljs");

// 🔥 Helper: Fetch ALL records (no limit, auto pagination)
async function fetchAllDocuments(uid) {
  let page = 1;
  const pageSize = 500;
  let allResults = [];

  while (true) {
    const result = await strapi.documents(uid).findMany({
      populate: {
        applicationFile: true,
        referenceLetter: true,
      },
      page,
      pageSize,
    });

    // Break if no more records
    if (!Array.isArray(result) || result.length === 0) break;

    allResults = allResults.concat(result);

    // If fewer records returned → last page
    if (result.length < pageSize) break;

    page++;
  }

  return allResults;
}

module.exports = {
  async exportExcel(ctx) {
    try {
      const COLLECTION_UID =
        "api::scholarship-application.scholarship-application";

      const baseUrl =
        strapi.config.get("server.url") || "http://localhost:1337";

      // 🔥 Fetch ALL entries (100, 500, 5000, unlimited...)
      const entries = await fetchAllDocuments(COLLECTION_UID);

      console.log("Total Export Records:", entries.length);

      // Create workbook
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Scholarship Applications");

      // Freeze top header row
      sheet.views = [{ state: "frozen", ySplit: 1 }];

      // Header row
      const header = [
        "ID",
        "First Name",
        "Last Name",
        "Email",
        "Phone Number",
        "Application File URL",
        "Reference Letter URL",
      ];

      const headerRow = sheet.addRow(header);

      headerRow.font = { bold: true, size: 13 };
      headerRow.alignment = { vertical: "middle", horizontal: "center" };

      headerRow.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFD9E1F2" },
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });

      // Add rows
      entries.forEach((item) => {
        const applicationUrl = item.applicationFile?.url
          ? `${baseUrl}${item.applicationFile.url}`
          : "";

        const referenceUrl = item.referenceLetter?.url
          ? `${baseUrl}${item.referenceLetter.url}`
          : "";

        const dataRow = sheet.addRow([
          item.id,
          item.firstName || "",
          item.lastName || "",
          item.email || "",
          item.phoneNumber || "",
          applicationUrl,
          referenceUrl,
        ]);

        dataRow.height = 22; // set row height for each data row
      });

      // Auto column width
      sheet.columns.forEach((col) => {
        let maxLength = 15;
        col.eachCell({ includeEmpty: true }, (cell) => {
          const val = cell.value ? cell.value.toString() : "";
          maxLength = Math.max(maxLength, val.length);
        });
        col.width = maxLength + 3;
      });

      // Generate file
      const buffer = await workbook.xlsx.writeBuffer();

      // Ensure correct headers so the browser/download uses .xlsx (not .csv)
      ctx.set(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      ctx.set(
        "Content-Disposition",
        // Force a consistent filename expected by Excel
        "attachment; filename=scholarships.xlsx"
      );
      ctx.set("Content-Length", String(buffer.length));
      ctx.body = buffer;
    } catch (err) {
      console.error("EXPORT ERROR:", err);
      ctx.throw(500, "Failed to generate Excel");
    }
  },
};
