export interface NoticeWithCount {
  id: string
  firstName: string
  lastName: string
  maidenName: string | null
  age: number | null
  address1: string
  address2: string | null
  town: string
  county: string
  deathDate: Date
  reposing: string | null
  removal: string | null
  funeral: string | null
  burial: string | null
  createdAt: Date
  updatedAt: Date
  _count: {
    condolences: number
  }
  condolences: Condolence[]
}

export interface Condolence {
  id: string
  message: string
  author: string
  createdAt: Date
  noticeId: string
} 