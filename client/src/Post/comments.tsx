import { Posts } from "@prisma/client"

export default function CommentOfPost({ letter, setShowCooment }: { letter: string, setShowCooment: (show: boolean) => void }) {

    return (
        <div className="border border-dark w-[90%] h-full rounded p-2">
            <button onClick={() => setShowCooment(false)} className={'flex justify-start'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            <div>
                Hello World How are you!
            </div>
        </div>
    )
}