const express = require("express");
const puppeteer = require("puppeteer-core");

const app = express();

app.get("/players", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/chromium-browser", // Chromium preinstalado en Render
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: "new"
    });

    const page = await browser.newPage();

    // Vamos directamente al endpoint JSON
    await page.goto("https://games.roblox.com/v1/games?universeIds=5484458349", {
      waitUntil: "networkidle2"
    });

    const content = await page.evaluate(() => document.body.innerText);

    await browser.close();

    const data = JSON.parse(content);

    if (data.data && data.data.length > 0) {
      const playing = data.data[0].playing;
      res.send(String(playing));
    } else {
      res.send("NO_DATA");
    }

  } catch (e) {
    console.log(e);
    res.send("ERROR");
  }
});

app.listen(3000, () => {
  console.log("Server running");
});
