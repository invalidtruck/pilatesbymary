import { DocumentReference } from "@angular/fire/compat/firestore"
import { User } from "./user.model"

export interface sesion{
  uid?: string
  alumnos?: Array<User>
  total: number
  fecha:Date
  hora:Date
  instructoruid: string
  instructor?: DocumentReference
  listaespera: number
  clase: string
  duracion: number

// PARA CONTABILIZAR ESTADO E Y R
  enEspera?:number
  registrado?:number
  asistencia?:number
}

