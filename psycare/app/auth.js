import { auth, googleProvider } from "firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export const Auth = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.err(err);
    }
  };

  const logout = async () => {
    try {
        await signOut(auth);
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <button onClick={logout}> Sign Out </button>
    </div>
  );
};
