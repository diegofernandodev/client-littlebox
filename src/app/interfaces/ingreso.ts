export interface Ingreso {
    _id?: any;
    ingresoId: number;
    tenantId: string;
    fecha:any;
    detalle: string;
    valor: number;
    tipo?: 'Ingreso';
  }
  