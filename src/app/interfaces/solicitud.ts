import { Categoria } from '../interfaces/categoria';
import { Tercero } from '../interfaces/tercero';
import { EstadoSolicitud } from '../interfaces/estadoSolicitud';

export interface Solicitud {
  _id?: any; // Puedes mantenerlo como string o usar cualquier otro tipo que prefieras
  solicitudId: number;
  tenantId: string;
  tercero?: Tercero | null; // Cambiar por el tipo correspondiente si tercero es un ObjectId
  fecha: any;
  detalle: string;
  categoria?: Categoria | null; // Cambiar por el tipo correspondiente si categoria es un ObjectId
  valor: number;
  estado?: EstadoSolicitud | null; // Cambiar por el tipo correspondiente si estado es un ObjectId
  facturaUrl?: string | null | undefined; // El signo de interrogación indica que este campo es opcional
}
