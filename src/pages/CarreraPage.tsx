import { disenoIndumentaria } from '../data/diseño';
import { normalizarCorrelativas } from '../utils/correlativas';
import { AppInner } from '../components/AppInner';

// La carrera es estática: se normaliza una sola vez al cargar el módulo.
const carrera = {
  ...disenoIndumentaria,
  materias: normalizarCorrelativas(disenoIndumentaria.materias),
};

export function CarreraPage() {
  return <AppInner carrera={carrera} />;
}