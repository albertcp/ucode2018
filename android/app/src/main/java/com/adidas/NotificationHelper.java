package com.adidas;

import android.app.PendingIntent;
import android.content.Intent;
import android.graphics.Color;
import android.content.Context;
import android.content.ContextWrapper;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;

class NotificationHelper extends ContextWrapper {
    private NotificationManager notifManager;
    public static final String CHANNEL_ONE_ID = "com.nedteam.adidas.ONE";
    public static final String CHANNEL_ONE_NAME = "Channel One";

//Create your notification channels//

    public NotificationHelper(Context base) {
        super(base);
        createChannels();
    }

    public void createChannels() {

        NotificationChannel notificationChannel = new NotificationChannel(CHANNEL_ONE_ID,
                CHANNEL_ONE_NAME, notifManager.IMPORTANCE_HIGH);
        notificationChannel.enableLights(true);
        notificationChannel.setLightColor(Color.RED);
        notificationChannel.setShowBadge(true);
        notificationChannel.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
        getManager().createNotificationChannel(notificationChannel);
    }

    public Class getMainActivityClass(ReactApplicationContext context) {
        String packageName = context.getPackageName();
        Intent launchIntent = context.getPackageManager().getLaunchIntentForPackage(packageName);
        String className = launchIntent.getComponent().getClassName();
        try {
            return Class.forName(className);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return null;
        }
    }


//Create the notification that’ll be posted to Channel One//

    public Notification.Builder getNotification1(ReactApplicationContext reactContext, String title, String body) {
        Intent intent = new Intent(reactContext, getMainActivityClass(reactContext));
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, 0);

        return new Notification.Builder(getApplicationContext(), CHANNEL_ONE_ID)
                .setContentTitle(title)
                .setContentText(body)
                .setSmallIcon(R.drawable.ic_launcher)
                .setContentIntent(pendingIntent)
                .setAutoCancel(true);
    }

    public void notify(int id, Notification.Builder notification) {
        getManager().notify(id, notification.build());
    }

//Send your notifications to the NotificationManager system service//

    private NotificationManager getManager() {
        if (notifManager == null) {
            notifManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        }
        return notifManager;
    }
}
