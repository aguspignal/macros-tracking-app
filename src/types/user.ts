import { Database } from "./supabase"

export type DatabaseUser = Database["public"]["Tables"]["Users"]["Row"]
export type DatabaseUserGoal = Database["public"]["Tables"]["UserGoals"]["Row"]
