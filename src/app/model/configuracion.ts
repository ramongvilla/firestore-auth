import { AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs";

export interface Configuracion{
    permitirRegistro?: boolean;
}