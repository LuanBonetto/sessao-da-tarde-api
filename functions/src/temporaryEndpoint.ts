import { Request, Response } from 'express';
import { db } from './index';


export const endpointTeste = async(req: Request, res: Response) => {
    try {
  
      await db.collection('teste').doc().set({
        nome: 'Luan',
        sobrenome: 'Bonetto'
      })
  
      res.status(200).send({
        message: 'Hello World',
      })
    } catch (err) {
      res.status(400).send({
        message: err.message,
      })
    }
}