import { FormControl } from '@angular/forms';
import { IncidenciaService } from './core/services/incidencia.service';
import { sinEspacios, soloLetras } from './core/utils/validators';
import { IncidenciaForm } from './models/incidencia.model';

describe('Validaciones y lógica CRUD', () => {
  const datos: IncidenciaForm = {
    titulo: '  Proyector dañado  ',
    descripcion: 'El proyector del aula 3 no enciende.',
    prioridad: 'Media',
    estado: 'Pendiente',
    responsable: 'Ana Torres'
  };

  beforeEach(() => localStorage.clear());

  it('sinEspacios rechaza textos en blanco', () => {
    expect(sinEspacios(new FormControl('    '))).toEqual({ soloEspacios: true });
    expect(sinEspacios(new FormControl('hola'))).toBeNull();
  });

  it('soloLetras rechaza números en el nombre', () => {
    expect(soloLetras(new FormControl('Juan123'))).toEqual({ soloLetras: true });
    expect(soloLetras(new FormControl('María Pérez'))).toBeNull();
  });

  it('crea una incidencia con código correlativo y título limpio', () => {
    const service = new IncidenciaService();
    const nueva = service.crear(datos);
    expect(nueva.codigo).toBe('INC-004');
    expect(nueva.titulo).toBe('Proyector dañado');
  });

  it('actualiza y elimina una incidencia', () => {
    const service = new IncidenciaService();
    service.actualizar(1, { ...datos, estado: 'Resuelta' });
    expect(service.obtenerPorId(1)?.estado).toBe('Resuelta');
    service.eliminar(1);
    expect(service.obtenerPorId(1)).toBeUndefined();
  });

  it('filtra por título, prioridad y estado', () => {
    const service = new IncidenciaService();
    let lista: any[] = [];
    service.listar().subscribe(l => (lista = l));
    expect(service.filtrar(lista, { texto: 'red', prioridad: '', estado: '' }).length).toBe(1);
    expect(service.filtrar(lista, { texto: '', prioridad: 'Baja', estado: '' }).length).toBe(1);
    expect(service.filtrar(lista, { texto: '', prioridad: '', estado: 'Pendiente' }).length).toBe(1);
  });
});
