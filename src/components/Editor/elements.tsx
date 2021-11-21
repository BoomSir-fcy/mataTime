import {
  Slate,
  Editable,
  ReactEditor,
  withReact,
  useSelected,
  useFocused,
  useSlate
} from 'slate-react'
import {FollowPopup} from 'components'
import {MentionBox} from './style'
export const Mention = ({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()
  return (
    <MentionBox
      {...attributes}
      contentEditable={false}
      style={{
        boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
      }}
    >
       {/* <FollowPopup uid={element.attrs.userid}> */}
         <span 
      {...element.attrs}
      >
          {element.character}
         </span>
       {/* </FollowPopup> */}
      {children}
    </MentionBox>
  )
}
export const InlineChromiumBugfix = () => (
  <span
    contentEditable={false}
    style={{fontSize:0}}
  >
    {String.fromCodePoint(160) /* Non-breaking space */}
  </span>
)
export const  TopicElement = ({ attributes, children, element }) => {
  return (
    <>
    <span {...attributes}>
      {/* {children} */}
      #
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
      #
    </span>
    </>
  )
}