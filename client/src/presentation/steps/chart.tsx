import { ResponsiveLine } from '@nivo/line'

const dataValues = [
    {
      "id": "japan",
      "color": "hsl(212, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 155
        },
        {
          "x": "helicopter",
          "y": 26
        },
        {
          "x": "boat",
          "y": 196
        },
        {
          "x": "train",
          "y": 105
        },
        {
          "x": "subway",
          "y": 144
        },
        {
          "x": "bus",
          "y": 257
        },
        {
          "x": "car",
          "y": 189
        },
        {
          "x": "moto",
          "y": 195
        },
        {
          "x": "bicycle",
          "y": 33
        },
        {
          "x": "horse",
          "y": 39
        },
        {
          "x": "skateboard",
          "y": 146
        },
        {
          "x": "others",
          "y": 124
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(351, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 104
        },
        {
          "x": "helicopter",
          "y": 73
        },
        {
          "x": "boat",
          "y": 47
        },
        {
          "x": "train",
          "y": 49
        },
        {
          "x": "subway",
          "y": 247
        },
        {
          "x": "bus",
          "y": 70
        },
        {
          "x": "car",
          "y": 286
        },
        {
          "x": "moto",
          "y": 206
        },
        {
          "x": "bicycle",
          "y": 275
        },
        {
          "x": "horse",
          "y": 240
        },
        {
          "x": "skateboard",
          "y": 128
        },
        {
          "x": "others",
          "y": 216
        }
      ]
    }
  ]

  type ChartLineData = {
    id: string;
    data: Array<{
      x: number;
      y: number;
    }>;
  };
  

type Props = { 
    data: ChartLineData[] 
}


const MyResponsiveLine = ({ data }: Props) => (
  // <ResponsiveLine
  //     data={dataValues}
  //     enableSlices={false}
  //     margin={{ top: 20, right: 20, bottom: 25, left: 20 }}
  //     xScale={{ type: "point" }}
  //     yScale={{
  //       type: "linear",
  //       min: "auto",
  //       max: "auto",
  //       stacked: false,
  //       reverse: false,
  //     }}
  //     curve="linear"
  //     isInteractive
  //     // onClick={() => {}}
  //     axisLeft={null}
  //     axisBottom={{
  //       format: (v) =>
  //         Number(v) % 3 === 0 || v === 1 ? (
  //           <tspan fontSize=".75rem" className={Styles.AxisLabel}>
  //             {v}
  //           </tspan>
  //         ) : (
  //           ""
  //         ),
  //       tickPadding: 5,
  //       tickRotation: 0,
  //     }}
  //     enablePoints={false}
  //     enableArea
  //     // areaBaselineValue={0}
  //     enableGridY={false}
  //     areaBlendMode="multiply"
  //     areaOpacity={0.4}
  //     crosshairType="x"
  //     pointSize={5}
  //     pointColor={{ from: "color", modifiers: [] }}
  //     pointBorderWidth={2}
  //     pointBorderColor={{ from: "serieColor" }}
  //     pointLabel="y"
  //     pointLabelYOffset={-12}
  //     useMesh
  //     layers={[
  //       "grid",
  //       "axes",
  //       "areas",
  //       "crosshair",
  //       "lines",
  //       "points",
  //       "slices",
  //       "mesh",
  //       "legends",
  //       "markers",
  //     ]}
  //   />
    <ResponsiveLine
        data={dataValues}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        // axisBottom={{
        //     orient: 'bottom',
        //     tickSize: 5,
        //     tickPadding: 5,
        //     tickRotation: 0,
        //     legend: 'transportation',
        //     legendOffset: 36,
        //     legendPosition: 'middle'
        // }}
        // axisLeft={{
        //     orient: 'left',
        //     tickSize: 5,
        //     tickPadding: 5,
        //     tickRotation: 0,
        //     legend: 'count',
        //     legendOffset: -40,
        //     legendPosition: 'middle'
        // }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)