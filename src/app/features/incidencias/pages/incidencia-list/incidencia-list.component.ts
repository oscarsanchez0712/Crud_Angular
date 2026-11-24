import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IncidenciaService } from '../../../../core/services/incidencia.service';
import {
  ESTADOS,
  Estado,
  FiltrosIncidencia,
  Incidencia,
  PRIORIDADES
} from '../../../../models/incidencia.model';

@Component({
  selector: 'app-incidencia-list',
  standalone: false,
  templateUrl: './incidencia-list.component.html',
  styleUrl: './incidencia-list.component.scss'
})
export class IncidenciaListComponent implements OnInit, OnDestroy {
  prioridades = PRIORIDADES;
  estados = ESTADOS;

  filtros: FiltrosIncidencia = { texto: '', prioridad: '', estado: '' };

  todas: Incidencia[] = [];
  visibles: Incidencia[] = [];

  incidenciaAEliminar: Incidencia | null = null;

  private sub?: Subscription;

  constructor(private incidenciaService: IncidenciaService) {}

  ngOnInit(): void {
    this.sub = this.incidenciaService.listar().subscribe(lista => {
      this.todas = lista;
      this.aplicarFiltros();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  aplicarFiltros(): void {
    this.visibles = this.incidenciaService.filtrar(this.todas, this.filtros);
  }

  limpiarFiltros(): void {
    this.filtros = { texto: '', prioridad: '', estado: '' };
    this.aplicarFiltros();
  }

  get hayFiltros(): boolean {
    return !!(this.filtros.texto || this.filtros.prioridad || this.filtros.estado);
  }

  pedirConfirmacion(incidencia: Incidencia): void {
    this.incidenciaAEliminar = incidencia;
  }

  confirmarEliminar(): void {
    if (this.incidenciaAEliminar) {
      this.incidenciaService.eliminar(this.incidenciaAEliminar.id);
    }
    this.incidenciaAEliminar = null;
  }

  cancelarEliminar(): void {
    this.incidenciaAEliminar = null;
  }

  get abiertas(): number {
    return this.todas.filter(i => i.estado !== 'Resuelta').length;
  }

  get urgentes(): number {
    return this.todas.filter(i => i.prioridad === 'Alta' && i.estado !== 'Resuelta').length;
  }

  contar(estado: Estado | ''): number {
    return estado ? this.todas.filter(i => i.estado === estado).length : this.todas.length;
  }

  elegirEstado(estado: Estado | ''): void {
    this.filtros.estado = estado;
    this.aplicarFiltros();
  }

  trackById(_: number, item: Incidencia): number {
    return item.id;
  }
}
