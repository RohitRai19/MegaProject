import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../index";
import appwriteService from "../../Appwrite/appwriteConfig";
export default function AllPost() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // Move the API call inside the useEffect
    appwriteService.getPost([]).then((response) => {
      if (response) {
        setPosts(response.documents);
      }
    });
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
