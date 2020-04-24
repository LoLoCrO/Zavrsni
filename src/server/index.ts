import express from 'express';
import next from 'next';
import parseArgs from 'minimist';
import bodyParser from 'body-parser';
import { UAParser } from 'ua-parser-js';
import routes, { routesType } from './routes';
console.log("UAParser ", UAParser);

const env = process.env.NODE_ENV;
const argv = parseArgs(process.argv.slice(2), { alias: { p: 'port' }, boolean: ['h'], default: { p: 3000 } });

const app = next({ dev: env === 'development' });
const handle = app.getRequestHandler();

const agentDetector = (pageToRender: string) => (req: express.Request, res: express.Response) => {
  const ua = new UAParser(req.headers['user-agent']);
  console.log("UAParser ", ua);
  // @ts-ignore
  const device = ua.device.type || 'desktop';
  return app.render(req, res, `/${device}/${pageToRender}`, {
    // @ts-ignore
    ...req.query,
    device,
  });
};

const render = (pageToRender: string) => agentDetector(pageToRender);

app.prepare().then(() => {

 const server = express();

  server.use(bodyParser.json());
  // server.use('/api', router);

  routes.forEach((route: routesType) => server.get(route.path, render(route.pageToRender)));

  server.get('*', (req: any, res: any) => {
    //TODO: Add logging middleware
    handle(req, res);
  });

  try {

    server.listen(argv.port, (err: Error) => {
      if (err) throw err;
      console.log('Listening on port ' + argv.port + '!')
    })
  } catch (err) {
    console.error(`Unhandled server exception while listening to port: ${err.message}`, err);
  }
});
