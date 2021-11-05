import axios, { AxiosError } from "axios";
import { RIOProfile } from "../models/raider.ts.model";

const rioBase = "https://raider.io/api/v1"
export const getCharacterRuns = async (name: string):Promise<RIOProfile> => {
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
    return rioProfile;
  }
  catch {
    console.log("Failed to get recent mythic plus runs");
    return {} as RIOProfile;
  }
}

export const compileGuildRuns = (profiles: RIOProfile[]):GuildRuns => {
  const guildRuns: GuildRuns = {};
  profiles.forEach((profile) => {
    if(!profile.mythic_plus_recent_runs) return;
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