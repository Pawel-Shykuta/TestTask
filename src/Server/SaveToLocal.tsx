import { FormData } from "../types/Types"

export function SaveToLocal(newData:FormData[]){
    localStorage.setItem('data', JSON.stringify(newData))
}

export function LoadFromLOcal(saveData:any){
    const takeInfo = localStorage.getItem('data')

    if(takeInfo){
        const parsed = JSON.parse(takeInfo)
        saveData(parsed)
    }
}
