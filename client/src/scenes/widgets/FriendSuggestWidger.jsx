import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestFriends } from "state";

const FriendSuggestWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  // console.log(token);
  const suggestfriends = useSelector((state) => state.user.suggestFriends);

  const getFriendsSuggest = async () => {
    const response = await fetch(
      `http://localhost:7500/user/${userId}/suggest`,
      {
        method: "GET",
        headers: { Authorization: `${token}` },
      }
    );

    const data = await response.json();
    dispatch(setSuggestFriends({ suggestFriends: data }));
  };
  useEffect(() => {
    getFriendsSuggest();
    console.log(suggestfriends);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper style={{ paddingRight: 0, marginTop: 10 }}>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Suggested Friends
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        gap="1.5rem"
        sx={{
          maxHeight: "200px", // Adjust the maximum height as needed
          overflowY: "auto",
          paddingRight: 0,
        }}
      >
        {suggestfriends &&
          suggestfriends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.userName}`}
              subtitle={friend.occupation}
            />
          ))}
        {}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendSuggestWidget;