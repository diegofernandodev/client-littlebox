export interface Tercero {
  _id: any; // Puedes mantenerlo como string o usar cualquier otro tipo que prefieras
  nombreTercero: string;
  documentoTercero: string;
  direccionTercero: string;
  telefonoTercero: string;
  emailTercero?: string; // El signo de interrogación indica que este campo es opcional
  tenantId: string;
}
