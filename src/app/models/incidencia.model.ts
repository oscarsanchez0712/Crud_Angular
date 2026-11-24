export type Prioridad = 'Alta' | 'Media' | 'Baja';
export type Estado = 'Pendiente' | 'En proceso' | 'Resuelta';

export const PRIORIDADES: Prioridad[] = ['Alta', 'Media', 'Baja'];
export const ESTADOS: Estado[] = ['Pendiente', 'En proceso', 'Resuelta'];

export interface Incidencia {
  id: number;
  codigo: string;
  titulo: string;
  descripcion: string;
  prioridad: Prioridad;
  estado: Estado;
  fecha: string; // fecha de registro inicial (ISO)
  responsable: string;
}

/** Datos que llenan el formulario (sin id, código ni fecha). */
export type IncidenciaForm = Omit<Incidencia, 'id' | 'codigo' | 'fecha'>;

export interface FiltrosIncidencia {
  texto: string;
  prioridad: Prioridad | '';
  estado: Estado | '';
}
