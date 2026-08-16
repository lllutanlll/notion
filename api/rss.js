const RSS_URLS = {

  kaname:
    "https://anchor.fm/s/2295ff0c/podcast/rss",

  city:
    "https://feeds.megaphone.fm/TBS1292367906",

  shinku:
    "https://feeds.megaphone.fm/TBS6605278277"

};


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


  // OPTIONSリクエスト
  if (req.method === "OPTIONS") {

    return res.status(200).end();

  }


  try {

    /*
     * ?podcast=kaname
     * ?podcast=city
     * ?podcast=shinku
     */

    const podcast =
      req.query.podcast || "kaname";


    /*
     * Podcastに対応するRSS URL
     */

    const RSS_URL =
      RSS_URLS[podcast];


    if (!RSS_URL) {

      return res.status(400).json({

        error:
          "指定されたPodcastが存在しません"

      });

    }


    /*
     * RSSを取得
     */

    const response =
      await fetch(
        RSS_URL,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0"
          }
        }
      );


    if (!response.ok) {

      throw new Error(
        `RSS request failed: ${response.status}`
      );

    }


    const rss =
      await response.text();


    /*
     * XMLとして返す
     */

    res.setHeader(
      "Content-Type",
      "application/xml; charset=utf-8"
    );


    res.setHeader(
      "Cache-Control",
      "s-maxage=300, stale-while-revalidate=600"
    );


    return res
      .status(200)
      .send(rss);


  } catch (error) {

    console.error(error);


    return res.status(500).json({

      error:
        "RSSを取得できませんでした",

      message:
        error.message

    });

  }

}
