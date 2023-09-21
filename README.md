# FirebaseHelper

## Example

```
import {
  FirestoreHelper,
  AuthHelper,
  InitializeHelper,
} from "@grazzianixf/firebase-helper";

const firebaseConfig = {
  apiKey: "*",
  authDomain: "zzzzzzz.firebaseapp.com",
  databaseURL: "https://zzzz.firebaseio.com",
  projectId: "project_123",
  storageBucket: "zzz.appspot.com",
  messagingSenderId: "******",
  appId: "*****",
};

const { app } = new InitializeHelper(firebaseConfig);
export const authHelper = new AuthHelper(app);
export const firestoreHelper = new FirestoreHelper(app);
```