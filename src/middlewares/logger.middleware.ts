import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import chalk from 'chalk'; 

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const currentDate = moment().format('DD/MM/YYYY');
    const currentTime = moment().format('HH:mm:ss');

    const methodColor = chalk.blue(req.method);
    const urlColor = chalk.green(req.url);
    const dateColor = chalk.yellow(currentDate);
    const timeColor = chalk.magenta(currentTime);

    console.log(`${methodColor} ${urlColor} [${dateColor}  -  ${timeColor} ]`);
    next();
}

export default loggerMiddleware;
