import { Request, Response } from 'express';
import { db } from './index';
import puppeteer from 'puppeteer';

export const endpointTeste = async(req: Request, res: Response) => {
    try {
      console.log('Entrou na função');
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://lolja.com.br/');
      // const hrefElement = await page.$('div');
      console.log('Entrou na página');
      const pageContent = await page.evaluate(() => {
        return {
          // subtitle: document.querySelector('#SIvCob')?.textContent
          content1: document.querySelector(".nav-upper a")?.innerHTML,
          content2: document.querySelector(".nav-upper a")?.textContent,
        }
      });
      console.log('Dados retirados da página:', pageContent.content1);
      await browser.close();

      console.log('inseriu dados na collection');
      await db.collection('teste').doc().set({
        pageContent1: pageContent.content1,
        pageContent2: pageContent.content2,
      })
  
      res.status(200).send({
        message: 'Conteúdo retirado com sucesso',
        pageContent1: pageContent.content1,
        pageContent2: pageContent.content2,
      })
    } catch (err) {
      res.status(400).send({
        message: err.message,
      })
    }
}