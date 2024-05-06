
'use client'
import { useRouter } from "next/navigation"



export const CartIcon = ({color = "#648DCB" , classname = "" , onClick ={} }) => {
  // const router = useRouter();
  return(
    <svg xmlns="http://www.w3.org/2000/svg"
    // onClick={() => router.push('/cart')} 
    className={classname}
    fill={color} 
    onClick={onClick}
    viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></g></svg>
    
  )
  
}

// export const arrowIcon = ({color = "#648DCB" , classname = "w-7, h-7"  }) => {
//   return(
//     <svg xmlns="http://www.w3.org/2000/svg" className={classname}
//     fill={color}  viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m10 8l4 4l-4 4"/></g></svg>
    
    
//   )
  
// }


export const ChevronIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M15.5 19l-7-7 7-7"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);




  


