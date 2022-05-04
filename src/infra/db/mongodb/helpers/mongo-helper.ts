import { MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL ?? 'null')
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  }
}
