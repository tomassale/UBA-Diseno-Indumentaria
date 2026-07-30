import type { Materia } from '../types';

// En los datos crudos (tomados del póster de la carrera) las correlativas se
// escriben con el CÓDIGO de la materia (ej. 'ME1', 'TPIN1') y con el token 'CBC'
// para indicar "todo el CBC aprobado". El resto de la app, en cambio, identifica
// las materias por su `id`. Esta normalización traduce esos códigos a ids una sola
// vez, en el borde de entrada, para que el mapa, los estados y el panel resuelvan
// las correlativas de forma consistente.

const CBC_TOKEN = 'CBC';

export function normalizarCorrelativas(materias: Materia[]): Materia[] {
  const idPorCodigo = new Map(materias.map(m => [m.codigo, m.id]));
  const idsCBC = materias.filter(m => m.anio === CBC_TOKEN).map(m => m.id);

  const resolver = (refs: string[]): string[] => {
    const ids = new Set<string>();
    for (const ref of refs) {
      if (ref === CBC_TOKEN) {
        idsCBC.forEach(id => ids.add(id));
        continue;
      }
      const id = idPorCodigo.get(ref);
      if (id) ids.add(id); // una referencia sin materia se descarta en silencio
    }
    return [...ids];
  };

  return materias.map(m => ({
    ...m,
    correlativasCursar: resolver(m.correlativasCursar),
    correlativasFinal: resolver(m.correlativasFinal),
  }));
}
