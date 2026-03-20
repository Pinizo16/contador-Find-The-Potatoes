const express = require("express");
const fetch = require("node-fetch"); // npm install node-fetch@2

const app = express();

app.get("/players", async (req, res) => {
  try {
    const response = await fetch(
      "https://games.roblox.com/v1/games?universeIds=5484458349",
      {
        headers: {
          "User-Agent": "Mozilla/5.0", // simula navegador
          "Accept": "application/json"
        }
      }
    );

    const data = await response.json();

    if (data.data && data.data.length > 0) {
      res.send(String(data.data[0].playing));
    } else {
      res.send("NO_DATA");
    }

  } catch (e) {
    console.log(e);
    res.send("ERROR");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});

app.listen(3000, () => {
  console.log("Server running");
});
