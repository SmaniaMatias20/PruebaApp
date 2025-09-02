import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { Database } from '../database/database';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private supabase: SupabaseClient;
  user = signal<User | boolean>(false);
  router = inject(Router);

  /**
   * Constructor del servicio de autenticación.
   * 
   * Este constructor inicializa el servicio de autenticación, configura el cliente de Supabase a través del servicio `DatabaseService`,
   * y verifica si hay una sesión activa al invocar el método `checkSession()`.
   * 
   * Además, se suscribe a los cambios de estado de autenticación mediante `onAuthStateChange` para gestionar el estado del usuario
   * y su sesión en el cliente (por ejemplo, si el usuario se desconecta o la sesión expira).
   * 
   * @param {Database} db - El servicio de base de datos que proporciona el cliente de Supabase.
   */
  constructor(private db: Database) {
    this.supabase = this.db.client;
  }

  /**
   * Devuelve el usuario actual desde el estado reactivo.
   * @returns {User | boolean} Usuario autenticado o false si no hay sesión
   */
  getUser(): User | boolean {
    return this.user();
  }

  /**
   * Inicia sesión con email y contraseña, y carga los datos del usuario desde la tabla 'users'.
   * 
   * @param {string} email - Correo electrónico del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<{ success: boolean; message: string }>} Resultado de la operación
   */
  async login(email: string, password: string): Promise<{ success: boolean; message: string }> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      return { success: false, message: 'Credenciales inválidas.' };
    }

    this.router.navigate(['/home'], { replaceUrl: true });
    return { success: true, message: 'Inicio de sesión exitoso.' };
  }

  /**
   * Cierra la sesión del usuario actual, limpia el almacenamiento local y redirige al home.
   * 
   * @returns {Promise<{ success: boolean; message: string }>} Resultado de la operación
   */
  async logout(): Promise<{ success: boolean; message: string }> {
    try {
      const { error } = await this.supabase.auth.signOut();

      if (error) {
        return { success: false, message: error.message };
      }

      this.router.navigate(['/auth'], { replaceUrl: true });

      return { success: true, message: 'Sesión cerrada correctamente.' };
    } catch (error) {
      return { success: false, message: 'Error al cerrar la sesión.' };
    }
  }

  /**
   * Registra un nuevo usuario y guarda sus datos adicionales en la tabla 'users'.
   * Luego intenta iniciar sesión automáticamente.
   * 
   * @param {string} email - Correo electrónico del nuevo usuario
   * @param {string} password - Contraseña del nuevo usuario
   * @param {{ firstName: string; lastName: string; age: number }} extraData - Datos adicionales
   * @returns {Promise<{ success: boolean; message: string }>} Resultado de la operación
   */
  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    age: number
  ): Promise<{ success: boolean; message: string }> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return { success: false, message: error.message };
    }

    const user = data.user;

    if (!user) {
      return { success: false, message: 'No se pudo obtener el usuario después del registro.' };
    }

    const { error: insertError } = await this.supabase.from('users').insert([
      {
        id: user.id,
        firstname: firstName,
        lastname: lastName,
        age: age,
      },
    ]);

    if (insertError) {
      return { success: false, message: 'Registro fallido al guardar los datos.' };
    }

    // const loginResult = await this.login(email, password);
    // if (!loginResult.success) {
    //   return { success: false, message: 'Usuario registrado pero no pudo iniciar sesión automáticamente.' };
    // }

    return {
      success: true,
      message: 'Registro y login exitoso.',
    };
  }

}
