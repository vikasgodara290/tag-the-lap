
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
        <div className="mt-5">

            <table className="border border-black w-11/12 mx-auto">
            {
                <tr>
                    {
                        columns.map(c => (
                            <th key={c.key} className="border border-black">{c.label}</th>
                        ))
                    }
                </tr>
            }
            {

                rows.map(r => (
                    <tr>
                        {
                            Object.values(r).map((v, index) => {
                                if(index == 0){ 
                                    return <td className="hidden border border-black pl-1">{v}</td>
                                }
                                return <td className="border border-black pl-1">{v}</td>
                            })
                        }
                    </tr>
                ))
            }
            </table>
        </div>
    )
}