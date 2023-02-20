import { IUser, TUserStatus } from "@/interfaces"
import { ReactNode } from "react"

export type TSidebar = {
  header: ReactNode,
  user: IUser | null,
  userStatus: TUserStatus,
}
