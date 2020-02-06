// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('/__/firebase/7.8.0/firebase-app.js');
importScripts('/__/firebase/7.8.0/firebase-messaging.js');
importScripts('/__/firebase/init.js');

const messaging = firebase.messaging();

/**
 * Here is is the code snippet to initialize Firebase Messaging in the Service
 * Worker when your app is not hosted on Firebase Hosting.

 // [START initialize_firebase_in_sw]
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here, other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js');

 // Initialize the Firebase app in the service worker by passing in the
 // messagingSenderId.
 firebase.initializeApp({
   'messagingSenderId': 'YOUR-SENDER-ID'
 });

 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 const messaging = firebase.messaging();
 // [END initialize_firebase_in_sw]
 **/


// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  // var primaryKey = notification.data.primaryKey;
  var action = e.action;
  console.log("e.action", action);

  if (action === 'approve') {
    console.log("Inside Approve!");
    clients.openWindow('https://www.google.com');
    notification.close();
  } else {
    console.log("Inside Not Approved");
    clients.openWindow('https://www.yahoo.com');
    notification.close();
  }
});
messaging.setBackgroundMessageHandler(function(payload) {
  console.log("Inside setBackgroundMessageHandler()!")
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
    actions: [{
      action: 'approve',
      title: 'Approve',
      // icon: '/images/demos/action-3-128x128.png'
    }]
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});
// [END background_handler]
