
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
        <div className="m-5">

            <table className="border border-black w-96">
            {
                <tr>
                    {
                        columns.map(c => (
                            <th className="border border-black">{c.label}</th>
                        ))
                    }
                </tr>
            }
            {

                rows.map(r => (
                    <tr>
                        {
                            Object.values(r).map(v => (
                                <td className="border border-black pl-1">{v}</td>
                            ))
                        }
                    </tr>
                ))
            }
            </table>
        </div>
    )
}