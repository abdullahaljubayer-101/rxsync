import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function Button({ label, onPress, type }) {
  return (
    <TouchableOpacity
      className={
        type === "error"
          ? "bg-red-500 px-10 py-4 rounded-full shadow shadow-red-500/50"
          : "bg-green-500 px-10 py-4 rounded-full shadow shadow-green-500/50"
      }
      onPress={onPress}
    >
      <Text className="text-gray-200 text-xl font-bold">{label}</Text>
    </TouchableOpacity>
  );
}
