import React, { useState, useEffect } from 'react'
import { like, liked, save, saved } from "@/assets"
import { IPostStats } from "@/interface/postStats"
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queryAndMutation"
import { Models } from "appwrite"
import { checkIsLiked } from '@/lib/utils'
import { Loader } from './loader'

const PostStats = ({ post, userId }: IPostStats) => {


  const likesList = post?.likes.map((user: Models.Document) => user.$id)

  const { data: currentUser } = useGetCurrentUser()

  const savedPostRecord = currentUser?.save.find((
    record: Models.Document) =>
    record.post.$id === post?.$id
  )

  useEffect(() => {
    setIsSaved(!!savedPostRecord)
  }, [currentUser])


  const { mutate: likePost } = useLikePost()
  const { mutate: savePost, isPending: isSavingPost } = useSavePost()
  const { mutate: deleteSavedPost, isPending: isDeletingSaved } = useDeleteSavedPost()

  const [likes, setLikes] = useState(likesList)
  const [isSaved, setIsSaved] = useState(false)

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation()

    let newLikes = [...likes]

    const hasLiked = newLikes.includes(userId)

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId)
    } else {
      newLikes.push(userId)
    }
    setLikes(newLikes)
    likePost({ postId: post?.$id || '', likesArray: newLikes })
  }

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (savedPostRecord) {
      setIsSaved(false)
      deleteSavedPost(savedPostRecord.$id)
    } else {
      savePost({ postId: post?.$id || '', userId })
      setIsSaved(true)
    }

  }

  return (
    <div
      className={`flex justify-between items-center z-20 `}>
      <div className="flex gap-2 mr-5">
        <img
          src={`${checkIsLiked(likes, userId)
            ? liked
            : like
            }`}
          alt="like"
          width={20}
          height={20}
          loading='lazy'
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        {isSavingPost || isDeletingSaved ? <Loader /> :
          <img
            src={isSaved ? saved : save}
            alt="share"
            width={20}
            height={20}
            loading='lazy'
            className="cursor-pointer"
            onClick={handleSavePost}
          />
        }
      </div>
    </div>
  )
}

export default PostStats