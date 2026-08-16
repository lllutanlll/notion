const RSS_URL = "https://anchor.fm/s/2295ff0c/podcast/rss";

export default async function handler(req, res) {
  // CORSを許可
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  // OPTIONSリクエストへの対応
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const response = await fetch(RSS_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    if (!response.ok) {
      throw new Error(
        `RSS request failed: ${response.status}`
      );
    }

    const rss = await response.text();

    res.setHeader(
      "Content-Type",
      "application/xml; charset=utf-8"
    );

    res.setHeader(
      "Cache-Control",
      "s-maxage=300, stale-while-revalidate=600"
    );

    return res.status(200).send(rss);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "RSSを取得できませんでした",
      message: error.message
    });
  }
}
