import { useState } from "react";
import { Text, View } from "react-native";



type Props = {
    onSend: (text: string) => void;
  };
  

export default function TypeResponse({onSend}: Props){
    const [value, setValue] = useState("");
    return(
        <View>
            <Text>Hello, this is "tap" response</Text>
        </View>
    );
}