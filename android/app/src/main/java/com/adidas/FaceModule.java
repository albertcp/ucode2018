package com.adidas;

import android.annotation.SuppressLint;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.util.Base64;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableNativeArray;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;

import okhttp3.WebSocket;

/**
 * Created by mcat on 11/03/18.
 */

public class FaceModule extends ReactContextBaseJavaModule {

    public FaceModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    public byte[] getBytesFromBitmap(Bitmap bitmap) {
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.JPEG, 70, stream);
        return stream.toByteArray();
    }

    @ReactMethod
    public void getImage(String path, Promise p){
        Log.i("Adidas", path.substring(5));
        Bitmap bm = BitmapFactory.decodeFile(path.substring(5));
        WritableNativeArray res = new WritableNativeArray();
        for(Byte b:getBytesFromBitmap(bm)){
            res.pushInt(b & 0xFF);
        }

        p.resolve(res);
        return;
    }



    public static String getBase64(Bitmap bitmap)
    {
        try{
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            bitmap.compress(Bitmap.CompressFormat.JPEG, 85, byteArrayOutputStream);
            byte[] byteArray = byteArrayOutputStream.toByteArray();

            return Base64.encodeToString(byteArray, Base64.NO_WRAP);
        }
        catch(Exception e)
        {
            Log.e("GetBase64", e.getMessage());
            return null;
        }
    }

    @Override
    public String getName() {
        return "Face";
    }
}
