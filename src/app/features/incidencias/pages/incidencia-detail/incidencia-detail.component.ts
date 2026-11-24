import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidenciaService } from '../../../../core/services/incidencia.service';
import { Incidencia } from '../../../../models/incidencia.model';

@Component({
  selector: 'app-incidencia-detail',
  standalone: false,
  templateUrl: './incidencia-detail.component.html',
  styleUrl: './incidencia-detail.component.scss'
})
export class IncidenciaDetailComponent implements OnInit {
  incidencia?: Incidencia;
  confirmando = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: IncidenciaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.incidencia = this.service.obtenerPorId(id);
  }

  eliminar(): void {
    if (this.incidencia) {
      this.service.eliminar(this.incidencia.id);
    }
    this.router.navigate(['/incidencias']);
  }
}
