package com.adidas;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.ContextWrapper;
import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.util.Log;

import com.estimote.cloud_plugin.common.EstimoteCloudCredentials;
import com.estimote.internal_plugins_api.cloud.CloudCredentials;
import com.estimote.internal_plugins_api.cloud.proximity.ProximityAttachment;
import com.estimote.mustard.rx_goodness.rx_requirements_wizard.Requirement;
import com.estimote.mustard.rx_goodness.rx_requirements_wizard.RequirementsWizardFactory;
import com.estimote.proximity_sdk.proximity.ProximityObserver;
import com.estimote.proximity_sdk.proximity.ProximityObserverBuilder;
import com.estimote.proximity_sdk.proximity.ProximityZone;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.List;

import io.reactivex.annotations.Nullable;
import kotlin.Unit;
import kotlin.jvm.functions.Function0;
import kotlin.jvm.functions.Function1;

/**
 * Created by urielainzensztain on 10/03/18.
 */

public class BeaconsModule extends ReactContextBaseJavaModule {

    private final String TAG = "Adidas";
    private ProximityObserver proximityObserver;

    public BeaconsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        Log.d(TAG, "Module loaded");
        CloudCredentials cloudCredentials =
                new EstimoteCloudCredentials("mcat95-gmail-com-s-proximi-kzl", "16fba01588a27e2d10bc5477253d20a3");

        // 2. Create the Proximity Observer
        this.proximityObserver =
                new ProximityObserverBuilder(getReactApplicationContext(), cloudCredentials)
                        .withOnErrorAction(new Function1<Throwable, Unit>() {
                            @Override
                            public Unit invoke(Throwable throwable) {
                                Log.e("Adidas", "proximity observer error: " + throwable);
                                return null;
                            }
                        })
                        .withBalancedPowerMode()
                        .build();
    }

    @ReactMethod
    public void registerBeacon(String key, String value, double distance, String title, String text){
        // add this below:
        final String _title = title;
        final String _text = text;
        ProximityZone zone1 = this.proximityObserver.zoneBuilder()
                .forAttachmentKeyAndValue(key, value)
                .inCustomRange(distance)
                .withOnEnterAction(new Function1<ProximityAttachment, Unit>() {
                    @Override
                    public Unit invoke(ProximityAttachment attachment) {
                        WritableMap params = Arguments.createMap();
                        Log.i("Adidas", "Beacon in");
                        showNotification(_title,_text);
                        params.putString("id",attachment.getDeviceId());
                        sendEvent(getReactApplicationContext(),"BEACON_ENTERED",params);
                        return null;
                    }
                })
                .withOnExitAction(new Function1<ProximityAttachment, Unit>() {
                    @Override
                    public Unit invoke(ProximityAttachment attachment) {
                        WritableMap params = Arguments.createMap();
                        Log.i("Adidas", "Beacon out");
                        params.putString("id",attachment.getDeviceId());
                        sendEvent(getReactApplicationContext(),"BEACON_EXIT",params);
                        return null;
                    }
                })
                .create();
        this.proximityObserver.addProximityZone(zone1);

        RequirementsWizardFactory
                .createEstimoteRequirementsWizard()
                .fulfillRequirements(getCurrentActivity(),
                        // onRequirementsFulfilled
                        new Function0<Unit>() {
                            @Override public Unit invoke() {
                                Log.d("app", "requirements fulfilled");
                                proximityObserver.start();
                                return null;
                            }
                        },
                        // onRequirementsMissing
                        new Function1<List<? extends Requirement>, Unit>() {
                            @Override public Unit invoke(List<? extends Requirement> requirements) {
                                Log.e("app", "requirements missing: " + requirements);
                                return null;
                            }
                        },
                        // onError
                        new Function1<Throwable, Unit>() {
                            @Override public Unit invoke(Throwable throwable) {
                                Log.e("app", "requirements error: " + throwable);
                                return null;
                            }
                        });
    }

    public void showNotification(String title, String message) {
        if(android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationHelper helper = new NotificationHelper(getReactApplicationContext());
            helper.createChannels();
            Notification.Builder not = helper.getNotification1(getReactApplicationContext(), title, message);
            helper.notify(1, not);
        }
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @Override
    public String getName() {
        return "Beacon";
    }
}
