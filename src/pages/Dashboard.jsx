import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [isAuth, setIsAuth] = useState(null);
    const navigate = useNavigate()

    useEffect (() => {
        const verifyUSer = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setIsAuth(false)
                navigate("/login");
                return;
            }

            try {
                const res = await fetch("http://localhost:3000/api/users/auth/verify", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if(!res.ok) {
                    localStorage.removeItem("token");
                    setIsAuth(false)
                    navigate("/login");
                } else {
                    setIsAuth(true)
                }
            } catch (err) {
                setIsAuth(false)
                navigate("/login")
                console.log("Server Down!", err)
            }
        }

        verifyUSer();

    }, [])

    const getAllPosts = async () => {

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                console.log("No token")
                return;
            }
    
            const response = await fetch('http://localhost:3000/api/posts', {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                 },
            })

            const data = await response.json()

            console.log("Posts in dashboard get : ", data)

        } catch (err) {
            console.log("Error fetching posts: ", err)
        }

    }



    useEffect(() => {
        getAllPosts
    }, []);

    if (isAuth === null ) return <p>Cheching auth...</p>

    return(
        <>
            <h1>Dashboard</h1>
        </>
    )
}

export default Dashboard