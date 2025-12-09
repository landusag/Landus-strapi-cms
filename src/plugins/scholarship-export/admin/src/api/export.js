import axios from 'axios';

const exportRequests = {
  exportScholarships: async () => {
    // This hits our custom admin route (plugin server side)
    const response = await axios.get('/scholarship-export/export', {
      responseType: 'blob', // expecting XLSX binary
    });
    return response;
  },
};

export default exportRequests;
