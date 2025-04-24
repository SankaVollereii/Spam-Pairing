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

    const { res: WaNumber } = await inquirer.prompt([
      {
        type: "input",
        name: "res",
        message: "Masukan Nomor WhatsApp: ",
      },
    ]);

    let count = 0;

    while (true) {
      try {
        const code = await sock.requestPairingCode(WaNumber);
        console.log(chalk.cyanBright("Spam Terkirim: ", code, "ke nomor: ", WaNumber, count + 1));
        count++;

        // Reset pairing after 100 codes
        if (count >= 100) {
          console.log(chalk.yellow("Sudah mengirim 100 kode, melakukan pairing ulang..."));
          count = 0; // Reset the count
          // Optionally, you can add a delay here if needed
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat mengirim kode:", error);
        break; // Exit the loop on error
      }
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}

connectToWhatsApp();
