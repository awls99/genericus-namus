import axios, { AxiosError } from "axios";
import { Dungeon, RIOProfile, RIOProfileV2, Runs } from "../models/raider.ts.model";

export const getCharacterRuns = async (name: string): Promise<RIOProfile> => {
  const rioBase = "https://raider.io/api/v1"
  let rioProfile: RIOProfile;
  console.log("Getting RIO for " + name);
  try {
    const response = await axios.get(rioBase + "/characters/profile", {
      params: { region: "eu", realm: "magtheridon", name: name, fields: "mythic_plus_recent_runs" },
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
    rioProfile = response.data as RIOProfile;
    rioProfile.timewalks = await getCharactersTimeWalkingRuns(name);
    return rioProfile;
  }
  catch {
    console.log("Failed to get recent mythic plus runs");
    return {} as RIOProfile;
  }
}

const getCharactersTimeWalkingRuns = async (name: string): Promise<Dungeon[]> => {
  console.log("Getting time walking runs for " + name);
  const encodedName = encodeURIComponent(name);
  const rioBase = "https://raider.io/api"
  try {
    const profileResponse = await axios.get(rioBase + `/characters/eu/magtheridon/${encodedName}`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
    const rioProfile = profileResponse.data as RIOProfileV2;
    // console.log("Got time walking runs for " + name, rioProfile);
    // console.log("going to call",rioBase + `/characters/mythic-plus-scored-runs`, {
    //   params: {
    //     season:"season-sl-2-legion-timewalking",
    //     role:"all",
    //     mode:"scored",
    //     affixes:"all",
    //     date:"all",
    //     characterId: rioProfile.characterDetails.character.id,
    //   }});

    const runsResponse = await axios.get(rioBase + `/characters/mythic-plus-scored-runs`, {
      params: {
        season:"season-sl-2-legion-timewalking",
        role:"all",
        mode:"scored",
        affixes:"all",
        date:"all",
        characterId: rioProfile.characterDetails.character.id,
      },
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
    const runs = runsResponse.data as Runs;
    return runs.dungeons;
  }
  catch (error) {
    console.log("Failed to get recent mythic plus Timewalking runs");
    console.log(JSON.stringify(error,null,2));
    return [] as Dungeon[];
  }
}


export const compileGuildRuns = (profiles: RIOProfile[]): GuildRuns => {
  const guildRuns: GuildRuns = {};
  profiles.forEach((profile) => {
    if (!profile.mythic_plus_recent_runs && (!profile.timewalks || profile.timewalks.length === 0)) return;
    profile.mythic_plus_recent_runs.forEach((run) => {
      if (guildRuns[run.url]) {
        guildRuns[run.url].names.push(profile.name);
      } else {
        const newRun: guildRun = {
          names: [profile.name],
          dungeon: run.dungeon,
          level: run.mythic_level,
          success: run.num_keystone_upgrades > 0,
          date: run.completed_at,
        };
        guildRuns[run.url] = newRun;
      }
    });
    profile.timewalks?.forEach((run) => {
      if(guildRuns[run.keystone_run_id]) {
        guildRuns[run.keystone_run_id].names.push(profile.name);
      } else {
        const newRun: guildRun = {
          names: [profile.name],
          dungeon: run.dungeon.name,
          level: run.mythic_level,
          success: run.num_chests > 0,
          date: run.completed_at,
        };
        guildRuns[run.keystone_run_id] = newRun;
      }
    });
  });
  return guildRuns;
}

interface GuildRuns {
  [key: string]: guildRun;
}

interface guildRun {
  names: string[];
  dungeon: string;
  level: number;
  success: boolean;
  date: Date;
}