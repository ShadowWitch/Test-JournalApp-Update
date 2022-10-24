import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"

export const LoadNotes = async (uid = '') => {

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notas`)
    const docs = await getDocs(collectionRef)
    const notes = []

    docs.forEach(doc => {
        notes.push({
            ids: doc.id,
            ...doc.data()
        })
    })

    // En este caso NO puedo usar el "map" ya que no lo reconoce como un "array" al "docs"
    // docs.docs.map() // Al menos que lo pongamos de esta manera...

    // console.log(notes)
    return notes;
}



