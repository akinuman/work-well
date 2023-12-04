import React from 'react'
import FastImage from 'react-native-fast-image'
import tw from '../../styles/tailwind'
import { FeatherIcon } from '../../utils/Icons'
import { View, TouchableOpacity } from 'react-native'

import { userStore } from '../../lib/stores/auth'
import { useNavigate } from '../../config/RootNavigation'

import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

const BottomBar = (): JSX.Element => {
  const { userId } = userStore()
  const profile = useQuery(api.upload.profilePhoto, { userId })

  return (
    <View
      style={tw`relative flex-row items-center justify-around w-full border-t border-accent-8 bg-accent-3`}
    >
      <TouchableOpacity
        activeOpacity={0.5}
        style={tw`p-5`}
        onPress={() => useNavigate('HomeScreen')}
      >
        <FeatherIcon
          name="home"
          color="#222"
          size={25}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        style={tw`p-5`}
        onPress={() => useNavigate('SearchScreen')}
      >
        <FeatherIcon
          name="search"
          color="#222"
          size={25}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        style={tw`p-3 rounded-xl bg-accent-8`}
        onPress={() => useNavigate('CreatePostScreen')}
      >
        <FeatherIcon
          name="plus"
          color="#222"
          size={25}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        style={tw`p-5`}
        onPress={() => useNavigate('InboxScreen')}
      >
        <FeatherIcon
          name="mail"
          color="#222"
          size={25}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.5}
        style={tw`p-5`}
        onPress={() => useNavigate('ProfileScreen')}
      >
        {profile?.url ? (
          <FastImage
            style={tw`rounded-full w-[25px] h-[25px] bg-accent-8`}
            resizeMode={FastImage.resizeMode.cover}
            source={{
              uri: `${profile?.url}`,
              priority: FastImage.priority.normal,
            }}
          />
        ) : (
          <View>
            <FeatherIcon
              name="user"
              color="#222"
              size={25}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default BottomBar
