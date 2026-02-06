# Estructura de la base de datos

La base de datos de **DevMemo** está diseñada para ser eficiente y fácil de consultar. Se centra en 4 entidades principales:

---

## 🏗️ Tablas Principales

### 1. `code_notes` (La entidad central)
Almacena el contenido principal de tus notas o snippets.
- `id`: UUID (Primary Key) - Identificador único.
- `title`: VARCHAR(255) - Título de la nota.
- `code`: TEXT - El código generado por el usuario.
- `description`: TEXT - Descripción de lo que hace el código.
- `explanation`: TEXT - Explicación detallada o contexto.
- `solution`: TEXT - La solución o mejora aplicada.
- `language`: VARCHAR(100) - Lenguaje de programación.
- `tags`: JSONB/TEXT[] - Etiquetas de la nota.
- `user_id`: VARCHAR(255) - ID de Clerk para vincular la nota al usuario.
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### 2. `languages`
Catálogo de lenguajes de programación para habilitar el resaltado de sintaxis.
- `id`: UUID (Primary Key)
- `name`: VARCHAR(100) (Ej: "JavaScript", "Python", "SQL")
- `slug`: VARCHAR(100) (Ej: "javascript", "python")

### 3. `categories`
Organización de alto nivel.
- `id`: UUID (Primary Key)
- `name`: VARCHAR(100) (Ej: "Frontend", "Backend", "Despliegue")

### 4. `tags`
Etiquetas flexibles para búsqueda transversal.
- `id`: UUID (Primary Key)
- `name`: VARCHAR(50) (Ej: "util", "fix", "importante")

---

## 🔗 Relaciones y Tablas de Unión

Para mantener la integridad y flexibilidad, utilizaremos las siguientes relaciones:

1. **Nota ↔ Lenguaje**: Una nota pertenece a **un** lenguaje (Many-to-One).
2. **Nota ↔ Categoría**: Una nota pertenece a **una** categoría (Many-to-One).
3. **Nota ↔ Etiquetas**: Una nota puede tener **muchas** etiquetas y una etiqueta puede estar en muchas notas (Many-to-Many).

### `note_tags` (Tabla de unión)
Necesaria solo para la relación Many-to-Many de los tags.
- `note_id`: UUID (FK a `notes`)
- `tag_id`: UUID (FK a `tags`)

---

## 📈 Resumen del Modelo
| Tabla | Relación con `notes` | ¿Por qué? |
| :--- | :--- | :--- |
| `languages` | 1:N | Cada snippet suele ser de un solo lenguaje principal. |
| `categories` | 1:N | Mantiene el dashboard limpio y organizado por áreas. |
| `tags` | N:M | Permite una clasificación libre y múltiple. |
