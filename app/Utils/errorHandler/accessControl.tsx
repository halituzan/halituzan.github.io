const accessControl = (token: string, res: any) => {
  // TODO: Method Kontrolü: POST methodu dışındaki istekleri engeller.
  // TODO: Yetki Kontrolü: token yoksa servise erişilemez
  if (!token) {
    return res.status(401).json({ message: "Giriş yetkiniz bulunmamaktadır!" });
  }
};

export default accessControl;
