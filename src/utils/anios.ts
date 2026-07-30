import type { Materia } from '../types';

// El año de una materia puede ser un número (1°, 2°, …) o un texto como 'CBC'.
// Estos helpers centralizan cómo se ordena y cómo se muestra ese valor, para que
// el mapa y la tabla lo traten igual.

/** El CBC (o cualquier año no numérico) va antes que el 1° año. */
export function anioSortKey(anio: Materia['anio']): number {
  return typeof anio === 'number' ? anio : -1;
}

export function anioLabel(anio: Materia['anio']): string {
  return typeof anio === 'number' ? `${anio}° Año` : String(anio);
}
