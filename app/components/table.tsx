
interface Columns{
    key: string,
    label: string
}

interface TableProps<T extends object>{
    columns : Columns[],
    rows : T[]
}

export default function Table<T extends object>({columns, rows}: TableProps<T>){
    return(
        <div className="border-t border-l border-black w-96">

            <div className="">
                {
                    columns.map(c => (
                        <span className="border-b border-r border-black">{c.label}</span>
                    ))
                }
            </div>

            <div className="">
                {
                    rows.map(r => (
                        <div className="">
                            {
                                Object.values(r).map(v => (
                                    <span className="border-b border-r border-black">{v}</span>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}