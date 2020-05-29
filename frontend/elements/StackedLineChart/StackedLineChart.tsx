import React from 'react'
import { ResponsiveLine } from '@nivo/line'

interface Props {
  data: Array<{
    x: number | string | Date
    y: number | string | Date
  }>,
  id: string
  color: string
}

const StackedLineChart = ({
  data,
  id,
  color
}: Props) => {
  
  const serie = [{
    data, id, color
  }]
  
  return (<div>
      <ResponsiveLine
      data={serie}
      margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
      xScale={{
        type: 'time',
        format: '%Y-%m-%d',
        precision: 'day'
      }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
      curve="monotoneX"
      xFormat="time:%Y-%m-%d"
      axisLeft={{
        tickValues: 2,
        legendOffset: 12,
      }}
      axisBottom={{
        format: '%b %d',
        tickValues: 'every 2 days',
        legendOffset: -12,
      }}
      enablePointLabel={true}
      pointSize={16}
      pointBorderWidth={1}
      pointBorderColor={{
        from: 'color',
        modifiers: [['darker', 0.3]],
      }}
      useMesh={true}
      enableSlices={'x'}
      colors={{ scheme: 'paired' }}
      lineWidth={0}
      enablePoints={false}
      enableArea={true}
      areaOpacity={1}
      animate={false}
      />
    </div>)
}

StackedLineChart.displayName = 'StackedLineChart'

export default StackedLineChart