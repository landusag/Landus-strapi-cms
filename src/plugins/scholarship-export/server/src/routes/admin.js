module.exports = [
  {
    method: 'GET',
    path: '/export',
    handler: 'export.exportExcel',
    config: {
      auth: false,
      policies: [],
    },
  },
];
