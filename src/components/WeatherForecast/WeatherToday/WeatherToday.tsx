import React from 'react'
import { ImSun } from 'react-icons/im'
import { IconContext } from 'react-icons'
import { WiCloudyWindy } from 'react-icons/wi'
import {
  BsCloudFog,
  BsClouds,
  BsCloudDrizzle,
  BsCloudSnow,
  BsCloudRain,
  BsCloudLightningRain,
} from 'react-icons/bs'
import { useBackgroundColor } from '../../../hooks/useBackgroundColor'
import { mapTemperatureUnit } from '../../../helpers/weather'
import {
  WeatherTodayContainer,
  WeatherTodayBox,
  Day,
  DayFeeling,
  Temperature,
  Icon,
  OtherInfo,
} from './WeatherToday.styles'

interface WeatherTodayProps {
  temperature: number
  dayFeeling: string
  windDirection: string
  windSpeed: number
  airHumidity: number
  airPressure: number
  dayFeelingIconName: string
  measurementUnit: string
  onMeasurementUnitChange: Function
}

const WeatherToday = ({
  temperature,
  dayFeeling,
  windDirection,
  windSpeed,
  airHumidity,
  airPressure,
  dayFeelingIconName,
  measurementUnit,
  onMeasurementUnitChange,
}: WeatherTodayProps) => {
  const backgroundColor = useBackgroundColor('celsius', temperature, 0, 0.92)
  return (
    <IconContext.Provider value={{ size: '80%' }}>
      <WeatherTodayContainer backgroundColor={backgroundColor}>
        <WeatherTodayBox>
          <Icon>{WeatherIcon(dayFeelingIconName)}</Icon>
        </WeatherTodayBox>
        <WeatherTodayBox>
          <Day>HOJE</Day>
          <Temperature onClick={onMeasurementUnitChange}>
            {mapTemperatureUnit(temperature, measurementUnit)}
          </Temperature>
          <DayFeeling>{dayFeeling}</DayFeeling>
          <OtherInfo>
            Vento: {windDirection} {windSpeed && `${windSpeed}km/h`}
          </OtherInfo>
          <OtherInfo>Humidade: {airHumidity && `${airHumidity}%`}</OtherInfo>
          <OtherInfo>Pressão: {airPressure && `${airPressure}hPA`}</OtherInfo>
        </WeatherTodayBox>
      </WeatherTodayContainer>
    </IconContext.Provider>
  )
}

const WeatherIcon = (iconName: string) => {
  const iconList = {
    Atmosphere: <WiCloudyWindy />,
    Clear: <ImSun />,
    Clouds: <BsClouds />,
    Drizzle: <BsCloudDrizzle />,
    Fog: <BsCloudFog />,
    Mist: <BsCloudFog />,
    Rain: <BsCloudRain />,
    Snow: <BsCloudSnow />,
    Thunderstorm: <BsCloudLightningRain />,
  }
  if (iconName) {
    return (iconList as any)[iconName]
  }
  return <></>
}

export default WeatherToday
