import express, { Request, Response } from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { User, NewUser } from "../user"
import cookieParser from "cookie-parser"
import jsonwebtoken from "jsonwebtoken"

import { DateTime } from "luxon"
import { Post } from "../post"

export const today: Post = {
  id: "1",
  authorId: "1",
  title: "Today",
  created_at: DateTime.now().toISO() || "",
  markdown: "",
  html: "",
}

export const thisWeek: Post = {
  id: "2",
  authorId: "1",
  title: "This Week",
  created_at: DateTime.now().minus({ days: 5 }).toISO() || "",
  markdown: "",
  html: "",
}

export const thisMonth: Post = {
  id: "3",
  authorId: "1",
  title: "This Month",
  created_at: DateTime.now().minus({ weeks: 3 }).toISO() || "",
  markdown: "",
  html: "",
}

const allPosts = [today, thisWeek, thisMonth] as Post[]

const allUsers = [] as User[]

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

app.get("/posts", (req: any, res: any) => {
  console.log("req", req.body)
  res.json(allPosts)
})

app.post<{}, {}, Post>("/posts", (req: Request, res: Response) => {
  const post = { ...req.body, id: (Math.random() * 1000).toFixed() }
  allPosts.push(post)
  res.json(post)
})

app.put<{}, {}, Post>("/posts", (req: Request, res: Response) => {
  const post = { ...req.body, id: req.body.id }
  const index = allPosts.findIndex((x) => x.id === post.id)
  if (index === -1) return res.status(404).end()
  allPosts[index] = { ...post, ...req.body }
  res.json(allPosts[index])
})

const SECRET = "my-secret"
const COOKIE = "my-cookie"

function authenticate(id: string, res: Response) {
  const token = jsonwebtoken.sign({ id }, SECRET, {
    expiresIn: "2 days",
    issuer: "vuejs-course",
  })
  res.cookie(COOKIE, token, { httpOnly: true })
}

app.get("/current-user", (req: any, res: any) => {
  try {
    const token = req.cookies[COOKIE]
    if (!token)
      return res
        .status(401)
        .json({ message: "Missing token. Please log in again!" })
    const result = jsonwebtoken.verify(token, SECRET) as { id: string }
    return res.json({ id: result.id })
  } catch (e) {
    res.status(404).end()
  }
})

app.post<{}, {}, NewUser>("/users", (req: Request, res: Response) => {
  const user: User = { ...req.body, id: (Math.random() * 1000).toFixed() }
  allUsers.push(user)
  authenticate(user.id, res)
  const { password, ...rest } = user
  res.json(rest)
})

app.post<{}, {}, NewUser>("/login", (req: Request, res: Response) => {
  const targetUser = allUsers.find((x) => x.username === req.body.username)
  const iscorrectPassword =
    targetUser && targetUser.password === req.body.password
  if (!targetUser || !iscorrectPassword) return res.status(404).end()
  authenticate(targetUser.id, res)
  res.status(200).end()
})

app.post("/logout", (req: Request, res: Response) => {
  res.cookie(COOKIE, "", { httpOnly: true, expires: new Date(0) })
  res.status(200).end()
})

app.listen(8000, () => {
  console.log("Server listening on port 8000")
})
