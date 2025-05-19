import { auth } from "@clerk/nextjs/server"


interface ProtectedRouteProps {
    children: React.ReactNode
}

export default async function ProtectedRoute({ children }: ProtectedRouteProps) {
    const {userId} = await auth();

    if(!userId) {
        (await auth()).redirectToSignIn()
    }

    return <>{children}</>
}


