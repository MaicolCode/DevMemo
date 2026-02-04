# Supabase 
Para la parte de administración de datos vamos hacer uso de supabase, la cual nos ofrece una base de datos relacional, autenticación y almacenamiento de archivos.

## Variables de entorno
- `NEXT_PUBLIC_SUPABASE_URL`: URL de la base de datos.
[TODO: Agregar URL de la base de datos]
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Clave pública de la base de datos.
[TODO: Agregar clave pública de la base de datos]
- `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY`: Clave privada de la base de datos.
[TODO: Agregar clave privada de la base de datos]

## Consola SQL 
La consola SQL nos permite ejecutar consultas SQL en la base de datos. Para acceder a la consola SQL debemos ir a la sección de SQL Editor en la consola de Supabase.

- Para esta ocasión usamos la consola de supabase para crear la estructura de la base de datos. (Creación de las tablas, inserción de datos, etc.)


# Next JS
Next.js es un framework de React que nos permite crear aplicaciones web de forma rápida y eficiente. 

## Server actions
Los server actions son funciones que se ejecutan del lado del servidor.

- Para esta ocasión usamos los server actions para crear, actualizar y eliminar notas.

```
'use server' //<-- Menciona que la funcion se ejecutara en el lado del servidor.
export async function createNoteAction(formData: FormData) {
  const title = formData.get('title');
  // ... lógica para guardar en Supabase directamente ...
  // Puedes usar revalidatePath para actualizar la UI al instante
}
...
```

Para que esto funcione el archivo que contiene la lógica debe de mencionar que se va a usar del lado del servidor como se muestra en el anterior ejemplo.

### Uso del server action

```
<form action={createNoteAction}>
  <input type="text" name="title" />
  <button type="submit">Crear</button>
</form>
```