
import { initializeApp } from "firebase/app";

export const useFirebase = () => {
    const firebaseConfig = {
      apiKey: "AIzaSyA9T1fjQXQV2Ds5X4k3Bopcr3atG7rUCG4",
      authDomain: "expo-sns-4e88e.firebaseapp.com",
      projectId: "expo-sns-4e88e",
      storageBucket: "expo-sns-4e88e.firebasestorage.app",
      messagingSenderId: "26981492841",
      appId: "1:26981492841:web:24abf9dbfe1134e8fc5af8",
      };

    const app = initializeApp(firebaseConfig);
    return app;
}
