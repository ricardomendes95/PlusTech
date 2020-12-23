import { IpcMainEvent } from 'electron'
import { getRepository } from 'typeorm'
import Pool from '../models/Pool'

export async function create(route: string, event: IpcMainEvent, name: string) {
  try {
    if (!name) {
      event.reply(route, { success: false, error: 'Nome é obrigatório' })
      return
    }

    const poolRepository = getRepository(Pool)

    const pool = poolRepository.create({ name })

    await poolRepository.save(pool)

    event.reply(route, { success: true, data: 'pool' })
  } catch (error) {
    console.log(error)
    event.reply(route, { success: false, error })
  }
}
