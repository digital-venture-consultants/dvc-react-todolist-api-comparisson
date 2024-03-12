"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// app.use(express.bodyParser());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
const todoList = [];
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.redirect('/todo');
});
app.get('/todo', (req, res) => {
    res.json(todoList);
});
app.post('/todo', (req, res) => {
    if (!req.body.text) {
        res.status(400).send('Invalid Text');
        return;
    }
    if (!req.body.author) {
        res.status(400).send('Invalid Author');
        return;
    }
    todoList.push(req.body);
    res.json(req.body);
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
