import React, { useState } from 'react';
import exportRequests from '../api/export';

const ExportButton = (props = {}) => {
  // Hide button unless we are on Scholarship Applications list view
  const targetUid = 'api::donation-application.donation-application';
  const uid =
    props.displayedContentType?.uid ||
    props.layout?.uid ||
    props.contentType?.uid ||
    props.displayedCollection?.uid;
  const pathMatch =
    typeof window !== 'undefined' &&
    window.location?.pathname?.includes(targetUid);
  const isScholarship = uid === targetUid || pathMatch;
  if (!isScholarship) return null;
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    try {
      setLoading(true);

      const res = await exportRequests.exportDonations();
      console.log('Export response:', res);

      // Try to read filename from Content-Disposition header
      const cd = res.headers && res.headers['content-disposition'];
      let filename = 'donations.xlsx';
      if (cd) {
        const match = cd.match(/filename\*=UTF-8''([^;]+)|filename=([^;]+)/i);
        const raw = (match && (match[1] || match[2]))?.replace(/"/g, '');
        if (raw) filename = decodeURIComponent(raw);
      }

      // Create a URL for the downloaded blob (XLSX)
      const blob = new Blob([res.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;

  // Use server-provided filename; fallback above
  link.setAttribute('download', filename);
      
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Failed to export donations data. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={loading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        borderRadius: '4px',
        border: '1px solid #62a73a',
        backgroundColor: loading ? '#e5e7eb' : '#62a73a',
        color: '#fff',
        fontSize: '14px',
        cursor: loading ? 'not-allowed' : 'pointer',
      }}
    >
      {loading ? 'EXPORTING…' : 'EXPORT'}
    </button>
  );
};

export default ExportButton;
