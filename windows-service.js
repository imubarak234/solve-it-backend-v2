// Install Node Windows Package
// npm i node-windows

// Create new file in project root directory name it: ussdPortalService.js
// Add below code to the file created above (ussdPortalService.js)
const Service = require('node-windows');

const svc = new Service({
    name: "Solve IT API",
    description: "This service automatically starts the portal incase of server restart or fault",
    script: ""
});

// Start the service on install
svc.on('install', () => {
    svc.start();
});

// Install the service
svc.install();
// ---------------------------------------------
// Run the file and install the service by running below command in your terminal pointing your root directory
// node .\ussdPortalService.js

// ---------------------------------------------
// To uninstall the service, comment line 14 to 20 and add the below code. Save and run command on line 23
// Uninstall the service
// svc.on('uninstall', () => {
//     console.log('Uninstall complete');
//     console.log('The service exists: ', svc.exists);
//     svc.start();
// });

// Install the service
// svc.uninstall();