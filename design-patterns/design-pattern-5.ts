// para executar esse arquivo precisa usar o ts-node
// para instalar execute: npm install -g ts-node
// depois execute: ts-node design-pattern-5.ts

import * as readline from "node:readline";

const PackageStatus = {
  Registrado: "registrado",
  EmTransito: "em_transito",
  DeliveryCenter: "delivery_center",
  Entregue: "entregue",
} as const;

type PackageStatus = (typeof PackageStatus)[keyof typeof PackageStatus];

interface OrderPackage {
  codigo: string;
  status: PackageStatus;
  updatedTimes: number;
}

class InMemoryOrderPackageRepository {
  private ordersPackages: Array<OrderPackage>;

  constructor() {
    this.ordersPackages = [];
  }

  findAll() {
    return this.ordersPackages;
  }

  findByCodigo(codigo: string) {
    return this.ordersPackages.find(
      (orderPackage) => orderPackage.codigo === codigo
    );
  }

  create(orderPackage: OrderPackage) {
    this.ordersPackages.push(orderPackage);
  }

  update(orderPackage: OrderPackage) {
    const index = this.ordersPackages.findIndex(
      (currentOrderPackage) =>
        currentOrderPackage.codigo === orderPackage.codigo
    );
    if (index === -1) {
      throw new Error("Undefined index for package with code " + orderPackage.codigo);
    }
    this.ordersPackages[index] = orderPackage;
  }
}

interface State {
  handle(context: OrderPackageContext): void;
}

class RegistradoState implements State {
  handle(context: OrderPackageContext): void {
    const ordersPackages = context.repository
      .findAll()
      .filter(
        (orderPackage) =>
          orderPackage.status === PackageStatus.Registrado &&
          orderPackage.updatedTimes === 0
      );
    if (ordersPackages.length === 0) {
      console.log("Não há pacotes registrados para serem enviados. \n");

      context.transitionTo(new EmTransitoState());
      return;
    }

    ordersPackages.forEach((order) => {
      order.updatedTimes += 1;
      context.repository.update(order);
    });

    console.log("Todos os pacotes registrados foram enviados.");

    context.transitionTo(new EmTransitoState());
  }
}

class EmTransitoState implements State {
  handle(context: OrderPackageContext): void {
    const ordersPackages = context.repository
      .findAll()
      .filter(
        (orderPackage) =>
          orderPackage.status === PackageStatus.Registrado &&
          (orderPackage.updatedTimes === 1 ||
            (orderPackage.updatedTimes > 1 && orderPackage.updatedTimes <= 3))
      );
    if (ordersPackages.length === 0) {
      console.log(
        "Não há pacotes disponiveis para atualizar status para 'em transito'. \n"
      );
      context.transitionTo(new DeliveryCenterState());
      return;
    }

    ordersPackages.forEach((order) => {
      if (order.updatedTimes === 2) {
        order.status = PackageStatus.EmTransito;
      }

      order.updatedTimes += 1;
      context.repository.update(order);
    });

    context.transitionTo(new DeliveryCenterState());
  }
}

class DeliveryCenterState implements State {
  handle(context: OrderPackageContext): void {
    const ordersPackages = context.repository
      .findAll()
      .filter(
        (orderPackage) =>
          orderPackage.status === PackageStatus.EmTransito &&
          orderPackage.updatedTimes === 3
      );
    if (ordersPackages.length === 0) {
      console.log("Não há pacotes em transito. \n");
      context.transitionTo(new EntregueState());
      return;
    }

    ordersPackages.forEach((order) => {
      if (order.updatedTimes === 3) {
        order.status = PackageStatus.DeliveryCenter;
      } 

      order.updatedTimes += 1;
      context.repository.update(order);
    });

    context.transitionTo(new EntregueState());
  }
}

class EntregueState implements State {
  handle(context: OrderPackageContext): void {
    const ordersPackages = context.repository
      .findAll()
      .filter(
        (orderPackage) =>
          orderPackage.status === PackageStatus.DeliveryCenter &&
          orderPackage.updatedTimes === 4 || orderPackage.updatedTimes === 5
      );
    if (ordersPackages.length === 0) {
      console.log("Não há pacotes entregues.");
      context.transitionTo(new RegistradoState());
      return;
    }

    ordersPackages.forEach((order) => {
      if (order.updatedTimes === 5) {
        order.status = PackageStatus.Entregue;
        console.log(`Pacote ${order.codigo} já foi entregue.`);
      }

      order.updatedTimes += 1;
      context.repository.update(order);
    });

    console.log("Todos os pacotes foram entregues.");

    context.transitionTo(new RegistradoState());
  }
}

class OrderPackageContext {
  private state: State;
  private orderPackageRepository: InMemoryOrderPackageRepository;

  constructor(orderPackageRepository: InMemoryOrderPackageRepository) {
    this.orderPackageRepository = orderPackageRepository;
    this.state = new RegistradoState();
  }

  get repository() {
    return this.orderPackageRepository;
  }

  transitionTo(state: State) {
    this.state = state;
  }

  request() {
    this.state.handle(this);
  }
}

const repository = new InMemoryOrderPackageRepository();

const context = new OrderPackageContext(repository);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function main() {
  rl.question(
    "Comandos disponiveis: registrar <codigo>, status <codigo>, sair \n",
    (answer) => {
      const [command, param] = answer.split(" ");

      // executando o request do state
      context.request();

      switch (command) {
        case "registrar":
          if (!param) {
            console.log(
              "Por favor, forneça um código para registrar o pacote."
            );
            main();
            return;
          }

          const existingPackage = repository.findByCodigo(param);
          if (existingPackage) {
            console.log(`Pacote com código ${param} já está registrado.`);
            main();
            return;
          }

          const newPackage: OrderPackage = {
            codigo: param,
            status: PackageStatus.Registrado,
            updatedTimes: 0,
          };

          repository.create(newPackage);
          break;

        case "status":
          if (!param) {
            console.log(
              "Por favor, forneça um código para verificar o status."
            );
            main();
            return;
          }

          const orderPackage = repository.findByCodigo(param);
          if (!orderPackage) {
            console.log(`Nenhum pacote encontrado com o código ${param}. \n`);
            main();
            return;
          }

          console.log(`Status do pacote ${param}: ${orderPackage.status} \n`);
          break;

        case "sair":
          console.log("Finalizando aplicação. Tchau :)");
          rl.close();
          return;

        default:
          console.log("Comando não reconhecido. Tente novamente.");
      }

      main();
    }
  );
}

main();
