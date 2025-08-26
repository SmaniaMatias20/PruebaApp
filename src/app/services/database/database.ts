import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class Database {
  supabase: SupabaseClient<any, "public", any>;

  /**
   * Constructor de la clase DatabaseService.
   * 
   * Este constructor inicializa la conexión a Supabase utilizando las credenciales definidas en el archivo de configuración del entorno.
   */
  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

  /**
   * Getter para acceder al cliente de Supabase.
   * 
   * @returns {SupabaseClient} El cliente de Supabase.
   */
  get client(): SupabaseClient {
    return this.supabase;
  }


  /**
   * Obtiene los datos de un usuario por su ID.
   * 
   * @param {string | null} userId - El ID del usuario.
   * @returns {Promise<{ firstname: string, lastname: string } | null>} Los datos del usuario (nombre y apellido), o null si no se encuentra.
   */
  async getUserById(userId: string | null): Promise<{ firstname: string, lastname: string } | null> {
    const { data, error } = await this.supabase
      .from('users')
      .select('firstname, lastname')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error al obtener datos del usuario:', error);
      return null;
    }

    return data ? { firstname: data.firstname, lastname: data.lastname } : null;
  }

}
