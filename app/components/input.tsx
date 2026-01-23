
interface InputProps{
    className?: string,
    placeholder?: string,
    ref : React.Ref<HTMLInputElement>
}

export default function Input({className, placeholder, ref}:InputProps){
    return(
        <input disabled type="text" className={className} placeholder={placeholder} ref={ref}/>
    )
}