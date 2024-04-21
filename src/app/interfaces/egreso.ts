import { Categoria } from '../interfaces/categoria';
import { Tercero } from '../interfaces/tercero';

export interface Egreso {
  _id: any; // Puedes mantenerlo como string o usar cualquier otro tipo que prefieras
  egresoId: number;
  tenantId: string;
  tercero?: Tercero | null; // Cambiar por el tipo correspondiente si tercero es un ObjectId
  fecha: Date;
  detalle: string;
  categoria?: Categoria | null; // Cambiar por el tipo correspondiente si categoria es un ObjectId
  valor: number;
  facturaUrl?: string; // El signo de interrogación indica que este campo es opcional
}
