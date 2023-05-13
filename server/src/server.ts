import express from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesToHourString } from "./utils/convert-minutes-to-hour-string";

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors({
  origin: true,
}))

app.get("/games", async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  });

  return res.json(games);
});

app.get("/games/:id", async (req, res) => {
  const gameId = req.params.id

  const game = await prisma.game.findUnique({
    select: {
      id: true,
      title: true,
      bannerUrl: true,
      categories: true,
      description: true,
      platforms: true,
      ads: true,
      _count: {
        select: {
          ads: true,
        }
      }
    },
    where: {
      id: gameId,
    },
  });

  return res.json(game);
})

app.post("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;
  const body = req.body;



  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  })

  return res.json(ad);
});

app.post("/ad/games", async (req, res) => {
  const body = req.body;

  const game = await prisma.game.create({
    data: {
      title: body.title,
      bannerUrl: body.bannerUrl,
      categories: body.categories,
      description: body.description,
      platforms: body.platforms,
    }
  })

  return res.json(game);
})

app.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      yearsPlaying: true,
      weekDays: true,
      hourStart: true,
      hourEnd: true,
      useVoiceChannel: true,
      createdAt: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return res.json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    }
  }))
});

app.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId
    },
  })

  return res.json({
    discord: ad.discord,
  });
});

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT || 3333,
});
