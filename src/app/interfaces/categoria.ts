export interface Categoria {
  _id: any; // Puedes mantenerlo como string o usar cualquier otro tipo que prefieras
  tenantId?: string; // El signo de interrogación indica que este campo es opcional
  nombre: string;
  global?: boolean; // El signo de interrogación indica que este campo es opcional
}
