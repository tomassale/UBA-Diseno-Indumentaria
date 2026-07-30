import { useState } from 'react';
import { Sun, Moon, FlaskConical, Download, Eraser, Menu, LogOut } from 'lucide-react';
import type { Carrera, EstadoMateria } from '../types';
import { computeStats, getEstadoColors } from '../utils/estados';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { IconGoogle } from './SocialIcons';

interface HeaderProps {
  carrera: Carrera;
  estadosEfectivos: Record<string, EstadoMateria>;
  view: 'mapa' | 'tabla';
  onViewChange: (v: 'mapa' | 'tabla') => void;
  simMode: boolean;
  onToggleSim: () => void;
  onExport: () => void;
  onClearProgreso: () => void;
}

export function Header({ carrera, estadosEfectivos, view, onViewChange, simMode, onToggleSim, onExport, onClearProgreso }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { status: authStatus, user, syncConfigured, login, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const EC = getEstadoColors(theme);
  const s = computeStats(carrera.materias, estadosEfectivos);
  const pct = s.total > 0 ? Math.round((s.aprobadas / s.total) * 100) : 0;

  function runAndClose(fn: () => void) {
    fn();
    setMenuOpen(false);
  }

  return (
    <header className="app-header">
      <div className="hdr-left">
        <button className="hdr-logo-btn" onClick={() => onViewChange('mapa')} title="Ir al mapa">
          <img src="/icon.png" alt="FADU Organizer" className="hdr-logo-img" />
        </button>
        <div className="hdr-career-info">
          <span className="hdr-career-name">{carrera.nombre}</span>
          <span className="hdr-career-plan">Plan {carrera.plan}</span>
        </div>
      </div>

      <div className="hdr-center">
        <div className="hdr-progress-text">
          <span className="hdr-prog-count">{s.aprobadas}</span>
          <span className="hdr-prog-total"> / {s.total} materias aprobadas</span>
          <span className="hdr-prog-pct">({pct}%)</span>
        </div>
        <div className="hdr-progress-bar">
          <div className="hdr-progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="hdr-pills">
          {s.cursando > 0 && (
            <span className="hdr-pill" style={{ background: EC.cursando.bg, color: EC.cursando.text, borderColor: EC.cursando.border }}>
              {s.cursando} cursando
            </span>
          )}
          {s.regularizadas > 0 && (
            <span className="hdr-pill" style={{ background: EC.regularizada.bg, color: EC.regularizada.text, borderColor: EC.regularizada.border }}>
              {s.regularizadas} regularizadas
            </span>
          )}
          <span className="hdr-pill" style={{ background: EC.disponible.bg, color: EC.disponible.text, borderColor: EC.disponible.border }}>
            {s.disponibles} disponibles
          </span>
        </div>
      </div>

      <div className="hdr-right">
        <div className="view-toggle">
          <button
            className={`view-btn${view === 'mapa' ? ' active' : ''}`}
            onClick={() => runAndClose(() => onViewChange('mapa'))}
          >
            Mapa
          </button>
          <button
            className={`view-btn${view === 'tabla' ? ' active' : ''}`}
            onClick={() => runAndClose(() => onViewChange('tabla'))}
          >
            Tabla
          </button>
        </div>

        {menuOpen && <div className="hdr-menu-backdrop" onClick={() => setMenuOpen(false)} />}

        <div className={`hdr-actions${menuOpen ? ' hdr-actions--open' : ''}`}>
          <button
            className="io-btn"
            onClick={() => runAndClose(onExport)}
            disabled={view !== 'mapa'}
            title={view === 'mapa' ? 'Exportar el mapa de correlativas como imagen' : 'Cambiá a la vista Mapa para exportar una imagen'}
          >
            <Download size={15} />
            Exportar
          </button>
          <button
            className="io-btn"
            onClick={() => runAndClose(() => {
              if (confirm('¿Limpiar toda la vista? Se borrará el estado y las notas de todas las materias. No se puede deshacer.')) onClearProgreso();
            })}
            title="Borrar todo el progreso cargado (estados y notas)"
          >
            <Eraser size={15} />
            Limpiar
          </button>
          <button
            className={`sim-btn${simMode ? ' sim-btn--active' : ''}`}
            onClick={() => runAndClose(onToggleSim)}
            title={simMode ? 'Salir del modo simulación' : 'Simular avance académico'}
          >
            <FlaskConical size={15} />
            {simMode ? 'Salir simulación' : 'Simular'}
          </button>
          <button className="icon-btn" onClick={() => runAndClose(toggleTheme)} title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}>
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            <span className="icon-btn-label">{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span>
          </button>
          {syncConfigured && (
            authStatus === 'logged-in' && user ? (
              <button
                className="auth-btn"
                onClick={() => runAndClose(() => { if (confirm('¿Cerrar sesión de Google? Tu progreso sigue guardado en la nube.')) logout(); })}
                title={`${user.name} (${user.email}) — Cerrar sesión`}
              >
                <img src={user.picture} alt="" className="auth-avatar" referrerPolicy="no-referrer" />
                <LogOut size={13} />
              </button>
            ) : (
              <button
                className="io-btn"
                onClick={() => runAndClose(login)}
                disabled={authStatus === 'logging-in'}
                title="Guardar tu progreso en Google Drive y sincronizarlo entre dispositivos"
              >
                <IconGoogle size={14} />
                {authStatus === 'logging-in' ? 'Conectando…' : 'Iniciar sesión'}
              </button>
            )
          )}
        </div>

        <button className="hdr-hamburger-btn" onClick={() => setMenuOpen(o => !o)} title="Más opciones">
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
}
