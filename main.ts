import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { nanoid } from 'nanoid'

const fastify = Fastify({ logger: true })

const url_map:{[key:string]:string} = {}

fastify.get('/:id', async (request:FastifyRequest, reply:FastifyReply) => {
  const gotoId = (request.params as any).id
  if(!url_map[gotoId]){
    return {
      error:`link with id=${gotoId} not found`
    }
  }
  reply.redirect(301, url_map[gotoId])
})

fastify.post('/', async (request:any, reply:any) => {
    const newId = nanoid(5)
    
    url_map[newId] = request.body

    return `/${newId}`
})

  const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()