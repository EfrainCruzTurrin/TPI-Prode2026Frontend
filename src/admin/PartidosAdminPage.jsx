import { useEffect, useState } from "react";
import { getEquipos, getFechas, getPartidos, createPartido, updatePartido } from "../api";
import { useNavigate } from "react-router-dom";
import "./PartidosAdminPage.css";

const ESTADO_LABEL = {
  POR_JUGARSE: "🕒 Por jugarse",
  EN_JUEGO: "🟢 En juego",
  FINALIZADO: "🏁 Finalizado",
};

const initialForm = {
  fechaId: "",
  equipoLocalId: "",
  equipoVisitanteId: "",
  fechaHoraInicio: "",
};

export default function PartidosAdminPage() {
  const [partidos, setPartidos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [fechas, setFechas] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    cargarTodo();
  }, []);

  const cargarTodo = async () => {
    try {
      const [eqRes, fechaRes, partidoRes] = await Promise.all([
        getEquipos(),
        getFechas(),
        getPartidos(),
      ]);
      setEquipos(eqRes.data);
      setFechas(fechaRes.data);
      setPartidos(partidoRes.data);
    } catch {
      setError("Error al cargar los datos.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleCrear = async (e) => {
    e.preventDefault();

    if (!form.fechaId || !form.equipoLocalId || !form.equipoVisitanteId || !form.fechaHoraInicio) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (form.equipoLocalId === form.equipoVisitanteId) {
      setError("El equipo local y el equipo visitante no pueden ser el mismo.");
      return;
    }

    setLoading(true);
    try {
      // datetime-local devuelve hora local sin zona; lo convertimos a UTC (ISO) para el backend
      const fechaHoraUTC = new Date(form.fechaHoraInicio).toISOString();

      await createPartido({
        fechaId: Number(form.fechaId),
        equipoLocalId: Number(form.equipoLocalId),
        equipoVisitanteId: Number(form.equipoVisitanteId),
        fechaHoraInicio: fechaHoraUTC,
      });

      setSuccess("Partido creado correctamente.");
      setForm(initialForm);
      cargarTodo();
    } catch (err) {
      const detail = err.response?.data?.detail || err.response?.data?.message;
      const errores = err.response?.data?.errors;
      if (errores && errores.length > 0) {
        setError(errores.join(" | "));
      } else {
        setError(detail || "Error al crear el partido.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleIniciar = async (partido) => {
    if (!confirm(`¿Marcar el partido ${partido.equipoLocalNombre} vs ${partido.equipoVisitanteNombre} como "En juego"?`)) return;
    try {
      await updatePartido(partido.id, { estado: "EN_JUEGO" });
      setSuccess("Partido actualizado a 'En juego'.");
      cargarTodo();
    } catch (err) {
      const detail = err.response?.data?.detail || err.response?.data?.message;
      setError(detail || "Error al actualizar el partido.");
    }
  };

  const formatFecha = (iso) => {
    if (!iso) return "-";
    return new Date(iso).toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="admin-header-left">
          <img src="/logo2026.png" alt="Logo" className="admin-logo" />
          <h1 className="admin-title">⚔️ Gestión de Partidos</h1>
        </div>
        <button className="btn-volver" onClick={() => navigate("/home")}>
          ← Volver
        </button>
      </div>

      {/* Formulario alta */}
      <div className="admin-card">
        <h2 className="card-title">➕ Nuevo Partido</h2>
        <form onSubmit={handleCrear} className="partido-form">
          <select
            name="fechaId"
            value={form.fechaId}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Fecha / Jornada *</option>
            {fechas.map((f) => (
              <option key={f.id} value={f.id}>
                {f.nombre}
              </option>
            ))}
          </select>

          <select
            name="equipoLocalId"
            value={form.equipoLocalId}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Equipo Local *</option>
            {equipos.map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.nombre}
              </option>
            ))}
          </select>

          <select
            name="equipoVisitanteId"
            value={form.equipoVisitanteId}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Equipo Visitante *</option>
            {equipos.map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.nombre}
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            name="fechaHoraInicio"
            value={form.fechaHoraInicio}
            onChange={handleChange}
            className="input-field"
          />

          <button type="submit" className="btn-crear" disabled={loading}>
            {loading ? "Creando..." : "Crear Partido"}
          </button>
        </form>

        {error && <p className="msg-error">⚠ {error}</p>}
        {success && <p className="msg-success">✔ {success}</p>}
      </div>

      {/* Tabla de partidos */}
      <div className="admin-card">
        <h2 className="card-title">📋 Partidos Registrados ({partidos.length})</h2>
        {partidos.length === 0 ? (
          <p className="msg-vacio">No hay partidos registrados aún.</p>
        ) : (
          <table className="partidos-tabla">
            <thead>
              <tr>
                <th>#</th>
                <th>Fecha/Jornada</th>
                <th>Local</th>
                <th></th>
                <th>Visitante</th>
                <th>Inicio</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {partidos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.fechaNombre}</td>
                  <td>{p.equipoLocalNombre}</td>
                  <td className="vs-cell">vs</td>
                  <td>{p.equipoVisitanteNombre}</td>
                  <td>{formatFecha(p.fechaHoraInicio)}</td>
                  <td>
                    <span className={`badge-estado badge-${p.estado?.toLowerCase()}`}>
                      {ESTADO_LABEL[p.estado] || p.estado}
                    </span>
                  </td>
                  <td>
                    {p.estado === "POR_JUGARSE" ? (
                      <button className="btn-iniciar" onClick={() => handleIniciar(p)}>
                        ▶ Iniciar
                      </button>
                    ) : (
                      <span className="msg-vacio">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}