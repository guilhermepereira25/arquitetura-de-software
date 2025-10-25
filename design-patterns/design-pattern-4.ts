// para executar esse arquivo precisa usar o ts-node
// para instalar execute: npm install -g ts-node
// depois execute: ts-node design-pattern-5.ts

import * as readline from "node:readline";

class Editor {
  private text: string;

  constructor() {
    this.text = "";
  }

  getText() {
    return this.text;
  }

  setText(text: string) {
    this.text = this.text + `${text}` + "\n";
  }

  restoreText(text: string) {
    this.text = text;
  }
}

abstract class Command {
  protected readonly editor: Editor;
  protected textBackup: string;

  constructor(editor: Editor, textBackup: string = "") {
    this.editor = editor;
    this.textBackup = textBackup;
  }

  saveBackup() {
    this.textBackup = this.editor.getText();
  }

  undo() {
    this.editor.restoreText(this.textBackup);
  }

  abstract execute(): void;
}

class UndoCommand extends Command {
  execute(): void {
    this.undo();
  }
}

class WriteCommand extends Command {
  private newText: string;

  constructor(editor: Editor, newText: string) {
    super(editor);
    this.newText = newText;
  }

  execute(): void {
    this.saveBackup();
    this.editor.setText(this.newText);
  }
}

class ListCommand extends Command {
  execute(): void {
    const text = this.editor.getText();
    if (text.trim() === "") {
      console.log("Empty text buffer");
      return;
    }
    console.log("\n" + text);
  }
}

class CommandHistory {
  private readonly history: Array<Command>;
  private readonly redoStack: Array<Command>;

  constructor(history: Array<Command> = [], redoStack: Array<Command> = []) {
    this.history = history;
    this.redoStack = redoStack;
  }

  push(command: Command) {
    this.history.push(command);
  }

  pop() {
    if (this.history.length === 0) {
      console.warn("History is empty");
      return undefined;
    }
    return this.history.pop();
  }

  pushRedo(command: Command) {
    this.redoStack.push(command);
  }

  popRedo() {
    if (this.redoStack.length === 0) {
      console.warn("Pilha de refazer vazia");
      return undefined;
    }

    return this.redoStack.pop();
  }
}

const editor = new Editor();
const actions = ["escrever", "desfazer", "listar", "sair"];
const history = new CommandHistory();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function startApp() {
  rl.question(
    "Write a command (escrever <text>, desfazer, listar, sair): ",
    (input) => {
      const trimmedInput = input.trim();
      if (trimmedInput.startsWith("sair")) {
        console.log("Finishing application. Bye :)");
        rl.close();
        return;
      }

      const action = trimmedInput.split(" ").shift();
      if (action === undefined || actions.includes(action) === false) {
        console.error("Wrong or undefined action: ", action);
        startApp();
        return;
      }

      switch (action) {
        case "escrever":
          const text = trimmedInput.substring(action.length).trim();
          if (text === "") {
            console.error(
              "Escrever command expect text but received empty text"
            );
            startApp();
            return;
          }

          const writeCommand = new WriteCommand(editor, text);
          writeCommand.execute();
          history.push(writeCommand);
          break;

        case "desfazer":
          const lastCommand = history.pop();
          if (lastCommand !== undefined) {
            lastCommand.undo();
            history.pushRedo(lastCommand);
            break;
          }

          const redo = history.popRedo();
          if (redo !== undefined) {
            redo.execute();
            history.push(redo);
          }
          break;

        case "listar":
          const listCommand = new ListCommand(editor);
          listCommand.execute();
          break;

        default:
          console.warn(
            "Wrong command. Expeted: escrever <texto>, desfazer, listar, sair"
          );
      }

      startApp(); // continua aplicacao
    }
  );
}

startApp();
