import { User } from 'src/app/models/user.model';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { sesion } from './sesiones.model';


export interface registroClases
{
    uid:string
    user?:DocumentReference
    estado?:String
    fechaRegistro?: Date
    idClase?: string
    idUsuario?:string
    userInfo?: User
    claseInfo?: sesion;
    fullName:string
}