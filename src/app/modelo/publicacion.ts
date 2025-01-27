export interface Publicacion {
    id?: number; // El id es opcional, por eso se usa '?'
    titulo: string;
    descripcion: string;
    fecha: String;
    foto?: string; // La foto es opcional, por eso se usa '?'
  }
  