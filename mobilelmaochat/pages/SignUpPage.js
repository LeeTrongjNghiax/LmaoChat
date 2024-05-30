import React from 'react';
import { Button, Text, View } from 'react-native';

export default function SignUpPage({route, navigation}) {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className={`text-white`}>Sign Up</Text>

      <Button
        title="Go back to Sign In"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}