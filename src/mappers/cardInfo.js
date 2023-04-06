const CHART_OPTIONS = {
    plugins: {
        title: { display: false },
        legend: { display: false }
    },
    hover: { mode: null },
    elements: {
        point: false
    },
    scales: {
        x: {
            display: true,
            title: { display: true },
            offset: true,
            ticks: {
                autoSkip: true,
                stepSize: 1
            },
            grid: {
                drawBorder: true,
                drawTicks: true,
                color: 'transparent',
                borderColor: '#7689a84d',
                tickColor: '#7689a84d'
            }
        },
        y: {
            display: true,
            suggestedMin: 0,
            ticks: {
                beginAtZero: true,
                stepSize: 5
            },
            grid: {
                drawTicks: false,
                drawBorder: false
            }
        }
    }
}

function FormatSecondIntoHours (seconds, justHours = false, justDays = false) {
    let unix_timestamp = seconds

    const date = new Date(unix_timestamp * 1000)

    const hours = date.getHours()

    const minutes = '0' + date.getMinutes()

    let day = date.getUTCDate()

    if (Number(day) < 10) {
        day = '0' + day
    }

    let month = date.getUTCMonth() + 1

    if (Number(month) < 10) {
        month = '0' + month
    }

    const formattedTime = hours + ':' + minutes.substr(-2)

    if (justHours) {
        return hours
    }

    if (justDays) {
        return day + '.' + month
    }

    return formattedTime
}

function dayOrNight (time, sunset, sunrise) {
    if (time < sunrise && time > sunset) {
        return false
    }
    return true
}

export function mapOneCallData (data) {
    const transformItems = Object.values([data.current] || [])

    return transformItems.map(item => ({
        dt: FormatSecondIntoHours(item.dt),
        calendarDay: FormatSecondIntoHours(item.dt, false, true),
        dayPeriod: dayOrNight(FormatSecondIntoHours(item.dt, true), FormatSecondIntoHours(item.sunrise, true), FormatSecondIntoHours(item.sunset, true)),
        sunrise: FormatSecondIntoHours(item.sunrise),
        sunset: FormatSecondIntoHours(item.sunset),
        temperature: Math.round(item.temp),
        feelsLike: Math.round(item.feels_like),
        pressure: `${item.pressure} hPa`,
        humidity: item.humidity,
        dewPoint: Math.round(item.dew_point),
        uvi: item.uvi,
        clouds: item.clouds,
        visibility: `${(item.visibility / 1000).toFixed(1)} km`,
        windSpeed: item.wind_speed,
        windDeg: item.wind_deg,
        windGust: item.wind_gust,
        weatherDescription: item.weather[0].description,
        weatherMain: item.weather[0].main
    }))[0]
}

export function mapFiveDaysForecast (data) {
    const transformItems = Object.values(data.daily || [])
    let fiveDaysData = {
        daysData : [],
        chartData: {}
    }

    fiveDaysData.daysData = transformItems.map(item => ({
        dt: FormatSecondIntoHours(item.dt),
        calendarDay: FormatSecondIntoHours(item.dt, false, true),
        sunrise: FormatSecondIntoHours(item.sunrise),
        sunset: FormatSecondIntoHours(item.sunset),
        temperatureDay: Math.round(item.temp.day),
        temperatureNight: Math.round(item.temp.night),
        feelsLikeDay: Math.round(item.feels_like.day),
        feelsLikeNight: Math.round(item.feels_like.night),
        weatherDescription: item.weather[0].description,
        weatherMain: item.weather[0].main
    }))

    fiveDaysData.daysData.length = 5

    let labels = []
    let chartArray = []

    fiveDaysData.daysData.forEach((item) => {
        labels.push(item.calendarDay)

        let averageTemperature = (item.temperatureDay + item.temperatureNight)/2
        chartArray.push(averageTemperature)
    })

    let chartData = {
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature',
                data: chartArray,
                fill: false,
                borderColor: 'rgb(255, 166, 0)',
                pointRadius: 0,
                tension: 0.3
            }]
        },
        options: CHART_OPTIONS
    }

    fiveDaysData.chartData = chartData

    return fiveDaysData
}

export function mapDefaultData (data) {
    return {
        coord: {
            lat: data.latitude.toFixed(2),
            lon: data.longitude.toFixed(2)
        }
    }
}

function addPrefixToTime (time) {
    if (time < 12) {
        return time + 'am'
    } else {
        return (time - 12) + 'pm'
    }
}

export function mapChartData (data) {
    let labels = []
    let dataArray = []

    const transformItems = Object.values(data.hourly || [])

    transformItems.forEach((item) => {
        labels.push(addPrefixToTime(FormatSecondIntoHours(item.dt, true)))
        dataArray.push(Math.round(item.temp))
    })

    labels.length = 12
    dataArray.length = 12
    
    let chartData = {
        data:{
            labels: labels,
            datasets: [{
                label: 'Temperature',
                data: dataArray,
                fill: false,
                borderColor: 'rgb(255, 166, 0)',
                pointRadius: 0,
                tension: 0.3
            }]
        },
        options: CHART_OPTIONS
    }

    return chartData
}