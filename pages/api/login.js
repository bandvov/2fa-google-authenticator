import { db } from "../../db";
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';


export default function handler(req, res) {
  var secret = speakeasy.generateSecret({
    name: "my site",
  });

  db.push('/user', { temp_secret: secret.ascii }, false)

  QRCode.toDataURL(secret.otpauth_url, { width: '200' }, (err, url) => {
    res.status(200).json({ url })
  })
}
