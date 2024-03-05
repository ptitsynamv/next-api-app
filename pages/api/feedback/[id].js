import { buildFilePath, extractFileData } from '.';

function handler(req, res) {
  const { id } = req.query;
  const filePath = buildFilePath();
  const data = extractFileData(filePath);
  const feedback = data.find((item) => item.id === id);

  res.status(201).json({ feedback });
}

export default handler;
