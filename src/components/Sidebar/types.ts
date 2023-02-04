import { IUser } from "@/interfaces"
import { ReactNode } from "react"

export type TSidebar = {
  header: ReactNode,
  user: IUser | null,
}
