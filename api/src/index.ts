import { Hono } from 'hono'
import { userController } from './router/main'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/', userController);

export default app