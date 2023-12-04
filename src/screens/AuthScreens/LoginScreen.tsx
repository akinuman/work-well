import React from 'react'
import AuthLayout from '../../components/templates/AuthLayout'
import {
  BackHandler,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'

import tw from '../../styles/tailwind'
import { useNavigate } from '../../config/RootNavigation'
import { useBackHandler } from '../../lib/hooks/useBackHandler'
import { loginStore } from '../../lib/stores/auth'
import { useLoginMutation } from '../../lib/functions/useAuth'

import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'

const LoginScreen = (): JSX.Element => {
  const {
    isLoading,
    error,
    email,
    password,
    setEmail,
    setPassword,
    setIsLoading,
    setError,
    setDefault,
  } = loginStore()

  const loginMutation = useMutation(api.auth.login)

  const handleLogin = async () => {
    setIsLoading(true)

    useLoginMutation({
      email,
      password,
      setError,
      setIsLoading,
      setDefault,
      loginMutation,
    })
  }

  useBackHandler(() => {
    setDefault()
    BackHandler.exitApp()
  })

  return (
    <AuthLayout>
      <View style={tw`flex-col w-full gap-y-3`}>
        {error && (
          <View
            style={tw`flex-row justify-center w-full p-3 rounded-xl bg-red-400`}
          >
            <Text style={tw`font-dosis text-xs text-white`}>
              {error.toString()}
            </Text>
          </View>
        )}
        <View style={tw`flex-col w-full gap-y-2`}>
          <Text style={tw`ml-2 font-dosis text-sm default-text-color`}>
            Email
          </Text>
          <TextInput
            style={tw`default-text-input`}
            keyboardType="email-address"
            value={email}
            onChangeText={(value) => {
              setEmail(value)
              setError('')
            }}
          />
        </View>
        <View style={tw`flex-col w-full gap-y-2`}>
          <Text style={tw`ml-2 font-dosis text-sm default-text-color`}>
            Password
          </Text>
          <TextInput
            style={tw`default-text-input`}
            secureTextEntry={true}
            value={password}
            onChangeText={(value) => {
              setPassword(value)
              setError('')
            }}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={tw.style(
            'flex-row items-center justify-center w-full p-4 rounded-xl bg-accent-2',
            isLoading && 'opacity-50'
          )}
          onPress={handleLogin}
        >
          <Text style={tw`font-dosis text-white`}>
            {isLoading ? 'Loading...' : 'Log in'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={tw`flex-row items-center justify-center w-full`}
        >
          <Text style={tw`font-dosis default-text-color`}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={tw`flex-row items-center justify-center w-full p-4 rounded-xl bg-accent-9`}
          onPress={() => {
            setDefault()
            useNavigate('RegisterScreen')
          }}
        >
          <Text style={tw`font-dosis text-white`}>Create account</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  )
}

export default LoginScreen
