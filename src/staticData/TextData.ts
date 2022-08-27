type rowType = {
  color: string
  rowItems: Array<string>
}
type propType = {
  rows: Array<rowType>
}

export const obj: propType = {
  rows: [
    {
      color: 'white',
      rowItems: [
        'AQI',
        'Air Pollution Level',
        'Health Implications',
        'Cautionary Statement',
      ],
    },
    {
      color: 'green',
      rowItems: [
        '0 - 50',
        'Good',
        'Air quality is considered satisfactory, and air pollution poses little or no risk',
        'None',
      ],
    },
    {
      color: 'yellow',
      rowItems: [
        '51 -100',
        'Moderate',
        'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.',
        'Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.',
      ],
    },
    {
      color: 'orange',
      rowItems: [
        '101-150',
        '	Unhealthy for Sensitive Groups',
        '	Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.',
        'Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.',
      ],
    },
    {
      color: 'red',
      rowItems: [
        '151-200',
        'Unhealthy',
        'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects',
        'Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion',
      ],
    },
    {
      color: 'blue',
      rowItems: [
        '151-200',
        'Unhealthy',
        'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects',
        'Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion',
      ],
    },
    {
      color: 'violet',
      rowItems: [
        '201-300',
        'Very Unhealthy',
        'Health warnings of emergency conditions. The entire population is more likely to be affected.',
        'Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion.',
      ],
    },
    {
      color: 'grey',
      rowItems: [
        '300+',
        'Hazardous',
        'Health alert: everyone may experience more serious health effects',
        'Everyone should avoid all outdoor exertion',
      ],
    },
  ],
}

export const text =
  'Think of the AQI as a yardstick that runs from 0 to 500. The higher the AQI value, the greater the level of air pollution and the greater the health concern. For example, an AQI value of 50 or below represents good air quality, while an AQI value over 300 represents hazardous air quality.For each pollutant an AQI value of 100 generally corresponds to an ambient air concentration that equals the level of the short-term national ambient air quality standard for protection of public health. AQI values at or below 100 are generally thought of as satisfactory. When AQI values are above 100, air quality is unhealthy: at first for certain sensitive groups of people, then for everyone as AQI values get higher.The AQI is divided into six categories. Each category corresponds to a different level of health concern. Each category also has a specific color. The color makes it easy for people to quickly determine whether air quality is reaching unhealthy levels in their communities.'
