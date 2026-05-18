import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

function Dashboard() {
    const [isAuth, setIsAuth] = useState(null);
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
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

                if(!res || !res.ok) {
                    console.log("Fetch auth response unavailable or not okay!")
                    setIsAuth(false)
                    navigate("/login");
                } else {
                    setIsAuth(true)
                }
               
            } catch (err) {
                setIsAuth(false)
                navigate("/login")
                console.log("Server Down or Verification Failed", err)
            }
        }

        verifyUSer();

    }, [navigate])



// Fetch Posts Function
    const getAllPosts = async () => {

        try {
   
            const response = await API("http://localhost:3000/api/posts");
            if (!response) return 

            const data = await response.json()
            setPosts(data.posts || [])

            // Posts after setting.

            console.log("Posts in dashboard get : ", data.posts)

        } catch (err) {
            console.error("Error fetching posts: ", err)
        }

    }



    useEffect(() => {
            if (isAuth === true) {
                getAllPosts();
            }
        }, [isAuth]);



    if (isAuth === null ) return <p>Cheching auth...</p>

    return (
        <>
            <h1>Dashboard</h1>
            <h2>Recent Posts</h2>

            {posts.length === 0 ? (
                <p>No posts found.</p>
            ) : (
                <div className="posts container">
                    {posts.map((post) => (
                        <div key={post.id} className="post-card" style={{ marginBottom: '24px', border: '1px solid #5f5f5f', padding: '16px', borderRadius: '8px', backgroundColor: "#0e0e0eb7" }}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>

                            {/* Nested Comments Section */}
                            <div className="comments-section" style={{ marginTop: '16px', paddingLeft: '16px', borderLeft: '3px solid #181818' }}>
                                <h4>Comments ({post.comments?.length || 0})</h4>
                                
                                {!post.comments || post.comments.length === 0 ? (
                                    <p style={{ color: '#666', fontSize: '14px' }}>No comments yet.</p>
                                ) : (
                                    post.comments.map((comment) => (
                                        <div key={comment.id} style={{ backgroundColor: '#1a1a1a', padding: '8px', marginTop: '8px', borderRadius: '4px' }}>
                                            <p style={{ margin: 0 }}>{comment.content}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default Dashboard