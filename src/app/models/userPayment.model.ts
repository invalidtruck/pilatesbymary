import { DocumentReference } from '@angular/fire/compat/firestore';
export interface userPayment {
  uid?: string;
  vigencia?: Date;
  sesiones_restantes?: number;
  sesiones_compradas?: number;
  costo?: number;
  paquete?: DocumentReference;
  fecharegistro?: Date;
}
