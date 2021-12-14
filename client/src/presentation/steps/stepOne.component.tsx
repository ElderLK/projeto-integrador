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
} from '@mui/material';

function not(a: readonly string[], b: readonly string[]) {
  return a
    .filter((value) => b.indexOf(value.replace(/[0-9]/g, '')) === -1)
    ?.map((v) => v.replace(/[0-9]/g, ''));
}

function intersection(a: readonly string[], b: readonly string[]) {
  return a
    .filter((value) => b.indexOf(value.replace(/[0-9]/g, '')) !== -1)
    ?.map((v) => v.replace(/[0-9]/g, ''));
}

const sequences = ['A+', 'A-', 'B+', 'B-', 'A+B+', 'A-B-', 'A+B-', 'A-B+'];

type Props = {
  handleCallbackSequence: (seq: string[]) => void;
};

export const StepOne: React.FC<Props> = ({ handleCallbackSequence }: Props) => {
  const [checked, setChecked] = React.useState<readonly string[]>([]);
  const [right, setRight] = React.useState<string[]>([]);

  const leftChecked = intersection(checked, sequences);
  const rightChecked = intersection(checked, right);

  React.useEffect(() => {
    handleCallbackSequence(right);
  }, [right, right.length, handleCallbackSequence]);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title: React.ReactNode, items: readonly string[]) => (
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
              onClick={handleToggle(labelId)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(labelId) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList('Choices', sequences)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Chosen', right)}</Grid>
    </Grid>
  );
};
