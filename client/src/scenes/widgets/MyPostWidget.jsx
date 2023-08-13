// import {
//   EditOutlined,
//   DeleteOutlined,
//   AttachFileOutlined,
//   GifBoxOutlined,
//   ImageOutlined,
//   MicOutlined,
//   MoreHorizOutlined,
// } from "@mui/icons-material";
import {
  // Box,
  Divider,
  // Typography,
  InputBase,
  useTheme,
  Button,
  Select,
  MenuItem,
  // IconButton,
  // useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
// import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = () => {
  const dispatch = useDispatch();
  // const [isImage, setIsImage] = useState(false);
  // const [image, setImage] = useState(null);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  // const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id, userName } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  // const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  // const mediumMain = palette.neutral.mediumMain;
  // const medium = palette.neutral.medium;
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(""); // Initialize the category state
  const [location, setLocation] = useState("");

  // const handlePost = async () => {
  //   const formData = new FormData();
  //   formData.append("userId", _id);
  //   formData.append("description", post);
  //   // if (image) {
  //   //   formData.append("picture", image);
  //   //   formData.append("picturePath", image.name);
  //   // }

  //   const response = await fetch(`http://localhost:3001/posts`, {
  //     method: "POST",
  //     headers: { Authorization: `Bearer ${token}` },
  //     body: formData,
  //   });
  //   const posts = await response.json();
  //   dispatch(setPosts({ posts }));
  //   // setImage(null);
  //   setPost("");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("enetered handle submit");
    const data = {
      userId: _id,
      content: content,
      category: category,
      location: location,
    };

    try {
      const response = await fetch("http://localhost:7500/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(data),
      });

      const posts = await response.json();
      dispatch(setPosts({ posts }));
      console.log("Response from server:", posts);
      // setPost("");
      // Handle the response data here
    } catch (error) {
      console.error("Error:", error);
      // Handle errors here
    }
    console.log(data);
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage name={userName[0]} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setContent(e.target.value)}
          value={content}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        sx={{
          backgroundColor: neutralLight,
          width: "150px",
          borderRadius: "0.25rem",
          p: "0.25rem 1rem",
          "& .MuiSvgIcon-root": {
            pr: "0.25rem",
            width: "3rem",
          },
          "& .MuiSelect-select:focus": {
            backgroundColor: neutralLight,
          },
        }}
        input={<InputBase />}
      >
        <MenuItem value="">Select a Category</MenuItem>
        <MenuItem value="Technology">Technology</MenuItem>
        <MenuItem value="Sports">Sports</MenuItem>
      </Select>
      <InputBase
        placeholder="Add Location"
        onChange={(e) => setLocation(e.target.value)}
        value={location}
        sx={{
          width: "100%",
          backgroundColor: palette.neutral.light,
          borderRadius: "2rem",
          padding: "1rem 2rem",
        }}
      />
      {/* {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )} */}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        {/* <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween> */}

        {/* {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )} */}

        <Button
          // disabled={!post}
          onClick={handleSubmit}
          style={{ color: "black" }}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
