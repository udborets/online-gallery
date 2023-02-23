import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

provider.setCustomParameters({prompt: "select_account"})

export default provider;