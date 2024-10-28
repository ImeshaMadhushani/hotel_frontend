import axios from 'axios';
import { useEffect } from "react";
import { useState } from "react";

function UserTag(props) {
    
    const [name, setName] = useState("")
    const [userFound, setUserFound] = useState(false)
    
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (token !== null) {
            console.log(token);
            axios.post(import.meta.env.Backend_URL + "/api/user/login", {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            ).then((res) => {
                console.log(res);
                setName(res.data.user.firstName + " " + res.data.user.lastName);
                setUserFound(true);
            }).catch((error) => {
                console.error(error);
                setUserFound(false);
            })
            
        } else {
            setName("")
        }
    }, [userFound]
    );

    return (
        <div className="absolute right-0 flex items-center cursor-pointer mr-2 ">
            <img
                className="rounded-full w-[50px] h-[50px] item-center"
                src={props.imageLink}
            />
            <span className="text-white ml-[5px] text-[30px]">{name}</span>

        
       
            <button onClick={() => {
                localStorage.removeItem('token');
                setUserFound(false); 
            
                
            }}>LogOut</button>
        </div>
    );
    

}

export default UserTag;