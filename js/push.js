var webPush = require('web-push');
     
const vapidKeys = {
   "publicKey": "BFCsxh-4Ir6FORDcN1ZydBfZjanG1ocoyWnWd7vjSgWPQ_ZblNKtlvQ2g0SrZMV5ConLBPVpgeANEHXIL_ZfFAY",
   "privateKey": "VS8m_i_fUfjVzA5l4Df9fhRyxpFoFlSJndN1aeOOyw0"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/f1WGRflwvc4:APA91bEcnBR4K4nXyC7c3qDaOkrT56uZ6hepQgqR03EE7ild8wSqdcEXkmtzfWRIAWYr8X0-6D7lUuOSa-2EAjrBqAVORALSMVCFNOpKzpMfmeXN9ACtif79oI1QB_lQX_vMVQ1f9kfq",
   "keys": {
       "p256dh": "BCyHom+8wiC66wFO7aBOGE8f6CC+/yQPWboaJJhExocp6Dy/m41LBBkKaoHvvzd4oceMK7O6A1APm1DcWq+Qg6Y=",
       "auth": "/8vVb6fykHOH7I+SNatDEA=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '893740316548',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);