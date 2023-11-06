import { AngularFirestore } from "@angular/fire/compat/firestore"

export interface caldendario
{
    uid?: string
    alumnos: number
    fecha:Date
    instructor: string
    listaespera: number
    clase: string
    tiempo: number
}