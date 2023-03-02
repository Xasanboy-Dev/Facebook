export default function UserMessages() {
    let arr: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <div className="mx-auto text-center ">
            {arr.map((numbers: any) => (
                <div className="mx-auto rounded-[25px] w-[80%]  m-[50px] border border-dark">
    
                </div>
            ))}
        </div>
    );
}