
interface InputProps{
    className?: string,
    placeholder?: string,
    ref : React.Ref<HTMLInputElement>
}

export default function Input({className, placeholder, ref}:InputProps){
    return(
        <input type="text" className={className} placeholder={placeholder} ref={ref}/>
    )
}