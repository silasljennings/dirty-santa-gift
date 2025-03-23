import { getFirestore } from 'firebase-admin/firestore';
import { app, prodApp } from "./apps";


const firestore = getFirestore(app)
const firestoreProd = getFirestore(prodApp)
export { firestore, firestoreProd }
