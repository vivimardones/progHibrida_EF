import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Citas } from '../modelo/citas';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  db!: SQLiteDBConnection  ;
  plataforma: string = ""
  DB_NAME: string = 'citasDB';
  TABLE_NAME: string = "citas";
  DB_ENCRIPTADA: boolean = false;
  DB_MODE: string = 'no-encryption';
  DB_VERSION: number = 1;
  DB_READ_ONLY: boolean = false;
  DB_SQL_TABLAS: string = `CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    frase TEXT NOT NULL,
    autor TEXT NOT NULL);`;

  // private citas: {
  //   frase: string;
  //   autor: string;
    
  // }[] = [
  //   {
  //     frase:
  //       'La vida es lo que pasa mientras estás ocupado haciendo otros planes.',
  //     autor: 'John Lennon',
  //   },
  //   {
  //     frase:
  //       'El éxito es la capacidad de ir de fracaso en fracaso sin perder el entusiasmo.',
  //     autor: 'Winston Churchill',
  //   },
  // ];

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

  async getCitaAleatoria() {
    const citas = await this.getCitas();
    const indiceAleatorio = Math.floor(Math.random() * citas.length);
    return citas[indiceAleatorio];
  }

  async getCitas(): Promise<Citas[]> {
    const sql = `SELECT * FROM ${this.TABLE_NAME}`;
    const result = await this.db.query(sql)
    return result?.values ?? []

  }

  async addCitas(cita: Citas) {
    const sql = `INSERT INTO ${this.TABLE_NAME} (frase, autor) VALUES (?, ?)`;
    await this.db.run(sql, [cita.frase, cita.autor])
  }

  async deleteCitas(index: number) {
    const sql = `DELETE FROM ${this.TABLE_NAME} WHERE id = ?`;
    await this.db.run(sql, [index])
  }
}
