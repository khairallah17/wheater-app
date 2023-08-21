import { Text, View, SafeAreaView, Image, TextInput, Pressable, ScrollView } from "react-native"
import { StatusBar } from "expo-status-bar"
import { theme } from "../themes"
import { CalendarDaysIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import { MapPinIcon } from "react-native-heroicons/solid"
import { useState } from "react"

const HomeScreen = () => {

  const [showSearchInput, setShowSearchInput] = useState(false)
  const [locations, setlocations] = useState([1, 2, 3])

  const locationHandler = (location) => {
    console.log(location)
  }

  return (
    <View className="flex-1 relative">
        <StatusBar style="dark" />
        <Image blurRadius={70} source={require("../assets/images/bg.png")} className="h-full w-full absolute" />

      <SafeAreaView className="flex flex-1">
        {/* SEARCH AREA */}

        <View style={{height: "7%"}} className="mx-4 relative z-50">
          <View className="flex-row justify-end items-center rounded-full" style={{
            backgroundColor: showSearchInput ? theme.bgWhite(0.2) : null
          }}>
            {
              showSearchInput && <TextInput placeholder="Search city" placeholderTextColor={'lightgray'} className="h-10 pl-6 flex-1 text-white"/>
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

                    const onPress = (location) => locationHandler(location)

                    return (
                      <Pressable className={`flex-row items-center border-0 gap-1 p-3 ${border}`} key={index}>
                        <MapPinIcon color='gray' />
                        <Text className="text-lg text-black">
                          Morocco, khouribga
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
              Morocco
              <Text className="font-light text-xl text-gray-300">
                ,Khouribga
              </Text>
            </Text>
            <View className="flex-row justify-center">
              <Image source={require("../assets/images/partlycloudy.png")} className="w-52 h-52" />
            </View>

            {/* DETAILS */}
            <View className="space-y-2">
              <Text className="text-white font-bold text-6xl text-center ml-5">
                23&#176;
              </Text>
              <Text className="text-lg text-gray-300 text-center capitalize tracking-widest">
                partly cloudy
              </Text>
            </View>
             
            {/* OTHER STATS */}
            <View className="flex-row mx-4 justify-between">

              <View className="flex-row space-x-2 items-center">
                <Image source={require("../assets/icons/wind.png")} className="h-6 w-6" />
                <Text className="text-white font-semibold text-base">
                  25km
                </Text>
              </View>

              <View className="flex-row space-x-2 items-center">
                <Image source={require("../assets/icons/drop.png")} className="h-6 w-6" />
                <Text className="text-white font-semibold text-base">
                  23%
                </Text>
              </View>

              <View className="flex-row space-x-2 items-center">
                <Image source={require("../assets/icons/sun.png")} className="h-6 w-6" />
                <Text className="text-white font-semibold text-base">
                  6:03AM
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

                <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.bgWhite(.15)}}>

                  <Image className="h-11 w-11" source={require("../assets/images/heavyrain.png")} />
                  <Text className="text-white">
                    Monday
                  </Text>
                  <Text className="text-white text-xl font-semibold">
                    13&#176;
                  </Text>

                </View>

                <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.bgWhite(.15)}}>

                  <Image className="h-11 w-11" source={require("../assets/images/heavyrain.png")} />
                  <Text className="text-white">
                  Tuesday
                  </Text>
                  <Text className="text-white text-xl font-semibold">
                    13&#176;
                  </Text>

                </View>

                <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.bgWhite(.15)}}>

                <Image className="h-11 w-11" source={require("../assets/images/heavyrain.png")} />
                <Text className="text-white">
                Wednesday
                </Text>
                <Text className="text-white text-xl font-semibold">
                  13&#176;
                </Text>

                </View>

                <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.bgWhite(.15)}}>

                <Image className="h-11 w-11" source={require("../assets/images/heavyrain.png")} />
                <Text className="text-white">
                Thursday
                </Text>
                <Text className="text-white text-xl font-semibold">
                  13&#176;
                </Text>

                </View>

                <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.bgWhite(.15)}}>

                <Image className="h-11 w-11" source={require("../assets/images/heavyrain.png")} />
                <Text className="text-white">
                Friday
                </Text>
                <Text className="text-white text-xl font-semibold">
                  13&#176;
                </Text>

                </View>

                <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.bgWhite(.15)}}>

                <Image className="h-11 w-11" source={require("../assets/images/heavyrain.png")} />
                <Text className="text-white">
                  Staturday
                </Text>
                <Text className="text-white text-xl font-semibold">
                  13&#176;
                </Text>

                </View>

                <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" style={{backgroundColor: theme.bgWhite(.15)}}>

                <Image className="h-11 w-11" source={require("../assets/images/heavyrain.png")} />
                <Text className="text-white">
                  Sunday
                </Text>
                <Text className="text-white text-xl font-semibold">
                  13&#176;
                </Text>

                </View>

              </ScrollView>
              
            </View>
            
          </View>

      </SafeAreaView>

    </View>
  )
}

export default HomeScreen