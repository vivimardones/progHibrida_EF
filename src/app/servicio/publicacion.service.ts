import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Publicacion } from '../modelo/publicacion';

@Injectable({
  providedIn: 'root'
})

export class PublicacionService {
  sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  db!: SQLiteDBConnection  ;
  plataforma: string = ""
  DB_NAME: string = 'AVISOSDB';
  TABLE_NAME: string = "AVISOS";
  DB_ENCRIPTADA: boolean = false;
  DB_MODE: string = 'no-encryption';
  DB_VERSION: number = 1;
  DB_READ_ONLY: boolean = false;
  DB_SQL_TABLAS: string = `CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    fecha TEXT NOT NULL,
    foto TEXT);`;
  constructor() {}

  private async _iniciarPluginWeb(): Promise<void> {
    await customElements.whenDefined('jeep-sqlite');
    const jeepSqliteEl = document.querySelector('jeep-sqlite');
    if (jeepSqliteEl != null) {
      await this.sqlite.initWebStore();
    }
  }
  async iniciarPlugin() {    
    this.plataforma = Capacitor.getPlatform()
    if(this.plataforma == "web") {
      await this._iniciarPluginWeb()
    }
    await this.abrirConexion()
    await this.db.execute(this.DB_SQL_TABLAS)             
}

async abrirConexion() {                    
  const ret = await this.sqlite.checkConnectionsConsistency() 
  const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result
  if(ret.result && isConn) {
    this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY)      
  } else {
    this.db = await this.sqlite.createConnection(
      this.DB_NAME,
      this.DB_ENCRIPTADA,
      this.DB_MODE,
      this.DB_VERSION,
      this.DB_READ_ONLY
    )
  }
  await this.db.open()
}

async getPublicaciones(): Promise<Publicacion[]> {
  const sql = `SELECT * FROM ${this.TABLE_NAME};`;
  const ret = await this.db.query(sql);
  return ret.values ?? [];
}

async addPublicacion(publicacion: Publicacion) {
  const sql = `INSERT INTO ${this.TABLE_NAME} (titulo, descripcion, fecha, foto) VALUES (?, ?, ?, ?);`;
  await this.db.run(sql, [publicacion.titulo, publicacion.descripcion, publicacion.fecha, publicacion.foto]);
}

async deletePublicacion(index: number) {
  const sql = `DELETE FROM ${this.TABLE_NAME} WHERE id = ?;`;
  await this.db.run(sql, [index]);
}
 
  obtenerFechaActual(): Date {
    return new Date();
    
  }
}
