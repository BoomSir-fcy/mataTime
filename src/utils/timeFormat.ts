import  moment  from "moment";
export const relativeTime  = (time?:string)=>{
  return moment(time||new Date()).fromNow()
}