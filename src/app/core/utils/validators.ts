import { AbstractControl, ValidationErrors } from '@angular/forms';

/** Rechaza textos que solo tienen espacios en blanco. */
export function sinEspacios(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if (typeof valor === 'string' && valor.length > 0 && valor.trim().length === 0) {
    return { soloEspacios: true };
  }
  return null;
}

/** Rechaza nombres con números o símbolos raros. */
export function soloLetras(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if (!valor) return null;
  return /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s.]+$/.test(valor) ? null : { soloLetras: true };
}
