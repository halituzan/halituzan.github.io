import { JwtPayload, verify } from "jsonwebtoken";

const userControl = (token: string, res: any) => {
  if (!process.env.JWT_SECRET) {
    return;
  }
  const { userId } = verify(
    token,
    process.env.JWT_SECRET
  ) as JwtPayload;

  // TODO: Kullanıcı Kontrolü: userId dönmezse token geçersiz.
  if (!userId) {
    return res
      .status(401)
      .json({ message: "Oturum süresi dolmuş. Lütfen tekrar giriş yapın." });
  }
  return userId;
};

export default userControl;
