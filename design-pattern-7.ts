// Uma plataforma de ensino quer um programa em console que gerencie o acesso a vídeos educativos. Nem todos os usuários têm permissão para assistir a todos os vídeos.

// Funcionalidades:

//     O usuário digita "entrar <usuario>" para se logar.
//     O usuário digita "assistir <video>" para assistir a um vídeo.
//     Cada vídeo tem um nível de acesso: gratuito ou premium.
//     Usuários normais só podem acessar vídeos gratuitos. Usuários premium podem acessar todos os vídeos.
//     O programa deve rodar em loop até o usuário digitar sair.


// Regras do Proxy:

//     Quando o usuário tenta assistir a um vídeo, o Proxy verifica a permissão antes de criar/abrir o vídeo real.
//     O vídeo real só é carregado se o usuário tiver acesso
//     O Proxy deve imprimir mensagens indicando se o acesso foi permitido ou negado.
import * as readline from "node:readline";

interface Subject {
    assistir(video: string): void;
} 

class Video implements Subject {
    private nome: string;
    private nivelAcesso: string; // "gratuito" ou "premium"

    constructor(nome: string, nivelAcesso: string) {
        this.nome = nome;
        this.nivelAcesso = nivelAcesso;
    }

    assistir(video: string): void {
        console.log(`Assistindo ao vídeo: ${this.nome}`);
    }

    getNivelAcesso(): string {
        return this.nivelAcesso;
    }

    getNome(): string {
        return this.nome;
    }
}

class Usuario {
    private nome: string;
    private tipo: string; // "gratuito" ou "premium"

    constructor(nome: string, tipo: string) {
        this.nome = nome;
        this.tipo = tipo;
    }

    getTipo(): string {
        return this.tipo;
    }

    getNome(): string {
        return this.nome;
    }
}

class Proxy implements Subject {
    private video: Video;
    private usuario: Usuario;

    constructor(realSubject: Video, usuario: Usuario) {
        this.video = realSubject;
        this.usuario = usuario;
    }

    assistir(video: string): void {
        if (this.hasAccess()) {
            this.video.assistir(video);
        } else {
            console.log(`Acesso negado ao vídeo: ${this.video.getNivelAcesso()}`);
        }
    }

    private hasAccess(): boolean {
        if (this.video.getNivelAcesso() === "gratuito" && this.usuario.getTipo() === "gratuito") {
            return true;
        } else if (this.usuario.getTipo() === "premium") {
            return true;
        } else {
            return false;
        }
    }
}

const videos: Video[] = [
    new Video("Video 1", "gratuito"),
    new Video("Video 2", "premium"),
    new Video("Video 3", "gratuito"),
    new Video("Video 4", "premium")
];

const usuarios = [
    new Usuario("Alice", "gratuito"),
    new Usuario("Bob", "premium")
];

let videoAtual: Video | null = null;
let usuarioAtual: Usuario | null = null;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function main() {
    rl.question(`Comandos: entrar <usuario>, assistir <video>, sair \n`, 
        (answer) => {
            const [command, ...params] = answer.split(" ");
            console.debug("Comando:", command, "Param:", params);

            switch (command) {
                case 'entrar':
                    const param = params.join(" ").trim();

                    const usuario = usuarios.find(u => u.getNome().toLowerCase() === param!.toLowerCase());
                    if (usuario) {
                        usuarioAtual = usuario;
                        console.log(`Usuário ${usuarioAtual.getNome()} logado como ${usuarioAtual.getTipo()}`);
                    } else {
                        console.log(`Usuário ${params} não encontrado.`);
                    }
                    break;

                case 'assistir':
                    if (!usuarioAtual) {
                        console.log("Nenhum usuário logado. Use 'entrar <usuario>' para logar.");
                        break;
                    }

                    const paramsStr = params.join(" ").trim();
                    if (!paramsStr) {
                        console.log("Por favor, forneça o nome do vídeo para assistir.");
                        break;
                    }

                    const video = videos.find(v => v['nome'].toLowerCase() === paramsStr!.toLowerCase());

                    if (video) {
                        videoAtual = video;
                        const proxy = new Proxy(videoAtual, usuarioAtual);
                        proxy.assistir(videoAtual.getNome());
                    } else {
                        console.log(`Vídeo ${params} não encontrado.`);
                    }
                    break;

                case 'sair':
                    console.log("Saindo...");
                    rl.close();
                    return;

                default:
                    console.log("Comando inválido.");
            }
            main();
        }
    )
}

main();