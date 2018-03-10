package com.adidas;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

public class FirebaseModule extends ReactContextBaseJavaModule {

    private final String TAG = "Adidas";

    FirebaseDatabase database;

    public FirebaseModule(ReactApplicationContext reactContext) {
        super(reactContext);
        Log.d(TAG, "Module loaded");
        database = FirebaseDatabase.getInstance();
        database.getReference("message").addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                String value = dataSnapshot.getValue(String.class);
                Log.d(TAG, "Value is: " + value);
            }

            @Override
            public void onCancelled(DatabaseError error) {
                // Failed to read value
                Log.w(TAG, "Failed to read value.", error.toException());
            }
        });
    }

    @ReactMethod
    public void insertTestData(String message){
        // Write a message to the database
        DatabaseReference myRef = database.getReference("message");
        myRef.setValue(message);
        Log.d(TAG, "Message inserted: " + message);
    }

    @Override
    public String getName() {
        return "Firebase";
    }
}
