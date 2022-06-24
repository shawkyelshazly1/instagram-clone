import { useMutation } from "@apollo/client";
import {
  faPhotoFilm,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_POST } from "../graphql/post";
import LoadingComponent from "./reusable/LoadingComponent";

export default function CreatePostModal({ showModal, setShowModal }) {
  const [togglePreview, setTogglePreview] = useState(false);
  const [imagePreviewUri, setImagePreviewUri] = useState(null);
  const [imageSelected, setImageSelected] = useState(null);
  const [postCaption, setPostCaption] = useState("");

  const navigate = useNavigate();

  // handle mutation for creating post
  const [createPost, { loading, data, error }] = useMutation(CREATE_POST, {});

  // handle submiting post & uploading image to backend as buffer stream
  const handleCreatingPost = () => {
    if (imageSelected) {
      const reader = new FileReader();
      reader.readAsDataURL(imageSelected);
      reader.onloadend = () => {
        createPost({
          variables: {
            caption: postCaption,
            image: reader.result,
          },
          onCompleted(data) {
            setPostCaption("");
            clearImagePreview();
            setShowModal(false);
          },
        });
      };
    }
  };

  // show image preview handler
  const showIMagepreview = (data) => {
    setImageSelected(data);
    setImagePreviewUri(window.URL.createObjectURL(data));
    setTogglePreview(true);
  };

  // clear Image preview handler
  const clearImagePreview = () => {
    setTogglePreview(false);
    setImagePreviewUri(null);
    setImageSelected(null);
  };

  // handle file dragover
  const onDragOverHandler = (e) => {
    e.preventDefault();
  };

  // handling file selection
  const selectFileHandler = (e) => {
    e.preventDefault();

    let data = e.target.files[0];

    if (data.type.match(/image.*/)) {
      showIMagepreview(data);
    }
  };

  // handling file drop
  const onDropHandler = (e) => {
    e.preventDefault();

    if (e.dataTransfer.items) {
      let data = [...e.dataTransfer.items]
        .find((item) => item.kind === "file")
        .getAsFile();

      if (data.type.match(/image.*/)) {
        showIMagepreview(data);
      } else {
        let data = e.dataTransfer.items[0];
        if (data.type.match(/image.*/)) {
          showIMagepreview(data);
        }
      }
    }
  };

  return (
    <div
      className={` ${
        showModal ? "flex" : "hidden"
      } absolute top-0 left-0 w-full h-full  items-center justify-center`}
    >
      <div className="bg-black w-full min-h-screen absolute   pt-[6rem] opacity-50"></div>
      <FontAwesomeIcon
        icon={faXmark}
        className="text-4xl cursor-pointer text-black absolute top-3 right-3"
        onClick={(e) => {
          setShowModal(false);
          clearImagePreview();
          setPostCaption("");
        }}
      />
      <div className="bg-white w-2/5 h-2/3  z-50 flex flex-col text-center rounded-xl">
        <div className="flex flex-row justify-between px-2 border-b-2 items-center ">
          <h1 className="py-2 w-full mx-auto font-semibold text-lg flex-1 flex items-center justify-center">
            Create New Post
          </h1>
          <button
            className={` ${
              togglePreview ? "" : "invisible"
            }  bg-sky-500 text-white font-semibold text-lg px-4 py-1 rounded-2xl`}
            onClick={() => {
              handleCreatingPost();
            }}
          >
            Post
          </button>
        </div>
        {loading ? (
          <div className="my-auto text-center">
            <LoadingComponent />
            <h1 className="text-2xl font-semibold text-gray-400 ">
              Sending Your Idea...
            </h1>
          </div>
        ) : (
          <>
            <div
              className=" flex flex-1 justify-center items-center w-full h-full flex-col gap-4"
              onDrop={onDropHandler}
              onDragOver={onDragOverHandler}
            >
              <label
                className={` ${
                  togglePreview ? "hidden" : "flex"
                }  py-2 px-4   w-full h-full  items-center justify-center flex-col gap-2 cursor-pointer`}
                onClick={(e) => {}}
              >
                <FontAwesomeIcon
                  icon={faPhotoFilm}
                  className="text-6xl text-gray-400 "
                />
                <p className="text-xl text-gray-500 font-light">
                  Drag photos & videos here
                </p>
                <p className="text-xl text-gray-500 font-light">
                  Or <br></br> click anywhere to select from computer
                </p>

                <input
                  type="file"
                  className="opacity-0 absolute inputField"
                  onChange={(e) => selectFileHandler(e)}
                />
              </label>

              <div
                className={` ${
                  togglePreview ? "flex" : "hidden"
                } w-full h-full  items-center justify-center   relative`}
              >
                <FontAwesomeIcon
                  icon={faXmarkCircle}
                  className="text-3xl cursor-pointer text-black absolute top-2 right-4"
                  onClick={(e) => {
                    clearImagePreview();
                  }}
                />
                <img
                  className="w-fit max-h-[600px] bg-cover"
                  src={imagePreviewUri}
                  alt=""
                />
              </div>
            </div>

            <input
              type="text"
              onChange={(e) => {
                setPostCaption(e.target.value.trim());
              }}
              placeholder="Caption here..."
              className="py-3 px-4 border-t-2 focus:outline-none focus:border-2 focus:border-sky-300 "
            />
          </>
        )}
      </div>
    </div>
  );
}
