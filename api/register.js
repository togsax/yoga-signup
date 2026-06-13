// Vercel 中转函数 → 调用 Netlify Function
const NETLIFY_FN = "https://capable-malabi-3f0cec.netlify.app/.netlify/functions/register";

export default async function handler(req, res) {
  const url = NETLIFY_FN + (req.url.includes("?") ? req.url.substring(req.url.indexOf("?")) : "");

  try {
    const fetchRes = await fetch(url, {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
    });
    const data = await fetchRes.json();
    res.status(fetchRes.status).json(data);
  } catch (e) {
    res.status(500).json({ error: "服务器错误" });
  }
}
