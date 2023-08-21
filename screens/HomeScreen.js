import { Text, View, SafeAreaView, Image, TextInput, Pressable } from "react-native"
import { StatusBar } from "expo-status-bar"
import { theme } from "../themes"
import { MagnifyingGlassIcon } from "react-native-heroicons/outline"
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
      </SafeAreaView>

    </View>
  )
}

export default HomeScreen