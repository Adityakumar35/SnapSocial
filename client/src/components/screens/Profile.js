import React, { useEffect, useState , useContext} from "react";
import { UserContext } from "../../App";

const Profile = ()=>{
    const[mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext) 
    useEffect(()=>{
        fetch('/myPosts', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(result => {
            console.log(result);
            setPics(result.myposts);
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
    }, []);

    return(
        <div style={{maxWidth:"60%", margin:"0px auto"}}>
            <div style={{
                display:"flex",
                justifyContent:"space-around",
                margin:"18px 0px",
                borderBottom:"1px solid grey"
            }}>
                
                <div>
                    <img style={{width:"160px", heigh:"160px", borderRadius:"80px"}} src="https://images.unsplash.com/36/X7L5hgFXQZazzPaK3goC_14084990857_88cabf3b6d_o.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D" alt="Profile Pic" />
                </div>

                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <h5>{state?state.email:"loading"}</h5>
                    {/* <h4>{state.name}</h4> */}

                    <div style={{
                        display:"flex",
                        justifyContent:"space-between",
                        width:"108%"
                    }}>
                        <h6>{mypics.length} Posts</h6>
                        <h6>{state?state.followers.length:"0"} followers</h6>
                        <h6>{state?state.followings.length:"0"} followings</h6>
                    </div>
                </div>
            </div>

            <div className="gallery">
                {
                    mypics.map(item=>{
                        return(
                            <img key={item._id} className="item" src={item.photo} alt={item.title} />            
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile;