document.getElementById("genBtn").addEventListener("click", async () => {
    const res = await fetch("/data/articles.json");
    const articles = await res.json();

    const base = "https://your-site.github.io";

    const rssItems = articles
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(a => {
            const pubDate = new Date(a.date).toUTCString();
            return `
    <item>
        <title>${escapeXml(a.title)}</title>
        <link>${base}${a.url}</link>
        <pubDate>${pubDate}</pubDate>
    </item>`;
        })
        .join("");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
    <title>Мій сайт публікацій</title>
    <link>${base}/</link>
    <description>Останні статті</description>${rssItems}
</channel>
</rss>`;

    const sitemapUrls = articles
        .map(a => `
    <url>
        <loc>${base}${a.url}</loc>
    </url>`)
        .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${base}/</loc>
    </url>${sitemapUrls}
</urlset>`;

    document.getElementById("rssOut").value = rss.trim();
    document.getElementById("sitemapOut").value = sitemap.trim();
});

function escapeXml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}