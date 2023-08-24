import { Text, View, SafeAreaView, Image, TextInput, Pressable, ScrollView } from "react-native"
import { StatusBar } from "expo-status-bar"
import { theme } from "../themes"
import { CalendarDaysIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import { MapPinIcon } from "react-native-heroicons/solid"
import { useCallback, useEffect, useState } from "react"
import { debounce } from "lodash"
import { fetchLocations, fetchWeatherForcast } from "../api/weather."
import { weatherImages } from "../constants"
import * as Progress from "react-native-progress"
import { storeData, getData  } from "../utils/asyncStorage"

const HomeScreen = () => {

  const [showSearchInput, setShowSearchInput] = useState(false)
  const [locations, setlocations] = useState([])
  const [weather, setWeather] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      fetchWeatherForcast({
        cityName: await getData("city") || "casablanca",
        days: '7'
      }).then(data => {
        setWeather(data)
        setLoading(false)
      })
    }

    fetch()
  }, [])

  const handleSearch = value => {
    if (value.length > 2) {
      fetchLocations({cityName: value}).then((data) => {
        setlocations(data)
      })
    }
  }
  
  const locationHandler = (location) => {
    setlocations([])
    setLoading(true)
    fetchWeatherForcast({
      cityName: location?.name,
      days: '7'
    }).then(data => {
      setShowSearchInput(false)
      setWeather(data)
      setLoading(false)
      storeData("city", location.name)
    })
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), [])

  const { current, location } = weather

  return (
    <View className="flex-1 relative">
        <StatusBar style="dark" />
        <Image blurRadius={70} source={require("../assets/images/bg.png")} className="h-full w-full absolute" />

        {
          loading ? 
(          <View className="flex-1 items-center justify-center">
            <Progress.CircleSnail thickness={7} size={80} color="#0bb3b2" />
          </View>) : 
          (<SafeAreaView className="flex flex-1">
            {/* SEARCH AREA */}
    
            <View style={{height: "7%"}} className="mx-4 relative z-50">
              <View className="flex-row justify-end items-center rounded-full" style={{
                backgroundColor: showSearchInput ? theme.bgWhite(0.2) : null
              }}>
                {
                  showSearchInput && <TextInput placeholder="Search city" onChangeText={handleTextDebounce} placeholderTextColor={'lightgray'} className="h-10 pl-6 flex-1 text-white"/>
                }
                <Pressable onPress={() => setShowSearchInput(!showSearchInput)} style={{backgroundColor: theme.bgWhite(0.3)}} className="rounded-full p-3 m-1">
                  <MagnifyingGlassIcon color="white" />
                </Pressable>
              </View>
              {
                locations.length > 0 && showSearchInput ? (
                  <View className="absolute bg-gray-300 w-full top-16 rounded-3xl overflow-hidden">
                    {
                      locations.map((location, index) => {
                        let showBorder = index + 1 != locations.length
                        let border = showBorder ? "border-gray-400  border-b-2" : ''
    
                        return (
                          <Pressable onPress={() => locationHandler(location)} className={`flex-row items-center border-0 gap-1 p-3 ${border}`} key={index}>
                            <MapPinIcon color='gray' />
                            <Text className="text-lg text-black">
                              {location?.name}, {location?.country}
                            </Text>
                          </Pressable>
                        )
                      })
                    }
                  </View>
                ) : null
              }
            </View>
    
              {/* FORECASR DETAILS */}
              <View className="mx-4 flex justify-around flex-1 mb-2">
    
                {/* DETAILS */}
                <Text className="font-bold text-2xl text-white text-center">
                  {location?.name}
                  <Text className="font-light text-xl text-gray-300">
                    , {location?.country}
                  </Text>
                </Text>
                <View className="flex-row justify-center">
                  <Image source={weatherImages[current?.condition?.text]} className="w-52 h-52" />
                </View>
    
                {/* DETAILS */}
                <View className="space-y-2">
                  <Text className="text-white font-bold text-6xl text-center ml-5">
                    {current?.temp_c}&#176;
                  </Text>
                  <Text className="text-lg text-gray-300 text-center capitalize tracking-widest">
                    {current?.condition?.text}
                  </Text>
                </View>
                  
                {/* OTHER STATS */}
                <View className="flex-row mx-4 justify-between">
    
                  <View className="flex-row space-x-2 items-center">
                    <Image source={require("../assets/icons/wind.png")} className="h-6 w-6" />
                    <Text className="text-white font-semibold text-base">
                      {current?.wind_kph}km
                    </Text>
                  </View>
    
                  <View className="flex-row space-x-2 items-center">
                    <Image source={require("../assets/icons/drop.png")} className="h-6 w-6" />
                    <Text className="text-white font-semibold text-base">
                      {current?.humidity}%
                    </Text>
                  </View>
    
                  <View className="flex-row space-x-2 items-center">
                    <Image source={require("../assets/icons/sun.png")} className="h-6 w-6" />
                    <Text className="text-white font-semibold text-base">
                      {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                    </Text>
                  </View>
    
                </View>
    
                {/* FORECAST NEXT DAYS */}
                <View className="mb-2 space-y-3">
                  <View className="flex-row items-center mx-5 space-x-2">
                    <CalendarDaysIcon color={'white'} />
                    <Text className="text-white text-base capitalize">
                      daily forecast
                    </Text>
                  </View>
    
                  <ScrollView
                    horizontal
                    contentContainerStyle={{paddingHorizontal: 15}}
                    showsHorizontalScrollIndicator={false}
                  >
                    {
                      weather?.forecast?.forecastday?.map((item, index) => {
    
                        let date = new Date(item?.date)
                        let options = {weekday: 'long'}
                        let dayName = date.toLocaleDateString('en-US', options)
    
                      return(<View key={index} className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.bgWhite(.15)}}>
    
                        <Image className="h-11 w-11" source={weatherImages[item?.day?.condition?.text]} />
                        <Text className="text-white">
                          {dayName.split(",")[0]}
                        </Text>
                        <Text className="text-white text-xl font-semibold">
                          {item?.day?.avgtemp_c}&#176;
                        </Text>
    
                      </View> 
                      )})
                    }
    
    
                  </ScrollView>
                  
                </View>
                
              </View>
    
          </SafeAreaView>)
        }

    </View>
  )
}

export default HomeScreen