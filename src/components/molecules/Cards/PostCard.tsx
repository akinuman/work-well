import React from 'react'
import ReactionButton from '../Buttons/ReactionButton'
import FastImage from 'react-native-fast-image'

import tw from '../../../styles/tailwind'
import { FeatherIcon } from '../../../utils/Icons'
import { TouchableOpacity, View, Text } from 'react-native'

import { useNavigate } from '../../../config/RootNavigation'
import { userStore } from '../../../lib/stores/auth'

import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

export interface PostCardProps {
  id: string
  url?: string
  title: string
  description: string
  storageId: string
}

type PostCardType = (props: PostCardProps) => JSX.Element

const PostCard: PostCardType = ({
  id,
  title,
  description,
  storageId,
}): JSX.Element => {
  const { userId } = userStore()

  const getPostImage = useQuery(api.post.useGetPostImages, { storageId })

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={tw`flex-col w-full p-3 gap-y-3`}
      onPress={() => useNavigate('ViewPostScreen', { id })}
    >
      {getPostImage ? (
        <FastImage
          style={tw`w-full h-[15rem] rounded-3xl bg-accent-8`}
          resizeMode={FastImage.resizeMode.cover}
          source={{
            uri: `${getPostImage}`,
            priority: FastImage.priority.normal,
          }}
        />
      ) : (
        <View style={tw`w-full h-[15rem] rounded-3xl bg-accent-8`} />
      )}
      <View style={tw`flex-col w-full px-3 gap-y-2`}>
        <View style={tw`flex-row items-center justify-between w-full gap-x-2`}>
          <Text style={tw`default-text-color font-dosis-bold text-base`}>
            {title}
          </Text>
          <View style={tw`flex-row items-center gap-x-2`}>
            <ReactionButton
              postId={id}
              userId={userId}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              style={tw`flex-row items-center gap-x-1`}
            >
              <FeatherIcon
                name="message-circle"
                color="#E39400"
                size={18}
              />
              <Text style={tw`font-dosis text-accent-9 text-sm`}>0</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`flex-row items-center justify-between w-full gap-x-2`}>
          <Text style={tw`default-text-color font-dosis text-sm`}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default PostCard
