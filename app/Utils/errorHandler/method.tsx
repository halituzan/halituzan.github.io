const methodHandle = (res: any, req: any, method: string) => {
  // TODO: Method Kontrolü: POST methodu dışındaki istekleri engeller.
  if (req.method !== method) {
    return res.status(425).json({ message: "Method Yanlış" });
  }
};

export default methodHandle;
