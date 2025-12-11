import axios from 'axios';

const exportRequests = {
  exportDonations: async () => {
    // This hits our custom admin route (plugin server side)
    const response = await axios.get('/donation-export/export', {
      responseType: 'blob', // expecting XLSX binary
    });
    return response;
  },
};

export default exportRequests;
