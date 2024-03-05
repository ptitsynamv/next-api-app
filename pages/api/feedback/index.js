import fs from 'fs';
import path from 'path';

export function buildFilePath() {
  return path.join(process.cwd(), 'data', 'feedback.json');
}

export function extractFileData(filePath) {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
}

function handler(req, res) {
  if (req.method === 'POST') {
    const { email, text } = req.body;

    const newFeedback = { id: new Date().toISOString(), email, text };
    const filePath = buildFilePath();
    const data = extractFileData(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: 'Success', newFeedback });
  }
  if (req.method === 'GET') {
    const filePath = buildFilePath();
    const data = extractFileData(filePath);

    res.status(200).json({ data });
  }
}

export default handler;
