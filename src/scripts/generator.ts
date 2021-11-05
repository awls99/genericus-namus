import { creds } from "./blizzCreds";
import axios, { AxiosError } from "axios";
import { EnrichedCharacter, MediaList, PlayableClass, Roster, Token } from "../models/models";
import * as apiClasses from "../json/classes.json"
import { writeFile } from "fs";
import * as qs from "querystring"
import { CharacterAchievements } from "../models/achievements";

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
    const members = roster.members.filter((m) => m.rank <= 3);
    let promise = Promise.resolve();
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
          const interesting = [15078]; // 15078 SL KSM S2
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
        });
    });
    return promise.then(() => {
      writeFile("./src/json/roster.json", JSON.stringify(enrichedRoster), (err) => {
        if (err) {
          return console.error(err);
        }
        console.log("File created!");
      });
    })
  }
  catch (error) {
    handelError(error);
  }
};
update();
