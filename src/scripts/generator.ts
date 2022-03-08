import axios, { AxiosError } from "axios";
import { EnrichedCharacter, MediaList, PlayableClass, Roster, Token } from "../models/models";
import * as apiClasses from "../json/classes.json"
import { writeFile } from "fs";
import * as qs from "querystring"
import { CharacterAchievements } from "../models/achievements";
import { RIOProfile } from "../models/raider.ts.model";
import { getCharacterRuns, compileGuildRuns } from "./raider.io";
import { Creds } from "./creds.model";

if(!process.env.BLIZZ_CLIENTID || !process.env.BLIZZ_SECRET){
  console.log("Please set BLIZZ_CLIENTID and BLIZZ_SECRET environment variables");
  console.log("Current Env Keys: ", Object.keys(process.env).filter(k => k.toUpperCase().startsWith("BLIZZ")));
  process.exit(1);
}

const creds: Creds = {
  base: "https://eu.api.blizzard.com",
  clientid: process.env.BLIZZ_CLIENTID!,
  secret: process.env.BLIZZ_SECRET!,
  locale: "en_GB",
  origin: "eu",
  patch: "static-eu",
}

const headers = () => {
  return {
    headers: {
      Authorization: `Bearer ${creds.token}`
    }
  };
}

const wait = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

const handelError = (error: any) => {
  if ((error as AxiosError).config) {
    const e = error as AxiosError;
    console.log(`${e.code}: ${e.config.method} ${e.config.url} failed with error ${e.message}`);
    console.log(e.config.headers);
    console.log(e.config.auth);
    console.log(e.config.data);
    console.log(e.config.params);
  } else {
    console.log(error);
  }

}

const update = async () => {
  const enrichedRoster: EnrichedCharacter[] = [];
  const classes = apiClasses.classes.map((c) => c as PlayableClass);
  try {
    let response = await axios.post(`https://eu.battle.net/oauth/token`,
      //  "grant_type: \"client_credentials\"",
      qs.stringify({ grant_type: "client_credentials" }),
      {
        auth: {
          username: creds.clientid,
          password: creds.secret
        },
        headers: {
          'Content-Type': "application/x-www-form-urlencoded",
        }
      });
    console.log("Auth successful!");
    const token = response.data as Token
    creds.token = token.access_token;
    if (!token.access_token) { throw new Error("failed to get token"); }

    console.log("Getting Roster");
    response = await axios.get(`${creds.base}/data/wow/guild/magtheridon/genericus-namus/roster`, {
      ...headers(),
      timeout: 2000,
      params: {
        region: creds.origin,
        namespace: "profile-eu",
        locale: creds.locale,
      }
    });
    const roster = response.data as Roster;
    console.log("Got Roster", roster);
    const members = roster.members.filter((m) => m.rank <= 6 && m.character.level === 60);
    let promise = Promise.resolve();
    const profiles: RIOProfile[] = [];
    members.forEach((member) => {
      let enrichedCharacter: EnrichedCharacter;
      promise = promise.then(() => {
        console.log(`Updating ${member.character.name}`);
        return axios.get(`${creds.base}/profile/wow/character/${member.character.realm.slug}/${member.character.name.toLowerCase()}/character-media`, {
          ...headers(),
          timeout: 2000,
          params: {
            region: creds.origin,
            namespace: "profile-eu",
            locale: creds.locale,
          }
        });
      })
        .then((response) => {
          const media = response.data as MediaList;
          const playable_class = classes.find((c) => c.id === member.character.playable_class?.id);
          enrichedCharacter = {
            ...member.character,
            media: media.assets,
            playable_class: playable_class!,
            rank: member.rank,
            achievements: [],
          };
        })
        .then(wait)
        .then(() => {
          console.log(`Getting achievements for ${member.character.name}`);
          return axios.get(`${creds.base}/profile/wow/character/${member.character.realm.slug}/${member.character.name.toLowerCase()}/achievements`, {
            ...headers(),
            timeout: 2000,
            params: {
              region: creds.origin,
              namespace: "profile-eu",
              locale: creds.locale,
            }
          });
        })
        .then((response) => {
          const achievements = response.data as CharacterAchievements;
          const interesting = [15499,15309]; //15499 SL KSM S3 | 15078 SL KSM S2 | 15309 Timewalking mage tower
          enrichedCharacter.achievements = achievements.achievements.filter((ach) => {
            return !!ach.criteria && ach.criteria.is_completed && interesting.includes(ach.id);
          });
        })
        .then(wait)
        .then(() => { 
          enrichedRoster.push(enrichedCharacter);
        })
        .then(() => {
          console.log(`Updated ${member.character.name}`);
        })
        .catch((error) => {
          if(enrichedCharacter && enrichedCharacter.name && enrichedCharacter.media){
            enrichedRoster.push(enrichedCharacter);
          }
          handelError(error);
        })
        .then(()=>{
          return getCharacterRuns(member.character.name);
        }).then((profile)=>{
          profiles.push(profile);
        });
    });
    return promise.then(() => {
      writeFile("./src/json/roster.json", JSON.stringify(enrichedRoster), (err) => {
        if (err) {
          return console.error(err);
        }
        console.log("File created!");
      });
    }).then(()=>{
      const runs = compileGuildRuns(profiles);
      const filtered = Object.keys(runs).map((key)=>{
        if(runs[key].names.length >= 3){
          return runs[key];
        }
      }).filter((run) => !!run);
      writeFile("./src/json/mplusruns.json", JSON.stringify(filtered), (err) => {
        if (err) {
          return console.error(err);
        }
        console.log("M+ Files created!");
      });
    });
  }
  catch (error) {
    handelError(error);
  }
};
update();

