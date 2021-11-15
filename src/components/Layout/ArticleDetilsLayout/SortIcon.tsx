import styled from "styled-components";
type Iprops = {
  changeSort:()=>void;
  flag:boolean
}
export const SortIcon =(props:Iprops)=>{
  const {flag = false} = props;
  const SortBox = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
padding:0  10px;
cursor:pointer;
i{
  display:inline-block;
  width:0px;
  height:0px;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
}
i:first-child{
  border-bottom: 6px solid ${flag?'#fff':'#4168ED'};
  margin-bottom:2px;
}
i:last-child{
  border-top: 6px solid ${flag?'#4168ED':'#fff'};
}
`
const changeSort =()=>{
    props.changeSort()
}
  return(
    <SortBox onClick={changeSort}>
      <i></i>
      <i></i>
    </SortBox>
  )
}