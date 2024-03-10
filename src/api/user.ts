'use server'
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation";
import bcrypt from 'bcrypt';

// Register
type RegisterData = {
  name: string,
  email: string,
  password: string,
  role: string
}

export const register = async (prevState: any, data: FormData) => {
  const { name, email, password, role }: RegisterData = Object.fromEntries(data) as RegisterData;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const saltRounds = 10;
  const sameEmailUsers = await prisma.user.findMany({
    where: {
      email
    }
  })

  // Validate data
  if (!name || !email || !password || !role) return { error: 'Please fill out all fields' }
  if (!emailRegex.test(email)) return { error: 'Please enter a valid email' }
  if (password.length <= 4) return { error: 'Password must be at least 5 characters long' }
  if (Array.isArray(sameEmailUsers) && sameEmailUsers.length !== 0) return { error: 'Email is already in use' }

  // Save data
  try {
    // Hash password
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    await prisma.user.create({
      data: {
        name,
        email,
        password: encryptedPassword,
        role
      }
    })
  } catch {
    return { error: 'Something went wrong, please try again.' }
  }

  redirect('/login');
}
