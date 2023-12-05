import { DateTime } from "luxon"

export interface Post {
  id: string
  title: string
  authorId: string
  markdown?: string
  created_at: string
  html?: string
}

export interface TimeLinePost extends Omit<Post, "created_at"> {
  created_at: DateTime
}

export const today: Post = {
  id: "1",
  title: "Today",
  authorId: "-1",
  created_at: DateTime.now().toISO() || "",
  html: "",
}

export const thisWeek: Post = {
  id: "2",
  title: "This Week",
  authorId: "-1",
  created_at: DateTime.now().minus({ days: 5 }).toISO() || "",
  html: "",
}

export const thisMonth: Post = {
  id: "3",
  title: "This Month",
  authorId: "-1",
  created_at: DateTime.now().minus({ weeks: 3 }).toISO() || "",
  html: "",
}
