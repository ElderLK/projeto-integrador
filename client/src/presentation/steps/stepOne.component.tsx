import * as React from 'react';
import {
  Grid,
  List,
  Card,
  Button,
  ListItem,
  Checkbox,
  ListItemText,
  ListItemIcon,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';

function replaceSequence(a: string): string {
  // eslint-disable-next-line no-useless-escape
  return a?.replace(/[^'A\+'|'A\-'|'B\+'|'B\-'| 'A\+B\+'|'A\-B\-'|'A\-B\+'|'A\+B\-']/g, '')
}

const sequencesValues = ['A+', 'A-', 'B+', 'B-', 'A+B+', 'A-B-', 'A+B-', 'A-B+'];

type Props = {
  handleCallbackSequence: (seq: string[]) => void;
};

export const StepOne: React.FC<Props> = ({ handleCallbackSequence }: Props) => {
  const [nrAtuadores, setNrAtuadores] = React.useState(2);
  const [right, setRight] = React.useState<string[]>([])
  const [sequences, setSequences] = React.useState<string[]>(sequencesValues)

  const [checkedChoices, setCheckedChoices] = React.useState<string[]>([])
  const [checkedChosen, setCheckedChosen] = React.useState<string[]>([])
  

  React.useEffect(() => {
    const aux = right.map((r) => replaceSequence(r))
    handleCallbackSequence(aux);
  }, [right, handleCallbackSequence]);

  React.useEffect(() => {
    if(nrAtuadores > 1) {
      setSequences(sequencesValues)
    } else {
      setSequences(sequencesValues.filter(s => !s.includes("B")))
      setCheckedChoices([])
      setCheckedChosen([])
      setRight([])
    }
  }, [nrAtuadores])

  const handleToggle = (value: string, title: string) => () => {
    if(title === "choices") {
      const lastChosen = replaceSequence(right[right.length - 1])

      if(lastChosen == null || replaceSequence(value) !== lastChosen) {
        setCheckedChoices((cur) => {
          const idx = cur.indexOf(value)
          if(idx !== -1) {
            cur.splice(idx, 1)
          } else {
            cur.push(value)
          }
    
          return [...cur]
        })
      }
    } else {
      setCheckedChosen((cur) => {
        const idx = cur.indexOf(value)
        if(idx !== -1) {
          cur.splice(idx, 1)
        } else {
          cur.push(value)
        }
  
        return [...cur]
      })
    }
  };

  const customList = (title: string, items: readonly string[]) => (
    <Card sx={{ marginTop: 10 }}>
      <List
        sx={{
          width: 200,
          height: 324,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value: string, idx) => {
          const labelId = `${value}${idx}`;

          return (
            <ListItem
              key={labelId}
              role="listitem"
              button
              onClick={handleToggle(labelId, title)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checkedChoices.indexOf(labelId) !== -1 || checkedChosen.indexOf(labelId) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={replaceSequence(value)} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
       <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Numero de atuadores</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={nrAtuadores}
          label="Numero de atuadores"
          onChange={(e) => { setNrAtuadores(Number(e.target.value)) }}
          
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
        </Select>
      </FormControl>
    <Grid container spacing={2} justifyContent="center" alignItems="center">

      <Grid item>{customList('choices', sequences)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={() => {
              setRight((current) => {
                return [...current, ...checkedChoices]
              })
              setCheckedChoices([])
            }}
            disabled={checkedChoices.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={() => {
              // console.log("checkedChosen", checkedChosen)
              // console.log("checkedChosen", right)
              const auxIdx = checkedChosen.map(c => Number(c.charAt(c.length - 1))).sort((a, b) => b - a)

              setRight((current) => {
                let aux = current
                if(auxIdx.length > 0) {
                  auxIdx.map(idx => aux.splice(idx, 1))
                }
                return [...aux]
              })
              setCheckedChosen([])
            }}
            disabled={checkedChosen.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('chosen', right)}</Grid>
    </Grid>
    </Box>
  );
};


