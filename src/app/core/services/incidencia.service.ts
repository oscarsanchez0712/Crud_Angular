import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  FiltrosIncidencia,
  Incidencia,
  IncidenciaForm
} from '../../models/incidencia.model';

const STORAGE_KEY = 'incidencias-app:datos';

const DATOS_INICIALES: Incidencia[] = [
  {
    id: 1,
    codigo: 'INC-001',
    titulo: 'Falla de red Lab 04',
    descripcion: 'Las computadoras del laboratorio 04 no se conectan a la red institucional desde la mañana.',
    prioridad: 'Alta',
    estado: 'En proceso',
    fecha: '2026-11-23T08:30:00.000Z',
    responsable: 'Carlos Ramos'
  },
  {
    id: 2,
    codigo: 'INC-002',
    titulo: 'Error acceso portal',
    descripcion: 'Algunos alumnos reciben un mensaje de credenciales inválidas al ingresar al portal académico.',
    prioridad: 'Media',
    estado: 'Pendiente',
    fecha: '2026-11-23T10:15:00.000Z',
    responsable: 'Lucía Fernández'
  },
  {
    id: 3,
    codigo: 'INC-003',
    titulo: 'Actualización Office',
    descripcion: 'Se requiere actualizar Office en las laptops de la sala de docentes.',
    prioridad: 'Baja',
    estado: 'Resuelta',
    fecha: '2026-11-22T15:00:00.000Z',
    responsable: 'Carlos Ramos'
  }
];

@Injectable({ providedIn: 'root' })
export class IncidenciaService {
  private readonly datos$ = new BehaviorSubject<Incidencia[]>(this.cargar());

  /** Lista reactiva: se actualiza sola después de crear, editar o eliminar. */
  listar(): Observable<Incidencia[]> {
    return this.datos$.asObservable();
  }

  obtenerPorId(id: number): Incidencia | undefined {
    return this.datos$.value.find(i => i.id === id);
  }

  crear(datos: IncidenciaForm): Incidencia {
    const lista = this.datos$.value;
    const siguienteId = lista.length ? Math.max(...lista.map(i => i.id)) + 1 : 1;

    const nueva: Incidencia = {
      ...this.limpiar(datos),
      id: siguienteId,
      codigo: 'INC-' + String(siguienteId).padStart(3, '0'),
      fecha: new Date().toISOString()
    };

    this.guardar([nueva, ...lista]);
    return nueva;
  }

  actualizar(id: number, datos: IncidenciaForm): boolean {
    const lista = this.datos$.value;
    if (!lista.some(i => i.id === id)) return false;

    this.guardar(lista.map(i => (i.id === id ? { ...i, ...this.limpiar(datos) } : i)));
    return true;
  }

  eliminar(id: number): void {
    this.guardar(this.datos$.value.filter(i => i.id !== id));
  }

  /** Aplica búsqueda por título y filtros de prioridad / estado. */
  filtrar(lista: Incidencia[], filtros: FiltrosIncidencia): Incidencia[] {
    const texto = filtros.texto.trim().toLowerCase();
    return lista.filter(i =>
      (!texto || i.titulo.toLowerCase().includes(texto)) &&
      (!filtros.prioridad || i.prioridad === filtros.prioridad) &&
      (!filtros.estado || i.estado === filtros.estado)
    );
  }

  restaurarDatosIniciales(): void {
    this.guardar([...DATOS_INICIALES]);
  }

  private limpiar(datos: IncidenciaForm): IncidenciaForm {
    return {
      ...datos,
      titulo: datos.titulo.trim(),
      descripcion: datos.descripcion.trim(),
      responsable: datos.responsable.trim()
    };
  }

  private guardar(lista: Incidencia[]): void {
    this.datos$.next(lista);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
    } catch {
      console.warn('No se pudo guardar en el almacenamiento local.');
    }
  }

  private cargar(): Incidencia[] {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      if (guardado) {
        const lista = JSON.parse(guardado);
        if (Array.isArray(lista)) return lista as Incidencia[];
      }
    } catch {
      // si el JSON está dañado, se usan los datos de ejemplo
    }
    return [...DATOS_INICIALES];
  }
}
