
interface InputProps{
    className?: string,
    placeholder?: string,
    ref : React.Ref<HTMLTextAreaElement>,
    value? : string | undefined 
    isTaskInputDisabled? : boolean
}

export default function Input({className, placeholder, ref, value, isTaskInputDisabled = false}:InputProps){
    return(
        <textarea className={`${className} sm:h-6 max-sm:text-center max-sm:w-full resize-none`} placeholder={placeholder} ref={ref} defaultValue={value} readOnly={isTaskInputDisabled}/>
    )
}