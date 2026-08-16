const RSS_URL = "https://anchor.fm/s/2295ff0c/podcast/rss";

export default async function handler(req, res) {
  try {
    const response = await fetch(RSS_URL, {
      headers: {
        "User-Agent": "KanamePodcastRSS/1.0"
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

    res.status(200).send(rss);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "RSSを取得できませんでした",
      message: error.message
    });
  }
}
