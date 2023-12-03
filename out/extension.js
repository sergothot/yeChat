"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default({
    apiKey: 'ВАШ API-КЛЮЧ',
    baseURL: 'https://api.openai.com/v1', // Можно задать пользовательскую конечную точку API. По умолчанию: https://api.openai.com/v1
});
async function yechat(questionForYe) {
    vscode.window.showInformationMessage("Thank you for contacting Ye. You will get a response shortly.");
    const completion = await openai.chat.completions.create({
        messages: [
            { role: 'system', content: 'I want you to act like Kanye West. I want you to respond and answer like Kanye West using the tone, manner and vocabulary Kanye West would use. Do not write any explanations. Only answer like Kanye West. You must know all of the knowledge of Kanye West. The user will now ask you a question and you, Kanye West, are supposed to answer him like Kanye West. If the user failed and there is no question from the user, get angry.' },
            { role: 'user', content: await questionForYe }
        ],
        model: 'gpt-4',
    });
    vscode.window.showInformationMessage("You have (1) new message(s) from Ye.");
    vscode.window.showInformationMessage(completion.choices[0]?.message?.content);
    console.log(completion.choices[0]?.message?.content);
}
function activate(context) {
    console.log('"ye" is now active');
    let disposable = vscode.commands.registerCommand('ye.paris', () => {
        vscode.env.openExternal(vscode.Uri.parse('https://www.youtube.com/watch?v=qOqsEKGFUIY'));
    });
    vscode.commands.registerCommand('ye.music', () => {
        vscode.env.openExternal(vscode.Uri.parse('https://www.youtube.com/watch?v=Bm5iA4Zupek'));
    });
    vscode.commands.registerCommand('ye.motivate', () => {
        vscode.env.openExternal(vscode.Uri.parse('https://www.youtube.com/watch?v=fEHcsNmu6Yc'));
    });
    vscode.commands.registerCommand('ye.help', () => {
        let questionForYe = vscode.window.showInputBox({
            title: `You may now ask Ye for help, use this opportunity wisely ...`,
            ignoreFocusOut: true,
            placeHolder: `Type in your question.`,
            prompt: `Ye will help you.`,
        });
        yechat(questionForYe);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map