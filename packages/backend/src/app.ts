import express, { Express, Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import AppRouter from './routes';
import { CustomError } from './types/errors.type';

const port = 3030;
const app: Express = express();
const router = new AppRouter(app);
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
	res.send('Hello Node!');
});

router.init();
app.use((req: Request, res: Response) => {
	res.status(404).json({ message: 'Route Is Not found!' });
});

app.use(
	(err: CustomError, req: Request, res: Response, _next: NextFunction) => {
		const status = err.status || 500;
		const message = err.message || 'Internal Server Error!';
		res.status(status).json({ message });
	},
);
app.listen(port, () => {
	console.log(`Now listening on port ${port}`);
});
