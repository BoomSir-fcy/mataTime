import React, { useMemo } from 'react'
import getTimePeriods from 'utils/getTimePeriods'
import { Timer } from 'components/Time/Timer'
import { HeadingScales } from 'uikit'
import { useCountdownTime } from '../../../hooks/matter'
// useBlockCountdown


interface BlockTimeProps {
    endTime: number
    startTime?: number
    color?: string
    scale?: HeadingScales
}
const CountdownTime: React.FC<BlockTimeProps> = ({ endTime, startTime, color = 'textPrimary', scale = 'ld', ...props }) => {
    const timeDown = useCountdownTime(endTime)
    const { years, months, days, hours, minutes, seconds } = getTimePeriods(timeDown, true)

    return (
        <Timer fontSize='14px' itemMr="4px" textMr="2px" color={color} scale={scale} years={years} months={months} days={days} hours={hours} minutes={minutes} seconds={seconds} />
    )
}

export default CountdownTime
