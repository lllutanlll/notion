export default async function handler(req, res) {
const response = await fetch(
`https://api.notion.com/v1/databases/${process.env.35578bf6192b801192f6fd041e1bdc25}/query`,
{
method: "POST",
headers: {
"Authorization": `Bearer ${process.env.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}`,
"Notion-Version": "2022-06-28",
"Content-Type": "application/json"
},
body: JSON.stringify({
filter: {
property: "現在作業中", // ← プロパティ名そのまま
status: {
equals: "作業中"
}
}
})
}
);

const data = await response.json();

const page = data.results?.[0];

const title =
page?.properties?.["作業名"]?.title?.[0]?.plain_text ||
"作業なし";

res.status(200).json({ title });
}
