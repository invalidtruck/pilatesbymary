import { User } from 'src/app/models/user.model';
import { DocumentReference } from '@angular/fire/compat/firestore';


export interface registroClases
{
    uid:string
    user?:DocumentReference
    estado:String
    fechaRegistro: Date
    idClase: string
    idUsuario:string
    userInfo: User
}