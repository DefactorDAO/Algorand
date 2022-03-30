import { Injectable } from '@nestjs/common';
import {
  createCipheriv,
  createDecipheriv,
  pbkdf2Sync,
  randomBytes,
} from 'crypto';

@Injectable()
export class AesService {
  encrypt(buffer: Buffer) {
    const iv = randomBytes(12);
    const salt = randomBytes(64);
    const key = pbkdf2Sync(process.env.MASTER_KEY, salt, 2145, 32, 'sha512');
    const cipher = createCipheriv('aes-256-gcm', key, iv);
    const cipherText = Buffer.concat([cipher.update(buffer), cipher.final()]);
    const tag = cipher.getAuthTag();
    return Buffer.concat([salt, iv, tag, cipherText]);
  }

  decrypt(buffer: Buffer) {
    const salt = buffer.slice(0, 64); // 64 bytes
    const iv = buffer.slice(64, 76); // 12 bytes
    const tag = buffer.slice(76, 92); // 16 bytes
    const cipherText = buffer.slice(92); // remaining
    const key = pbkdf2Sync(process.env.MASTER_KEY, salt, 2145, 32, 'sha512');
    const decipher = createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(cipherText), decipher.final()]);
  }
}
