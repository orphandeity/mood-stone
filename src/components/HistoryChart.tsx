'use client'

import { Analysis } from '@prisma/client'
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

// @ts-ignore
function CustomTooltip({ payload, label, active }) {
  const dateLabel = new Date(label).toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  if (active) {
    const analysis = payload[0].payload
    return (
      <Card>
        <CardHeader>
          <CardTitle>{dateLabel}</CardTitle>
          <CardDescription className="flex items-center gap-2 uppercase">
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: analysis.color }}
            />
            <p>{analysis.mood}</p>
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return null
}

export default function HistoryChart({ data }: { data: Analysis[] }) {
  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>
      <LineChart width={300} height={100} data={data}>
        <Line
          dataKey="sentimentScore"
          type="monotone"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <XAxis dataKey="createdAt" />
        <Tooltip
          content={
            <CustomTooltip
              payload={undefined}
              label={undefined}
              active={undefined}
            />
          }
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
