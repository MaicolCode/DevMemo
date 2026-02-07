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
*Sin errores o bugs encontrados*

---

## 💡 Ideas / Mejoras Pendientes (Backlog)
*Cosas que queremos hacer pero aún no empezamos.*

- [ ] Mejorar la tabla de notas debido a que falta una sección para guardar las notas de código
- [x] Hacer uso de server actions de NextJS para las consultas a la base de datos e interacción con los datos que se registraran en Supabase.
- [ ] Crear las rutas para la creación de notas, actualización y eliminación de notas.
- [x] Crear las rutas para la creación de los tags, actualización y eliminación de tags.
- [ ] Crear las rutas para la creación de las categorías, actualización y eliminación de categorías.

### 2026-02-06 - Refactorización del formulario para la creación de los tags
- **Tipo**: `Refactor`
- **Descripción**: Se refactoriza la forma de crear los tags dentro del formulario de creación de notas. Se hace uso de server actions para que next js se encargue de hacer las peticiones a la base de datos.
- **Antes**: El formulario unicamente contaba con un input en el cual se ingresaba un string con los tags separados por comas.
- **Después**: Se implementa un input de tipo `text` que permite ingresar el nombre del tag y un botón para agregarlo a la lista de tags.
- **Notas**: Se elimino el anterior input de tags y se implemento un componente mejorado en el cual el usuario podra ver los tags creados y eliminarlos si es necesario.


---

## 🐛 Bugs Solucionados (Histórico)
*Sin errores o bugs encontrados*

---

## 💡 Ideas / Mejoras Pendientes (Backlog)
*Cosas que queremos hacer pero aún no empezamos.*

- [ ] Guardar una nota con las etiquetas creadas.
- [ ] Crear la acción correspondiente para el almacenamiento de la nota junto con las etiquetas.
