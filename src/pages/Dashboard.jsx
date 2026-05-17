import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [isAuth, setIsAuth] = useState(null);
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    // Verification Effect
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

                if (res.status === 403) {
                    localStorage.removeItem("token");
                    navigate("/login")
                }

            } catch (err) {
                setIsAuth(false)
                navigate("/login")
                console.log("Server Down!", err)
            }
        }

        verifyUSer();

    }, [navigate])


// Fetch Posts Function
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

            setPosts(data.posts)

            console.log("Posts in dashboard get : ", data.posts)

        } catch (err) {
            console.log("Error fetching posts: ", err)
        }

    }



    useEffect(() => {
        if(isAuth === true) {
            getAllPosts();
        }
    }, [isAuth])


    if (isAuth === null ) return <p>Cheching auth...</p>

    return(
        <>
            <h1>Dashboard</h1>
            <h2>Recent Posts</h2>

            {posts.length === 0 ? (
                <p>No posts found. </p>
            ) : (
                <div className="posts container">
                    {posts.map((post) => (
                        <div
                        key={post._id || post.id}        
                        >
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default Dashboard