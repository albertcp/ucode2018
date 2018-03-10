package com.adidas;

import android.content.Intent;
import android.nfc.NfcAdapter;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;

import static android.content.ContentValues.TAG;

public class MainActivity extends ReactActivity {


    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "adidas";
    }

    private void handleNFCTag(Intent intent){
        if(NfcAdapter.ACTION_NDEF_DISCOVERED.equals(intent.getAction())){
            Log.i("Adidas", "NFC tag read!!!");
            byte[] id = intent.getByteArrayExtra(NfcAdapter.EXTRA_ID);
            final String last_tag_id = ByteArrayToHexString(id);
            Log.i("AdidasT", last_tag_id);
            ReactInstanceManager mReactInstanceManager = ((ReactApplication) getApplication()).getReactNativeHost().getReactInstanceManager();
            ReactContext context = mReactInstanceManager.getCurrentReactContext();
            if (context != null) {
                context.getNativeModule(NFCModule.class).onTagRead(last_tag_id);
            } else {
                mReactInstanceManager.addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener() {
                    public void onReactContextInitialized(ReactContext context) {
                        context.getNativeModule(NFCModule.class).onTagRead(last_tag_id);
                    }
                });
            }
        }
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        handleNFCTag(intent);
    }

    // handling ACTION_TAG_DISCOVERED action from intent:
    @Override
    protected void onResume() {
        super.onResume();
        handleNFCTag(getIntent());
    }


    // Converting byte[] to hex string:
    private String ByteArrayToHexString(byte [] inarray) {
        int i, j, in;
        String [] hex = {"0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"};
        String out= "";
        for(j = 0 ; j < inarray.length ; ++j)
        {
            in = (int) inarray[j] & 0xff;
            i = (in >> 4) & 0x0f;
            out += hex[i];
            i = in & 0x0f;
            out += hex[i];
        }
        return out;
    }
}
