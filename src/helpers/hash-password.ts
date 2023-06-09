import crypto from "crypto";

function hashPassword(password: string) {
  const hash = crypto.createHash("sha512");
  hash.update(password);
  return hash.digest("hex");
}

export default hashPassword;
