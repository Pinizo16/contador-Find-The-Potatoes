const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

app.get("/players", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    await page.goto("https://games.roblox.com/v1/games?universeIds=5484458349", {
      waitUntil: "networkidle2"
    });

    // Leer JSON directamente del body
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
    res.send("ERROR");
  }
});

app.listen(3000, () => {
  console.log("Server running");
});
});

app.listen(3000, () => {
  console.log("Server running");
});
