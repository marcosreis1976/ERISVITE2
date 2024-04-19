import { IUser } from "src/types/apps/users";



export const setUserLocalStorage = (user: IUser | null) =>{
    localStorage.setItem("u", JSON.stringify(user));
    // sessionStorage.setItem("u", JSON.stringify(user));
}

export const getUserLocalStorage = () =>{

    const json = localStorage.getItem("u");
    // const json = sessionStorage.getItem("u");
    console.log(json)
    if (!json) {
        return null
    }

    const user = JSON.parse(json);

    return user
    // return user ?? null;
}



