import React from "react";
import { Picker } from 'emoji-mart';

import 'emoji-mart/css/emoji-mart.css';

export const EmojiView: React.FC = React.memo(() => {
  return(
    <React.Fragment>
      <Picker 
        emoji='santa'
        showPreview={false} 
        showSkinTones={false} 
        onSelect={(e) => console.log(e)} />
    </React.Fragment>
  )
});

