import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
// app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());

interface toDoList {
    readonly id: number,
    text: string,
    author: string,
    done: boolean
}

let todoList: toDoList[] = [];

app.use(cors())

app.get('/', (req, res) => {
    res.redirect('/todo');
});

app.get('/todo', (req, res) => {
    let sum  = 0
    for (let i = 0; i < 10e4; i++) {
        sum = i + sum
    }
    res.json(todoList);
});

app.post('/todo', (req: Request, res: Response) => {
    if (!req.body.text) {
        res.status(400).send('Invalid Text');
        return
    }
    if (!req.body.author) {
        res.status(400).send('Invalid Author');
        return
    }
    todoList.push(req.body)
    res.json(req.body);
});

app.delete('/todo', (req: Request, res: Response) => {
    todoList = []
    res.status(200).send(todoList);
})

app.delete('/todo/:id', (req: Request, res: Response) => {
    const index = +req.params.id
    if (index < 0 && index > todoList.length) {
        res.status(400).send('Invalid Id');
    }
    todoList.splice(index, 1)
    res.status(200).send(todoList);
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});