import React from 'react';
import { Button, Text, View } from 'react-native';

export default function SignInPage({route, navigation}) {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className={`text-white`}>Sign In</Text>

      <Button
        title="Go to Sign Up"
        onPress={() => navigation.navigate('SignUpPage')}
      />
    </View>
  );
}