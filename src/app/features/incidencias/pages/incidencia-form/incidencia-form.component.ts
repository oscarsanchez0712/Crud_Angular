import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidenciaService } from '../../../../core/services/incidencia.service';
import { sinEspacios, soloLetras } from '../../../../core/utils/validators';
import {
  ESTADOS,
  Incidencia,
  IncidenciaForm,
  PRIORIDADES
} from '../../../../models/incidencia.model';

@Component({
  selector: 'app-incidencia-form',
  standalone: false,
  templateUrl: './incidencia-form.component.html',
  styleUrl: './incidencia-form.component.scss'
})
export class IncidenciaFormComponent implements OnInit {
  prioridades = PRIORIDADES;
  estados = ESTADOS;

  editando = false;
  incidencia?: Incidencia;

  form: FormGroup<{
    titulo: FormControl<string>;
    descripcion: FormControl<string>;
    prioridad: FormControl<IncidenciaForm['prioridad']>;
    estado: FormControl<IncidenciaForm['estado']>;
    responsable: FormControl<string>;
  }>;

  constructor(
    private fb: FormBuilder,
    private service: IncidenciaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.nonNullable.group({
      titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(80), sinEspacios]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500), sinEspacios]],
      prioridad: ['' as IncidenciaForm['prioridad'], [Validators.required]],
      estado: ['Pendiente' as IncidenciaForm['estado'], [Validators.required]],
      responsable: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60), sinEspacios, soloLetras]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    const encontrada = this.service.obtenerPorId(Number(id));
    if (!encontrada) {
      this.router.navigate(['/incidencias']);
      return;
    }

    this.editando = true;
    this.incidencia = encontrada;
    this.form.patchValue({
      titulo: encontrada.titulo,
      descripcion: encontrada.descripcion,
      prioridad: encontrada.prioridad,
      estado: encontrada.estado,
      responsable: encontrada.responsable
    });
  }

  /** True si el campo es inválido y ya fue tocado (para mostrar el error). */
  invalido(campo: string): boolean {
    const c = this.form.get(campo);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  error(campo: string): string {
    const errores = this.form.get(campo)?.errors;
    if (!errores) return '';
    if (errores['required'] || errores['soloEspacios']) return 'Este campo es obligatorio.';
    if (errores['minlength']) return `Mínimo ${errores['minlength'].requiredLength} caracteres.`;
    if (errores['maxlength']) return `Máximo ${errores['maxlength'].requiredLength} caracteres.`;
    if (errores['soloLetras']) return 'Solo se permiten letras.';
    return 'Valor no válido.';
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const datos = this.form.getRawValue();
    if (this.editando && this.incidencia) {
      this.service.actualizar(this.incidencia.id, datos);
      this.router.navigate(['/incidencias', this.incidencia.id]);
    } else {
      const nueva = this.service.crear(datos);
      this.router.navigate(['/incidencias', nueva.id]);
    }
  }
}
