import express from 'express'
import { PORT, SECRET_JWT_KEY } from './config.js'
import { UserRepository } from './user-repository.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

const app = express()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)
    req.session.user = data
  } catch {}

  next()
})

app.get('/', (request, response) => {
  console.log('Petición recibida')
  const { user } = request.session
  response.render('index', { username: user?.username })
})

app.post('/login', async (request, response) => {
  const { username, password } = request.body
  try {
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign({ id: user._id, username: user.username },
      SECRET_JWT_KEY,
      {
        expiresIn: '1h'
      })
    response
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60
      })
      .send({ user, token })
  } catch (error) {
    response.status(401).send(error.message)
  }
})
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body

    // Crear el usuario en la base de datos
    const newUser = await UserRepository.create({ username, password })

    // Crear el token JWT usando el nuevo ID y username
    const token = jwt.sign({ id: newUser._id, username: newUser.username }, SECRET_JWT_KEY, {
      expiresIn: '1h' // Duración del token
    })

    // Guardar el token en las cookies como en el login
    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Sólo seguro en producción
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 // Duración de la cookie de 1 hora
      })
      .status(200)
      .json({ user: newUser, token }) // Devuelve el usuario y el token en el response
  } catch (error) {
    // Enviar el mensaje de error al frontend
    res.status(400).json({ error: error.message })
  }
})

app.post('/logout', (request, response) => {
  response
    .clearCookie('access_token')
    .json({ message: 'Has salido correctamente' })
})

app.get('/protected', (request, response) => {
  const { user } = request.session
  if (!user) return response.status(403).send('Acceso no autorizado')

  response.render('protected', user)
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
