import { getStorage } from "firebase/storage";

import { app } from "./firebase";

export const storage = getStorage(app);
