import React from 'react';
import runs from "../json/mplusruns.json";
import Grid from "@mui/material/Grid/Grid";
import { EnrichedCharacter, MediaType } from '../models/models';
import { Avatar, Card, CardContent, Paper, Stack, Typography } from '@mui/material';
import { GuildRun } from '../models/raider.ts.model';
import roster from "../json/roster.json";
import { ClassColors } from '../models/classColors.enum';

const filteredRoster: EnrichedCharacter[] = roster;

function MplusRuns() {

  const guildRuns = JSON.parse(JSON.stringify(runs)) as GuildRun[]; // parse dates, lazy mode
  guildRuns.sort((run1, run2) => {
    if (run1.date > run2.date) return -1;
    if (run1.date < run2.date) return 1;
    return 0;
  });

  return (
    <Paper sx={{
      padding: "8px",
      marginBottom: "8px",
    }}>
      <Typography variant="h6" color="inherit" component="div" id="roster">Mythic Plus Activity</Typography>
      <Grid container spacing={{ xs: 1, md: 2, lx: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {guildRuns.map((run, index) => {
          if (index > 8) return "";
          return (
            <GuildRunChard run={run} index={index} />
          );
        })}
      </Grid>
    </Paper>
  );
}

export default MplusRuns;

function GuildRunChard(props: { run: GuildRun, index: number }) {
  const { run, index } = props;
  return (
    <Grid item xs={2} sm={4} md={4} key={index}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {run.dungeon} +{run.level}
          </Typography>
          <ClassColloredNames names={run.names}/>
          <Avatars names={run.names} />
          <Typography variant="body2">
            {run.success ? `Beat the timmer!` : `Sadly, went overtime.`}
          </Typography>
        </CardContent>
      </Card>

    </Grid>
  );
}

function Avatars(props: { names: string[] }) {
  const { names } = props;
  const elements = names.map((name) => {
    const avatar = filteredRoster.find((char) => {
      return char.name === name;
    });
    return (
      <Avatar alt={name} src={avatar?.media?.find((media) => { return media.key === MediaType.AVATAR })?.value} />
    );
  });
  return (<Stack direction="row" spacing={2}>
    {elements}
  </Stack>);

}

function ClassColloredNames(props: {names:string[]}){
  const elements = props.names.map((name)=>{
    return <Typography color={getClassColor(name)}>{name}&nbsp;</Typography>
  });
  return  <Stack direction="row" spacing={2}>{elements}</Stack>
}

function getClassColor(name: string) {
  type ClassName = keyof typeof ClassColors;
  const klass = roster.find((member) => {
    return member.name === name;
  })?.playable_class.name.en_GB;
  if(!klass) return "#000000"
  return ClassColors[klass.toUpperCase() as ClassName];
}