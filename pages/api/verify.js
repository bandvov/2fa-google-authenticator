import { db } from "../../db"
import speakeasy from 'speakeasy';

export default async function handler(req, res) {
  const { token } = JSON.parse(req.body);

  const user = await db.getData('/user')
  const base32secret = user.temp_secret;

  const verified = speakeasy.totp.verify({
    secret: base32secret,
    encoding: "ascii",
    token,
    window: 2
  });
  console.log(verified);

  return res.json({ m: 'm', verified, base32secret })
}