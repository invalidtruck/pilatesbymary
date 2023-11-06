import { DocumentReference } from '@angular/fire/compat/firestore';
export interface userPayment {
  uid: string;
  vigencia: Date;
  sesiones: number;
  costo: number;
  paquete: DocumentReference;
  fecharegistro: Date;
}
