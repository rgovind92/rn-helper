// TODO: Remove this file in prod builds (Maybe using config.exclude?)
export default {
  mobilityLogin: {
    data: {
      results: [{
        sessionId:
          'aWNTZXNzaW9uSWQ6bWE3VUVYdHhSZnJxclZseVpiTHdudTZVTmh2WVYwZThWck8wdjdOTERXZEJ4QjQ1WFlGOU8xZXFqRUlEQndWVmZOejNNWiUyQmtqSjNlJTBBaEdrQm5NdDNxQSUzRCUzRA==', //eslint-disable-line
        language: 'en',
        country: '',
        stationCode: 'SYD',
        ownAirlineCode: 'QF',
        airportCode: 'SYD',
        defaultWarehouseCode: 'SYDWH01',
        companyCode: 'QF',
        roleGroupCode: 'CST',
        userId: 'ICARGO1',
        dateFormat: 'dd-MMM-yyyy',
        timeFormat: 'HH:mm:ss',
        dateAndTimeFormat: 'dd-MMM-yyyy HH:mm:ss',
        ownAirlineIdentifier: 1081,
        defaultOfficeCode: 'SYD',
        firstName: 'ICARGO SYSADMIN USER',
        userParameters: '',
        error1: 'Login Failed!'
      }]
    }
  },
  /*mobilityLogin: {
    data: {
      results: [],
      errors: {
        ERROR: {
          code: 'ADM001',
          errorData: [
            'ICOADMIN',
            'weblogic'
          ]
        }
      }
    }
  },*/
  getUserMenu: {
    data: {
      results: [
        {
          code: 'MOBIMP',
          name: 'Import',
          order: '2',
          menu: [
            {
              code: 'MOB010',
              name: 'Task List',
              order: '1',
              className: 'icargoMobile.view.workflow.defaults.TaskListView' //eslint-disable-line
            },
            {
              code: 'MOB011',
              name: 'Photo Doc',
              order: '3',
              className:
                'icargoMobile.view.operations.producthandling.PhotoDocumentationView' //eslint-disable-line
            },
            {
              code: 'MOB012',
              name: 'Export Buildup',
              order: '2',
              className:
                'icargoMobile.view.operations.producthandling.PhotoDocumentationView' //eslint-disable-line
            }
          ]
        }
      ]
    }
  }
};
