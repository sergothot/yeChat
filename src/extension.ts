import * as vscode from 'vscode';

import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: 'ВАШ API-КЛЮЧ',
  baseURL: 'https://api.openai.com/v1', // Можно задать пользовательскую конечную точку API. По умолчанию: https://api.openai.com/v1
});

async function yechat(questionForYe: string) {
	vscode.window.showInformationMessage("Thank you for contacting Ye. You will get a response shortly.");
	const completion = await openai.chat.completions.create({
		messages: [
			{role: 'system', content: 'I want you to act like Kanye West. I want you to respond and answer like Kanye West using the tone, manner and vocabulary Kanye West would use. Do not write any explanations. Only answer like Kanye West. You must know all of the knowledge of Kanye West. The user will now ask you a question and you, Kanye West, are supposed to answer him like Kanye West. If the user failed and there is no question from the user, get angry.'},
			{role: 'user', content: await questionForYe}
		],
		model: 'gpt-4',
	});
	vscode.window.showInformationMessage("You have (1) new message(s) from Ye.");
	vscode.window.showInformationMessage(completion.choices[0]?.message?.content as string);
	console.log(completion.choices[0]?.message?.content);
}

export function activate(context: vscode.ExtensionContext) {

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
		let questionForYe: unknown = vscode.window.showInputBox({
			title: `You may now ask Ye for help, use this opportunity wisely ...`,
			ignoreFocusOut: true,
			placeHolder: `Type in your question.`,
			prompt: `Ye will help you.`,
		  });
		yechat(questionForYe as string);
		
	});


	context.subscriptions.push(disposable);
}

export function deactivate() {}
