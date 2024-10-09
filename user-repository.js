import DBLocal from 'db-local'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from './config.js'

const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export class UserRepository {
  // Método para crear un nuevo usuario
  static async create ({ username, password }) {
    // Validar username y password
    Validation.username(username)
    Validation.password(password)

    // Comprobar si el usuario ya existe
    const existingUser = User.findOne({ username })
    if (existingUser) throw new Error('Ya existe el usuario, cámbialo')

    // Generar un ID único para el usuario y hashear la contraseña
    const id = crypto.randomUUID()
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    // Crear y guardar el nuevo usuario en la base de datos
    const newUser = User.create({
      _id: id,
      username,
      password: hashedPassword
    }).save()

    // Devolver el objeto completo del usuario, sin la contraseña
    const { password: _, ...publicUser } = newUser
    return publicUser
  }

  // Método para login
  static async login ({ username, password }) {
    // Validar username y password
    Validation.username(username)
    Validation.password(password)

    // Buscar el usuario por username
    const user = User.findOne({ username })
    if (!user) throw new Error('No existe')

    // Comparar la contraseña ingresada con la almacenada
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('No coinciden las contraseñas')

    // Devolver los datos del usuario sin la contraseña
    const { password: _, ...publicUser } = user
    return publicUser
  }
}

class Validation {
  // Validación de username
  static username (username) {
    if (typeof username !== 'string') throw new Error('Escríbelo bien')
    if (username.length < 3) throw new Error('Debe ser más largo')
  }

  // Validación de password
  static password (password) {
    if (typeof password !== 'string') throw new Error('Escríbelo bien')
    if (password.length < 8) throw new Error('Añade más carácteres')
  }
}
