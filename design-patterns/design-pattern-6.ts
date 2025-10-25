// Uma empresa precisa de um aplicativo de console que registre eventos do sistema.
// Funcionalidades:

//     O usuário digita "log <mensagem> "para registrar um evento.
//     O sistema deve armazenar os logs em memória e permitir que o usuário digite mostrar para listar todos os eventos.
//     O sistema deve permitir escolher diferentes tipos de saída de log: console, arquivo ou resumo diário.
//     O programa roda até o usuário digitar sair.

import { writeFile } from "fs";
import * as readline from "readline";

interface Event {
  message: string;
}

const logs: Array<Event> = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

interface LogOutputStrategy {
  output(logs: Array<Event>): void;
}

class ConsoleLogOutput implements LogOutputStrategy {
  output(logs: Array<Event>): void {
    console.log("Logs registrados: \n");
    logs.forEach((log, index) => {
      console.log(`${index + 1}. ${log.message} \n`);
    });
  }
}

class FileLogOutput implements LogOutputStrategy {
  output(logs: Array<Event>): void {
    writeFile("logs.txt", JSON.stringify(logs), (err) => {
      if (err) {
        console.error("Erro ao escrever logs no arquivo:", err);
      } else {
        console.log("Logs escritos em logs.txt");
      }
    });
    console.log("Logs escritos no arquivo logs.txt.");
  }
}

class DailySummaryLogOutput implements LogOutputStrategy {
  output(logs: Array<Event>): void {
    // Simulando o resumo diário
    console.log("Resumo diário dos logs (simulado):");
    console.log(`Total de logs: ${logs.length}`);

    const messages = logs.map(log => log.message).join(", ");
    console.log(`Mensagens: \n ${messages}`);
  }
}

class LogContext {
  private strategy: LogOutputStrategy;

  constructor(strategy: LogOutputStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: LogOutputStrategy) {
    this.strategy = strategy;
  }

  outputLogs(logs: Array<Event>) {
    this.strategy.output(logs);
  }
}

const logContext = new LogContext(new ConsoleLogOutput());

function main() {
  rl.question(
    "Comandos disponiveis: log <mensagem>, mostrar, saida <tipo-de-saida> 'console' 'arquivo' 'resumo diario', sair \n",
    (answer) => {
      const [command, ...params] = answer.split(" ");

      switch (command) {
        case "log":
          const message = params.join(" ");
          if (!message) {
            console.log(
              "Por favor, forneça uma mensagem para registrar o log."
            );
            main();
            return;
          }

          logs.push({ message });
          console.log(`Log registrado: ${message} \n`);
          break;

        case "mostrar":
          console.log(`Executando output dos logs \n`);
          logContext.outputLogs(logs);
          break;

        case "saida":
          const type = params.join(" ").trim();
          if (
            !type ||
            !["console", "arquivo", "resumo diario"].includes(type)
          ) {
            console.log(
              "Por favor, forneça um tipo de saída válido: 'console', 'arquivo' ou 'resumo diário'."
            );
            main();
            return;
          }

          if (type === "console") {
            logContext.setStrategy(new ConsoleLogOutput());
          } else if (type === "arquivo") {
            logContext.setStrategy(new FileLogOutput());
          } else if (type === "resumo diario") {
            logContext.setStrategy(new DailySummaryLogOutput());
          } else {
            console.log("Tipo de saída desconhecido.");
            main();
            return;
          }

          console.log(`Tipo de saída alterado para: ${type}`);
          break;

        case "sair":
          console.log("Saindo do programa.");
          rl.close();
          return;

        default:
          console.log("Comando desconhecido. Tente novamente.");
      }

      main();
      return;
    }
  );
}

main();
