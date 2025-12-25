import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
    /*apiKey: "AIzaSyATV_ZZ0UJylnmmBnM_lr8rrVcAETugQAY",
    authDomain: "mounts-376507.firebaseapp.com",
    projectId: "mounts-376507",
    storageBucket: "mounts-376507.appspot.com",
    messagingSenderId: "297491435793",
    appId: "1:297491435793:web:bd757aba8c94013de83cb0",
    measurementId: "G-C1YJNJK3H0"*/

    apiKey: "AIzaSyBNkAxb7GB4dX0f1Ho2AeTmlxHJmUNXQR4",
    authDomain: "zangie-mounts.firebaseapp.com",
    projectId: "zangie-mounts",
    storageBucket: "zangie-mounts.appspot.com",
    messagingSenderId: "277325250371",
    appId: "1:277325250371:web:56b03235d175dacbce79f6"

}
firebase.initializeApp(config)
export default firebase