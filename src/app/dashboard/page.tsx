import {auth} from "@clerk/nextjs/server";

export default async function DashboardDev() {
    const { userId } = await auth();

    if(!userId) (await auth()).redirectToSignIn();

    return (
        <div className="flex flex-col gap-4 font-quicksand">
            <h1> Dev, Welcome to dashboard</h1>
        </div>
    )

}