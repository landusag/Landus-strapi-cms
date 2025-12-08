import axios from 'axios';

const exportRequests = {
  exportScholarships: async () => {
    // This hits our custom admin route (plugin server side)
    const response = await axios.get('/scholarship-export/export', {
      responseType: 'blob', // we’ll send a CSV file
    });
    return response;
  },
};

export default exportRequests;
