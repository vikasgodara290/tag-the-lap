
interface InputProps{
    className?: string,
    placeholder?: string,
    ref : React.Ref<HTMLInputElement>,
    value? : string | undefined 
}

export default function Input({className, placeholder, ref, value}:InputProps){
    return(
        <input type="text" className={className} placeholder={placeholder} ref={ref} defaultValue={value} readOnly={!!value}/>
    )
}