module.exports = name => [
  {
    method: 'GET',
    path: '/app/status',
    config: {
      id: 'app-status',
      description: 'API - App Status',
      notes: 'Endpoint for Checking App Status',
      tags: ['api', name],
      handler: (request, h) =>
        require('./app.handler').getAppStatus(request, h),
    },
  },
];
