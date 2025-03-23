import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  browserLocalPersistence, 
  setPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  updateProfile,
  User
} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyCQ38l6hygboOa5tvXmk_-YNgXVk87HIkE",
  authDomain: "tender-sud.firebaseapp.com",
  projectId: "tender-sud",
  storageBucket: "tender-sud.appspot.com",
  messagingSenderId: "628319895019",
  appId: "1:628319895019:web:e7fb5da3e8e63528a7adae",
  measurementId: "G-JMN0QMK2PB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);

// Configure auth persistence
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error('Auth persistence error:', error);
  });

const firebaseAuth = {
  async registerUser(email: string, password: string, displayName?: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }
      await sendEmailVerification(userCredential.user);
      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async loginWithEmail(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async loginWithGoogle(): Promise<User> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async updateUserProfile(user: User, data: { displayName?: string; photoURL?: string }): Promise<void> {
    try {
      await updateProfile(user, data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  generateUniqueFileName(originalName: string): string {
    const extension = originalName.split('.').pop();
    return `${uuidv4()}.${extension}`;
  },

  getCurrentUser(): User | null {
    return auth.currentUser;
  }
};

export { auth, googleProvider, storage, firebaseAuth };
export default app;