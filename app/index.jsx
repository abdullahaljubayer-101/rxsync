import Button from "@/component/Button";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-200">
        <Image
          className="size-40"
          source={require("../assets/images/logo-t.png")}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-gray-200">
      <View className="flex-1 justify-end items-center">
        <Image
          className="size-40"
          source={require("../assets/images/logo-t.png")}
        />
      </View>

      <View className="flex-1 justify-end items-center mb-10">
        <Button
          label={"Get Started"}
          onPress={() => router.navigate("/onboarding/onboarding01")}
        />
      </View>
    </SafeAreaView>
  );
}
