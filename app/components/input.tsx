
interface InputProps{
    className?: string,
    placeholder?: string,
}

export default function Input({className, placeholder}:InputProps){
    return(
        <input type="text" className={className} placeholder={placeholder}/>
    )
}