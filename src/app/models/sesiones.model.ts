import { DocumentReference } from "@angular/fire/compat/firestore"
import { User } from "./user.model"
import { registroClases } from "./registroClases.models"

export interface sesion{
  registroClases: registroClases[]
  uid?: string
  alumnos?: Array<User>
  total: number
  fecha:Date
  hora:string
  instructoruid: string
  instructor?: DocumentReference
  listaespera: number
  clase: string
  duracion: number
  claseRegistro: registroClases[]
// PARA CONTABILIZAR ESTADO E Y R
  enEspera?:number
  registrado?:number
  asistencia?:number
}

