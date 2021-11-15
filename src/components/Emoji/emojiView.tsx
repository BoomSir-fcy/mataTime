import React from "react";
import { Picker } from 'emoji-mart';

import 'emoji-mart/css/emoji-mart.css';

export const EmojiView: React.FC<{
  selectedEmoji: (data: string) => void
}> = React.memo(({ selectedEmoji }) => {
  return(
    <Picker 
      set="twitter"
      tooltip
      showPreview={false} 
      showSkinTones={false} 
      style={{ position: 'absolute', left: 0, top: 40 }}
      onClick={(emoji, e) => e.nativeEvent.stopImmediatePropagation()}
      onSelect={emoji => selectedEmoji(emoji.native)} />
  )
});
