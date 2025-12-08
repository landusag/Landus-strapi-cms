import React, { useState } from 'react';
import exportRequests from '../api/export';

const ExportButton = () => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    try {
      setLoading(true);

      const res = await exportRequests.exportScholarships();

      // Create a URL for the downloaded blob (CSV)
      const blob = new Blob([res.data], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;

      // File name — adjust as you like
      link.setAttribute('download', 'scholarships-export.csv');
      
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Failed to export scholarship data. Check console for details.');
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
