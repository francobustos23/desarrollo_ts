import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express, { Application } from 'express';
import { envs } from '../environments/environments';
import { connectDB } from '../config/connectDB';

export class mServer {
    private app: Application;
    private port: number;

    constructor(){
        this.app = express();
        this.port = envs.PORT;

        this.connectDB();
        this.middleweares();

    }

    private middleweares():void {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(morgan('dev'))
        this.app.use(express.json())
    }

    private async connectDB(): Promise<void> {
        await connectDB();
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`server runnig on https://localhost:${this.port}`);
        })
    }
}

export default mServer;