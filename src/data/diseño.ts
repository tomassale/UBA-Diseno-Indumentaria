import type { Carrera } from '../types';

/**
 * Diseño de Indumentaria y Textil — FADU (UBA)
 * Fuente: póster "Tu mapa de cursada" (Coalición FADU).
 *
 * ⚠️ IMPORTANTE — diferencias con el modelo de "Trabajo Social":
 * Esta carrera (como toda FADU) distingue DOS tipos de correlatividad:
 *   - correlativasCursar: FINALES aprobados que necesito para poder CURSAR la materia.
 *   - correlativasFinal:  CURSADAS aprobadas que necesito para poder RENDIR EL FINAL.
 * Además hay materias "sin examen final" (se aprueban con la cursada/promoción,
 * marcadas acá con tieneFinal: false) y materias anuales (esAnual: true).
 * Si el tipo `Materia` en `../types` no tiene estos campos, hay que agregarlos
 * (todos opcionales) para que este archivo compile sin romper trabajoSocial.ts:
 *
 *   correlativasCursar?: string[];
 *   correlativasFinal?: string[];
 *   tieneFinal?: boolean;
 *   esAnual?: boolean;
 *
 * ⚠️ Los códigos (ME1, FGDM, IP, ADIT1, HDIT1, TPIN1/2, MP, PI1-4, PA1-2, TPI1-4,
 * CyM1/2, CyCrítica, TFC, PPA, ÉticaP.) son las siglas tal cual figuran en el
 * póster: no incluye los nombres completos oficiales de la materia, así que los
 * dejé como "nombre" también. Si tenés el plan de estudios con los nombres
 * completos, te recomiendo reemplazarlos.
 * ⚠️ El póster no da "horasSemanales", así que no lo incluí.
 * ⚠️ Algunas celdas de correlativas (sobre todo CyCrítica y TFC) estaban muy
 * apretadas/superpuestas en el póster — revisalas contra el original si podés.
 */

const TODO_1_ANIO = ['ME1', 'FGDM', 'IP', 'ADIT1', 'HDIT1', 'TPIN1', 'TPIN2'];
const TODO_3_ANIO = ['PI2', 'PI3', 'PA1', 'SOCIO', 'CYM1', 'TPI3', 'TPI4', 'CYM2', 'CYCRITICA'];

