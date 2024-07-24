import * as crypto from 'crypto';

export function aesCreateKey() {
    return crypto.createHash('sha512').update(crypto.randomBytes(16)).digest('hex').substring(0, 32)
}

export function aesEncrypt(key, text) {
    let iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(
        "aes-256-cbc",
        Buffer.from(key),
        iv
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function aesDecrypt(key, text) {
    let split = text.split(":");
    let iv = Buffer.from(split.shift(), "hex");
    let encryptedText = Buffer.from(split.join(":"), "hex");
    let decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        Buffer.from(key),
        iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
