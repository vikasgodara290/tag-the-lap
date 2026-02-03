export interface TaskType{
  id:number,
  task: string,
  categoryId: number,
  startTime: Date,
  endTime: Date | null,
  createdAt: Date
}

export interface CategoryType {
    id : number,
    category : string,
    categoryColor : string
}