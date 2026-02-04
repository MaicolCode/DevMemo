# 🛠️ Log de Refactorización y Desarrollo - DevMemo

Este documento sirve como bitácora para registrar todos los cambios importantes, correcciones de errores (bugs) y mejoras realizadas durante el proceso de refactorización.

---

## 📝 Guía de Registro
Para mantener la consistencia, usa el siguiente formato para nuevas entradas:

### [FECHA] - [TÍTULO CORTO DEL CAMBIO]
- **Tipo**: `Refactor` | `Bugfix` | `Feature` | `Docs`
- **Descripción**: Breve explicación de qué se hizo.
- **Antes**: (Opcional) Cómo estaba el código o qué problema había.
- **Después**: Cómo quedó o cómo se solucionó.
- **Notas**: Detalles técnicos relevantes o dependencias añadidas.

---

## 🚀 Entradas Recientes

### 2026-02-04 - Diseño Final de la Estructura de BD (4 Tablas)
- **Tipo**: `Refactor` / `Design`
- **Descripción**: Se simplificó el modelo de datos a 4 entidades clave: `notes`, `tags`, `languages` y `categories`.
- **Antes**: Se planteaba una estructura con tablas de unión redundantes para categorías.
- **Después**: 
    - `notes` centraliza la información.
    - `languages` y `categories` se manejan como relaciones 1:N (una nota -> una categoría/lenguaje).
    - `tags` se mantiene como N:M (usando `note_tags`) para máxima flexibilidad.
- **Notas**: Se eliminó la tabla `users` local delegando todo a Clerk para simplificar el backend.


---

## 🐛 Bugs Solucionados (Histórico)
*Lista rápida de errores críticos corregidos.*

1.  (Ejemplo) Error de hidratación en `Layout.tsx` - Corregido el 2026-02-04.

---

## 💡 Ideas / Mejoras Pendientes (Backlog)
*Cosas que queremos hacer pero aún no empezamos.*

- [ ] Optimizar el rendimiento de las imágenes con Next/Image.
- [ ] Implementar animaciones de transición entre páginas.