export const disenoIndumentaria: Carrera = {
  id: 'dg-indumentaria',
  nombre: 'Diseño de Indumentaria y Textil',
  plan: 'FADU - UBA',
  materias: [
    // ── CBC ──────────────────────────────────────────────────────────────
    { id: 'proyectual1', codigo: 'PROYECTUAL1', nombre: 'Proyectual 1', anio: 'CBC', esAnual: true, tieneFinal: false, correlativasCursar: [], correlativasFinal: [], tipo: 'obligatoria' },
    { id: 'proyectual2', codigo: 'PROYECTUAL2', nombre: 'Proyectual 2', anio: 'CBC', esAnual: true, tieneFinal: false, correlativasCursar: [], correlativasFinal: [], tipo: 'obligatoria' },
    { id: 'dibujo', codigo: 'DIBUJO', nombre: 'Dibujo', anio: 'CBC', esAnual: true, tieneFinal: false, correlativasCursar: [], correlativasFinal: [], tipo: 'obligatoria' },
    { id: 'sociedad-estado', codigo: 'SOCIEDAD_ESTADO', nombre: 'Sociedad y Estado', anio: 'CBC', tieneFinal: true, correlativasCursar: [], correlativasFinal: [], tipo: 'obligatoria' },
    { id: 'pensamiento', codigo: 'PENSAMIENTO', nombre: 'Pensamiento', anio: 'CBC', tieneFinal: true, correlativasCursar: [], correlativasFinal: [], tipo: 'obligatoria' },
    { id: 'matematica', codigo: 'MATEMATICA', nombre: 'Matemática', anio: 'CBC', tieneFinal: true, correlativasCursar: [], correlativasFinal: [], tipo: 'obligatoria' },
    { id: 'semiologia', codigo: 'SEMIOLOGIA', nombre: 'Semiología', anio: 'CBC', tieneFinal: true, correlativasCursar: [], correlativasFinal: [], tipo: 'obligatoria' },
    // Al terminar el CBC hay que hacer el trámite de empadronamiento para activar el SIU de la carrera.

    // ── 1º Año ───────────────────────────────────────────────────────────
    { id: 'me1', codigo: 'ME1', nombre: 'Medios Exp.1', anio: 1, esAnual: true, tieneFinal: false, correlativasCursar: ['CBC'], correlativasFinal: [], tipo: 'obligatoria' },
    { id: 'fgdm', codigo: 'FGDM', nombre: 'FGDM', anio: 1, esAnual: true, tieneFinal: false, correlativasCursar: ['CBC'], correlativasFinal: [], tipo: 'obligatoria' },
    { id: 'ip', codigo: 'IP', nombre: 'IP', anio: 1, esAnual: true, tieneFinal: false, correlativasCursar: ['CBC'], correlativasFinal: [], tipo: 'obligatoria' },
    { id: 'adit1', codigo: 'ADIT1', nombre: 'ADIT1', anio: 1, tieneFinal: true, correlativasCursar: ['CBC'], correlativasFinal: ['CBC'], tipo: 'obligatoria' },
    { id: 'hdit1', codigo: 'HDIT1', nombre: 'HDIT1', anio: 1, tieneFinal: true, correlativasCursar: ['CBC'], correlativasFinal: ['CBC'], tipo: 'obligatoria' },
    { id: 'tpin1', codigo: 'TPIN1', nombre: 'TPIN1', anio: 1, tieneFinal: true, correlativasCursar: ['CBC'], correlativasFinal: ['CBC'], tipo: 'obligatoria' },
    { id: 'tpin2', codigo: 'TPIN2', nombre: 'TPIN2', anio: 1, tieneFinal: true, correlativasCursar: ['CBC', 'TPIN1'], correlativasFinal: ['TPIN1'], tipo: 'obligatoria' },

    // ── 2º Año ───────────────────────────────────────────────────────────
    { id: 'pi1', codigo: 'PI1', nombre: 'Proyecto Indum1', anio: 2, esAnual: true, tieneFinal: false, correlativasCursar: ['IP', 'ME1', 'FGDM', 'TPIN1'], correlativasFinal: [], tipo: 'obligatoria' },
    { id: 'mp', codigo: 'MP', nombre: 'MP', anio: 2, esAnual: true, tieneFinal: false, correlativasCursar: ['IP', 'ME1', 'FGDM', 'TPIN1'], correlativasFinal: [], tipo: 'obligatoria' },
    { id: 'me2', codigo: 'ME2', nombre: 'Medios Exp. 2', anio: 2, esAnual: true, tieneFinal: false, correlativasCursar: ['ME1'], correlativasFinal: [], tipo: 'obligatoria' },
    { id: 'tpi1', codigo: 'TPI1', nombre: 'TPI1', anio: 2, tieneFinal: true, correlativasCursar: ['TPIN1', 'IP', 'ME1'], correlativasFinal: ['TPIN2'], tipo: 'obligatoria' },
    { id: 'hdit2', codigo: 'HDIT2', nombre: 'HDIT2', anio: 2, tieneFinal: true, correlativasCursar: ['HDIT1'], correlativasFinal: ['HDIT1'], tipo: 'obligatoria' },
    { id: 'adit2', codigo: 'ADIT2', nombre: 'ADIT2', anio: 2, tieneFinal: true, correlativasCursar: ['ADIT1'], correlativasFinal: ['ADIT1'], tipo: 'obligatoria' },
    { id: 'tpi2', codigo: 'TPI2', nombre: 'TPI2', anio: 2, tieneFinal: true, correlativasCursar: ['TPI1', 'TPIN2'], correlativasFinal: ['TPI1'], tipo: 'obligatoria' },

    // ── 3º Año ───────────────────────────────────────────────────────────
    { id: 'pi2', codigo: 'PI2', nombre: 'Proyecto Indum2', anio: 3, esAnual: true, tieneFinal: false, correlativasCursar: ['PI1', 'MP', 'ME2', 'ADIT1', 'HDIT1', 'ME1', 'IP', 'FGDM'], correlativasFinal: ['TPI1'], tipo: 'obligatoria' },
    { id: 'pi3', codigo: 'PI3', nombre: 'Proyecto Indum3', anio: 3, esAnual: true, tieneFinal: false, correlativasCursar: ['PI2', 'PI1', 'TPI1', 'ME2', 'ADIT1', 'HDIT1', 'MP'], correlativasFinal: ['TPI2'], tipo: 'obligatoria' },
    { id: 'pa1', codigo: 'PA1', nombre: 'Proy Accesorios 1', anio: 3, esAnual: true, tieneFinal: false, correlativasCursar: ['PI2', 'PI1', 'MP', 'ME2', 'ME1', 'ADIT1', 'HDIT1'], correlativasFinal: ['TPI1'], tipo: 'obligatoria' },
    { id: 'socio', codigo: 'SOCIO', nombre: 'Socio', anio: 3, tieneFinal: true, correlativasCursar: ['IP', 'ME1', 'TPIN2'], correlativasFinal: ['ADIT1', 'HDIT1'], tipo: 'obligatoria' },
    { id: 'cym1', codigo: 'CYM1', nombre: 'CyM1', anio: 3, tieneFinal: true, correlativasCursar: [...TODO_1_ANIO], correlativasFinal: ['TPI1', 'HDIT2'], tipo: 'obligatoria' },
    { id: 'tpi3', codigo: 'TPI3', nombre: 'TPI3', anio: 3, tieneFinal: true, correlativasCursar: [...TODO_1_ANIO], correlativasFinal: ['TPI2'], tipo: 'obligatoria' },
    { id: 'tpi4', codigo: 'TPI4', nombre: 'TPI4', anio: 3, tieneFinal: true, correlativasCursar: [...TODO_1_ANIO], correlativasFinal: ['TPI3'], tipo: 'obligatoria' },
    { id: 'cym2', codigo: 'CYM2', nombre: 'CyM2', anio: 3, tieneFinal: true, correlativasCursar: ['CYM1', 'TPI1', 'HDIT2'], correlativasFinal: ['CYM1', 'TPI1', 'HDIT2'], tipo: 'obligatoria' },
    { id: 'cycritica', codigo: 'CYCRITICA', nombre: 'CyCrítica', anio: 3, tieneFinal: true, correlativasCursar: ['PI1', 'IP', 'ME1', 'FGDM', 'ADIT2', 'ADIT1', 'TPIN1'], correlativasFinal: ['ADIT2', 'ADIT1'], tipo: 'obligatoria' },

    // ── 4º Año ───────────────────────────────────────────────────────────
    { id: 'pi4', codigo: 'PI4', nombre: 'Proyecto Indum4', anio: 4, esAnual: true, tieneFinal: false, correlativasCursar: ['PI3', 'PI2', 'PI1', 'TPI1', 'TPI2'], correlativasFinal: ['TPI3'], tipo: 'obligatoria' },
    { id: 'pa2', codigo: 'PA2', nombre: 'Proy.Accesorios2', anio: 4, esAnual: true, tieneFinal: false, correlativasCursar: ['PA1', 'PI2', 'PI1'], correlativasFinal: [], tipo: 'obligatoria' },
    { id: 'tfc', codigo: 'TFC', nombre: 'TFC', anio: 4, esAnual: true, tieneFinal: false, correlativasCursar: [...TODO_3_ANIO, 'PI4'], correlativasFinal: [], tipo: 'obligatoria' },
    { id: 'ppa', codigo: 'PPA', nombre: 'PPA', anio: 4, esAnual: true, tieneFinal: false, correlativasCursar: [...TODO_3_ANIO], correlativasFinal: [], tipo: 'obligatoria' },
    { id: 'optativa1', codigo: 'OPT1', nombre: 'Optativa 1', anio: 4, tieneFinal: true, correlativasCursar: ['PI2', 'PI1', 'MP', 'ME2', 'ADIT1', 'HDIT1', 'ME1', 'IP', 'FGDM'], correlativasFinal: [], tipo: 'optativa' },
    { id: 'optativa2', codigo: 'OPT2', nombre: 'Optativa 2', anio: 4, tieneFinal: true, correlativasCursar: ['PI2', 'PI1', 'MP', 'ME2', 'ADIT1', 'HDIT1', 'ME1', 'IP', 'FGDM'], correlativasFinal: [], tipo: 'optativa' },
    { id: 'eticap', codigo: 'ETICAP', nombre: 'ÉticaP.', anio: 4, tieneFinal: true, correlativasCursar: [...TODO_1_ANIO, 'HDIT2'], correlativasFinal: ['HDIT2'], tipo: 'obligatoria' },
  ],
};